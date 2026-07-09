import { IConfirmPaymentPayload, ICreatePaymentPayload, IPaymentFilterQuery } from "./payment.interface";
import Stripe from "stripe";
import config from "../../config";
import { prisma } from "../../lib/prisma";

const stripe = new Stripe(config.stripe_secret_key as string);

const createPayment = async (tenantId: string, payload: ICreatePaymentPayload) => {
  const rentalRequest = await prisma.rentalRequest.findUnique({
    where: { id: payload.rentalRequestId },
    include: { property: true }
  });

  if (!rentalRequest) {
    throw new Error("Rental request not found");
  }

  if (rentalRequest.tenantId !== tenantId) {
    throw new Error("You are not authorized to pay for this request");
  }

  if (rentalRequest.status !== "APPROVED") {
    throw new Error("Rental request must be approved before payment");
  }

  const existingPayment = await prisma.payment.findUnique({
    where: { rentalRequestId: payload.rentalRequestId }
  });

  if (existingPayment && existingPayment.status === "COMPLETED") {
    throw new Error("Payment already completed for this request");
  }

  const amountInCents = Math.round(rentalRequest.property.price * 100);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: amountInCents,
    currency: 'usd',
    automatic_payment_methods: {
      enabled: true,
    },
    metadata: {
      rentalRequestId: rentalRequest.id,
      tenantId
    }
  });

  let payment;
  if (existingPayment) {
    payment = await prisma.payment.update({
      where: { id: existingPayment.id },
      data: {
        transactionId: paymentIntent.id,
        amount: rentalRequest.property.price,
        provider: "STRIPE",
        method: "CARD",
        status: "PENDING"
      }
    });
  } else {
    payment = await prisma.payment.create({
      data: {
        transactionId: paymentIntent.id,
        amount: rentalRequest.property.price,
        method: "CARD",
        provider: "STRIPE",
        rentalRequestId: rentalRequest.id,
        status: "PENDING"
      }
    });
  }

  return {
    clientSecret: paymentIntent.client_secret,
    paymentId: payment.id,
  };
};

const confirmPayment = async (payload: IConfirmPaymentPayload) => {
  const payment = await prisma.payment.findUnique({
    where: { transactionId: payload.transactionId }
  });

  if (!payment) {
    throw new Error("Payment not found");
  }

  if (payment.status === "COMPLETED") {
    return { message: "Payment already confirmed" };
  }

  const paymentIntent = await stripe.paymentIntents.retrieve(payload.transactionId);

  if (paymentIntent.status === "succeeded") {
    await prisma.payment.update({
      where: { id: payment.id },
      data: {
        status: "COMPLETED",
        paidAt: new Date()
      }
    });
    return { message: "Payment confirmed successfully" };
  } else {
    throw new Error(`Payment status is ${paymentIntent.status}, expected succeeded`);
  }
};

const getMyPayments = async (tenantId: string, filters: IPaymentFilterQuery) => {
  const payments = await prisma.payment.findMany({
    where: {
      rentalRequest: {
        tenantId
      }
    },
    include: {
      rentalRequest: {
        include: {
          property: true
        }
      }
    }
  });
  return payments;
};

const getPaymentById = async (paymentId: string, userId: string) => {
  const payment = await prisma.payment.findUnique({
    where: { id: paymentId },
    include: {
      rentalRequest: {
        include: {
          property: true
        }
      }
    }
  });
  
  if (!payment) {
    throw new Error("Payment not found");
  }
  return payment;
};

const sslCommerzSuccess = async (data: Record<string, unknown>) => {};

const sslCommerzFail = async (data: Record<string, unknown>) => {};

const sslCommerzCancel = async (data: Record<string, unknown>) => {};

const stripeWebhook = async (rawBody: Buffer, signature: string) => {};

export const paymentService = {
  createPayment,
  confirmPayment,
  getMyPayments,
  getPaymentById,
  sslCommerzSuccess,
  sslCommerzFail,
  sslCommerzCancel,
  stripeWebhook,
};

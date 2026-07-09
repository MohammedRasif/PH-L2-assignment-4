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

  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: `Rental Payment for ${rentalRequest.property.title}`,
          },
          unit_amount: amountInCents,
        },
        quantity: 1,
      }
    ],
    mode: "payment",
    success_url: `${config.app_url}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${config.app_url}/payment/cancel`,
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
        transactionId: session.id,
        amount: rentalRequest.property.price,
        provider: "STRIPE",
        method: "CARD",
        status: "PENDING"
      }
    });
  } else {
    payment = await prisma.payment.create({
      data: {
        transactionId: session.id,
        amount: rentalRequest.property.price,
        method: "CARD",
        provider: "STRIPE",
        rentalRequestId: rentalRequest.id,
        status: "PENDING"
      }
    });
  }

  return {
    checkoutUrl: session.url,
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

  const session = await stripe.checkout.sessions.retrieve(payload.transactionId);

  if (session.payment_status === "paid") {
    await prisma.payment.update({
      where: { id: payment.id },
      data: {
        status: "COMPLETED",
        paidAt: new Date()
      }
    });
    return { message: "Payment confirmed successfully" };
  } else {
    throw new Error(`Payment status is ${session.payment_status}, expected paid`);
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



const stripeWebhook = async (rawBody: Buffer, signature: string) => {
  let event;
  try {
    event = stripe.webhooks.constructEvent(
      rawBody,
      signature,
      config.stripe_webhook_secret as string
    );
  } catch (err: any) {
    throw new Error(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    const transactionId = session.id;

    if (session.payment_status === "paid") {
      await prisma.payment.updateMany({
        where: { transactionId },
        data: {
          status: "COMPLETED",
          paidAt: new Date()
        }
      });
    }
  } else if (event.type === 'checkout.session.expired') {
    const session = event.data.object as Stripe.Checkout.Session;
    const transactionId = session.id;

    await prisma.payment.updateMany({
      where: { transactionId },
      data: {
        status: "FAILED"
      }
    });
  }

  return { received: true };
};

export const paymentService = {
  createPayment,
  confirmPayment,
  getMyPayments,
  getPaymentById,
  stripeWebhook,
};

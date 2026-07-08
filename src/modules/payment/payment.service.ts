import prisma from "../../lib/prisma";
import { IConfirmPaymentPayload, ICreatePaymentPayload, IPaymentFilterQuery } from "./payment.interface";

// ========================
// Payment Service
// ========================

// Create a payment intent / session for an approved rental (Stripe or SSLCommerz)
const createPayment = async (tenantId: string, payload: ICreatePaymentPayload) => {};

// Confirm / verify payment via webhook or SSLCommerz callback
const confirmPayment = async (payload: IConfirmPaymentPayload) => {};

// Get logged-in user's payment history
const getMyPayments = async (tenantId: string, filters: IPaymentFilterQuery) => {};

// Get a single payment detail
const getPaymentById = async (paymentId: string, userId: string) => {};

// SSLCommerz success callback handler
const sslCommerzSuccess = async (data: Record<string, unknown>) => {};

// SSLCommerz fail callback handler
const sslCommerzFail = async (data: Record<string, unknown>) => {};

// SSLCommerz cancel callback handler
const sslCommerzCancel = async (data: Record<string, unknown>) => {};

// Stripe webhook handler
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

import { IConfirmPaymentPayload, ICreatePaymentPayload, IPaymentFilterQuery } from "./payment.interface";


const createPayment = async (tenantId: string, payload: ICreatePaymentPayload) => {};

const confirmPayment = async (payload: IConfirmPaymentPayload) => {};

const getMyPayments = async (tenantId: string, filters: IPaymentFilterQuery) => {};

const getPaymentById = async (paymentId: string, userId: string) => {};

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

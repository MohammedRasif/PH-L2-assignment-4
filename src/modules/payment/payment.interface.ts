import { PaymentProvider } from "../../../generated/prisma/enums";


export interface ICreatePaymentPayload {
  rentalRequestId: string;
  provider: PaymentProvider;
}

export interface IConfirmPaymentPayload {
  transactionId: string;
  rentalRequestId?: string;
}

export interface IPaymentFilterQuery {
  page?: number;
  limit?: number;
}

import { RequestStatus } from "../../../generated/prisma/enums";

export interface ICreateRentalRequestPayload {
  propertyId: string;
  message?: string;
}

export interface IUpdateRentalRequestStatusPayload {
  status: RequestStatus;
}

export interface IRentalRequestFilterQuery {
  status?: RequestStatus;
  page?: number;
  limit?: number;
}

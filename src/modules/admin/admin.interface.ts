import { ActiveStatus } from "../../../generated/prisma/enums";


export interface IUpdateUserStatusPayload {
  activeStatus: ActiveStatus;
}

export interface IAdminUserFilterQuery {
  role?: string;
  activeStatus?: ActiveStatus;
  page?: number;
  limit?: number;
}

export interface IAdminPropertyFilterQuery {
  categoryId?: string;
  location?: string;
  page?: number;
  limit?: number;
}

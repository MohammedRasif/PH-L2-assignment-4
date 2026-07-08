import prisma from "../../lib/prisma";
import { ICreateRentalRequestPayload, IRentalRequestFilterQuery, IUpdateRentalRequestStatusPayload } from "./rentalRequest.interface";

// ========================
// Rental Request Service
// ========================

// Submit a new rental request (tenant)
const createRentalRequest = async (tenantId: string, payload: ICreateRentalRequestPayload) => {};

// Get all rental requests of the logged-in user (tenant)
const getMyRentalRequests = async (tenantId: string, filters: IRentalRequestFilterQuery) => {};

// Get single rental request details
const getRentalRequestById = async (requestId: string, userId: string) => {};

// Get all rental requests for landlord's properties
const getLandlordRentalRequests = async (landlordId: string, filters: IRentalRequestFilterQuery) => {};

// Approve or reject a rental request (landlord)
const updateRentalRequestStatus = async (
  requestId: string,
  landlordId: string,
  payload: IUpdateRentalRequestStatusPayload
) => {};

// Get all rental requests (admin)
const getAllRentalRequests = async (filters: IRentalRequestFilterQuery) => {};

export const rentalRequestService = {
  createRentalRequest,
  getMyRentalRequests,
  getRentalRequestById,
  getLandlordRentalRequests,
  updateRentalRequestStatus,
  getAllRentalRequests,
};

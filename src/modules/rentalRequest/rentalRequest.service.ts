import { prisma } from "../../lib/prisma";
import { ICreateRentalRequestPayload, IRentalRequestFilterQuery, IUpdateRentalRequestStatusPayload } from "./rentalRequest.interface";

const createRentalRequest = async (tenantId: string, payload: ICreateRentalRequestPayload) => {
  const property = await prisma.property.findUnique({
    where: { id: payload.propertyId }
  });

  if (!property) {
    throw new Error("Property not found");
  }

  if (!property.isAvailable) {
    throw new Error("Property is currently not available");
  }

  const existingRequest = await prisma.rentalRequest.findFirst({
    where: {
      tenantId,
      propertyId: payload.propertyId,
      status: "PENDING"
    }
  });

  if (existingRequest) {
    throw new Error("You already have a pending request for this property");
  }

  const request = await prisma.rentalRequest.create({
    data: {
      tenantId,
      propertyId: payload.propertyId,
      status: "PENDING"
    }
  });

  return request;
};

const getMyRentalRequests = async (tenantId: string, filters: IRentalRequestFilterQuery) => {
  const requests = await prisma.rentalRequest.findMany({
    where: {
      tenantId,
      ...(filters.status && { status: filters.status })
    },
    include: {
      property: true,
      payment: true
    },
    orderBy: { createdAt: 'desc' }
  });
  return requests;
};

const getRentalRequestById = async (requestId: string, userId: string) => {
  const request = await prisma.rentalRequest.findUnique({
    where: { id: requestId },
    include: {
      property: true,
      tenant: { select: { id: true, name: true, email: true } },
      payment: true
    }
  });

  if (!request) {
    throw new Error("Rental request not found");
  }
  return request;
};

const getLandlordRentalRequests = async (landlordId: string, filters: IRentalRequestFilterQuery) => {
  const requests = await prisma.rentalRequest.findMany({
    where: {
      property: { ownerId: landlordId },
      ...(filters.status && { status: filters.status })
    },
    include: {
      property: true,
      tenant: { select: { id: true, name: true, email: true } }
    },
    orderBy: { createdAt: 'desc' }
  });
  return requests;
};

const updateRentalRequestStatus = async (
  requestId: string,
  landlordId: string,
  payload: IUpdateRentalRequestStatusPayload
) => {
  const request = await prisma.rentalRequest.findUnique({
    where: { id: requestId },
    include: { property: true }
  });

  if (!request) {
    throw new Error("Rental request not found");
  }

  if (request.property.ownerId !== landlordId) {
    throw new Error("You are not authorized to update this request");
  }

  const updatedRequest = await prisma.rentalRequest.update({
    where: { id: requestId },
    data: { status: payload.status }
  });

  return updatedRequest;
};

const getAllRentalRequests = async (filters: IRentalRequestFilterQuery) => {
  const requests = await prisma.rentalRequest.findMany({
    include: {
      property: true,
      tenant: { select: { id: true, name: true, email: true } }
    },
    orderBy: { createdAt: 'desc' }
  });
  return requests;
};

export const rentalRequestService = {
  createRentalRequest,
  getMyRentalRequests,
  getRentalRequestById,
  getLandlordRentalRequests,
  updateRentalRequestStatus,
  getAllRentalRequests,
};

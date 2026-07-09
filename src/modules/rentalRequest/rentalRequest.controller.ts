import { NextFunction, Request, Response } from "express";
import { rentalRequestService } from "./rentalRequest.service";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status";


const createRentalRequest = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const tenantId = req.user?.id as string;
  const payload = req.body;
  const result = await rentalRequestService.createRentalRequest(tenantId, payload);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Rental request submitted successfully",
    data: result
  });
});

const getMyRentalRequests = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const tenantId = req.user?.id as string;
  const filters = req.query;
  const result = await rentalRequestService.getMyRentalRequests(tenantId, filters);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Rental requests retrieved successfully",
    data: result
  });
});

const getRentalRequestById = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const userId = req.user?.id as string;
  const result = await rentalRequestService.getRentalRequestById(id, userId);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Rental request details retrieved successfully",
    data: result
  });
});

const getLandlordRentalRequests = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const landlordId = req.user?.id as string;
  const filters = req.query;
  const result = await rentalRequestService.getLandlordRentalRequests(landlordId, filters);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Rental requests retrieved successfully",
    data: result
  });
});

const updateRentalRequestStatus = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const landlordId = req.user?.id as string;
  const payload = req.body;
  const result = await rentalRequestService.updateRentalRequestStatus(id, landlordId, payload);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Rental request status updated successfully",
    data: result
  });
});

const getAllRentalRequests = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const filters = req.query;
  const result = await rentalRequestService.getAllRentalRequests(filters);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "All rental requests retrieved successfully",
    data: result
  });
});

export const rentalRequestController = {
  createRentalRequest,
  getMyRentalRequests,
  getRentalRequestById,
  getLandlordRentalRequests,
  updateRentalRequestStatus,
  getAllRentalRequests,
};

import { NextFunction, Request, Response } from "express";
import { reviewService } from "./review.service";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status";

const createReview = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const tenantId = req.user?.id as string;
  const payload = req.body;
  const result = await reviewService.createReview(tenantId, payload);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Review created successfully",
    data: result
  });
});

const getPropertyReviews = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const propertyId = req.query.propertyId as string;
  const filters = req.query;
  const result = await reviewService.getPropertyReviews(propertyId, filters);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Reviews retrieved successfully",
    data: result
  });
});

const updateReview = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const tenantId = req.user?.id as string;
  const payload = req.body;
  const result = await reviewService.updateReview(id, tenantId, payload);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Review updated successfully",
    data: result
  });
});

const deleteReview = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const userId = req.user?.id as string;
  await reviewService.deleteReview(id, userId);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Review deleted successfully",
    data: null
  });
});

export const reviewController = {
  createReview,
  getPropertyReviews,
  updateReview,
  deleteReview,
};

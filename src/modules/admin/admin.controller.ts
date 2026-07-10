import { NextFunction, Request, Response } from "express";
import { adminService } from "./admin.service";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status";

const getAllUsers = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const filters = req.query;
  const result = await adminService.getAllUsers(filters);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Users retrieved successfully",
    data: result
  });
});

const updateUserStatus = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const payload = req.body; // body optional — না দিলে auto-toggle হবে
  const result = await adminService.updateUserStatus(id, payload);
  const message = result.activeStatus === "BLOCKED"
    ? "User has been banned successfully"
    : "User has been unbanned successfully";
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message,
    data: result
  });
});

const getAllProperties = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const filters = req.query;
  const result = await adminService.getAllProperties(filters);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Properties retrieved successfully",
    data: result
  });
});

const getAllRentalRequests = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const result = await adminService.getAllRentalRequests();
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Rental requests retrieved successfully",
    data: result
  });
});

const deleteUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  await adminService.deleteUser(id);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "User deleted successfully",
    data: null
  });
});

export const adminController = {
  getAllUsers,
  updateUserStatus,
  getAllProperties,
  getAllRentalRequests,
  deleteUser,
};

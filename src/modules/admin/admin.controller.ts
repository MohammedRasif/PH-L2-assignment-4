import { NextFunction, Request, Response } from "express";
import { adminService } from "./admin.service";

// ========================
// Admin Controller
// ========================

// GET /api/admin/users
const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {};

// PATCH /api/admin/users/:id  (ban/unban)
const updateUserStatus = async (req: Request, res: Response, next: NextFunction) => {};

// GET /api/admin/properties
const getAllProperties = async (req: Request, res: Response, next: NextFunction) => {};

// GET /api/admin/rentals
const getAllRentalRequests = async (req: Request, res: Response, next: NextFunction) => {};

// DELETE /api/admin/users/:id
const deleteUser = async (req: Request, res: Response, next: NextFunction) => {};

export const adminController = {
  getAllUsers,
  updateUserStatus,
  getAllProperties,
  getAllRentalRequests,
  deleteUser,
};

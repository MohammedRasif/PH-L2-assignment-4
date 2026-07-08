import { NextFunction, Request, Response } from "express";
import { rentalRequestService } from "./rentalRequest.service";

// ========================
// Rental Request Controller
// ========================

// POST /api/rentals
const createRentalRequest = async (req: Request, res: Response, next: NextFunction) => {};

// GET /api/rentals  (tenant - own requests)
const getMyRentalRequests = async (req: Request, res: Response, next: NextFunction) => {};

// GET /api/rentals/:id
const getRentalRequestById = async (req: Request, res: Response, next: NextFunction) => {};

// GET /api/landlord/requests
const getLandlordRentalRequests = async (req: Request, res: Response, next: NextFunction) => {};

// PATCH /api/landlord/requests/:id  (approve/reject)
const updateRentalRequestStatus = async (req: Request, res: Response, next: NextFunction) => {};

// GET /api/admin/rentals
const getAllRentalRequests = async (req: Request, res: Response, next: NextFunction) => {};

export const rentalRequestController = {
  createRentalRequest,
  getMyRentalRequests,
  getRentalRequestById,
  getLandlordRentalRequests,
  updateRentalRequestStatus,
  getAllRentalRequests,
};

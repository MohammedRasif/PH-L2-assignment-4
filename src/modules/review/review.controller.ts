import { NextFunction, Request, Response } from "express";
import { reviewService } from "./review.service";

// ========================
// Review Controller
// ========================

// POST /api/reviews
const createReview = async (req: Request, res: Response, next: NextFunction) => {};

// GET /api/reviews?propertyId=...
const getPropertyReviews = async (req: Request, res: Response, next: NextFunction) => {};

// PUT /api/reviews/:id
const updateReview = async (req: Request, res: Response, next: NextFunction) => {};

// DELETE /api/reviews/:id
const deleteReview = async (req: Request, res: Response, next: NextFunction) => {};

export const reviewController = {
  createReview,
  getPropertyReviews,
  updateReview,
  deleteReview,
};

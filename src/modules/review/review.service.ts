import prisma from "../../lib/prisma";
import { ICreateReviewPayload, IReviewFilterQuery, IUpdateReviewPayload } from "./review.interface";

// ========================
// Review Service
// ========================

// Create a review (tenant - after completed rental only)
const createReview = async (tenantId: string, payload: ICreateReviewPayload) => {};

// Get all reviews for a specific property
const getPropertyReviews = async (propertyId: string, filters: IReviewFilterQuery) => {};

// Update a review (tenant - own review)
const updateReview = async (reviewId: string, tenantId: string, payload: IUpdateReviewPayload) => {};

// Delete a review (tenant - own review or admin)
const deleteReview = async (reviewId: string, userId: string) => {};

export const reviewService = {
  createReview,
  getPropertyReviews,
  updateReview,
  deleteReview,
};

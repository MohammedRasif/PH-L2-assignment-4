import { ICreateReviewPayload, IReviewFilterQuery, IUpdateReviewPayload } from "./review.interface";

const createReview = async (tenantId: string, payload: ICreateReviewPayload) => {};

const getPropertyReviews = async (propertyId: string, filters: IReviewFilterQuery) => {};

const updateReview = async (reviewId: string, tenantId: string, payload: IUpdateReviewPayload) => {};

const deleteReview = async (reviewId: string, userId: string) => {};

export const reviewService = {
  createReview,
  getPropertyReviews,
  updateReview,
  deleteReview,
};

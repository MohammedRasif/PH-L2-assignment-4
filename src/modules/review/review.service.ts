import { prisma } from "../../lib/prisma";
import { ICreateReviewPayload, IReviewFilterQuery, IUpdateReviewPayload } from "./review.interface";

const createReview = async (tenantId: string, payload: ICreateReviewPayload) => {
  console.log(`[Review] tenantId: ${tenantId}, propertyId: ${payload.propertyId}`);

  // Step 1: rentalRequest status COMPLETED কিনা check করো
  const rentalRequest = await prisma.rentalRequest.findFirst({
    where: {
      tenantId,
      propertyId: payload.propertyId,
    },
    include: {
      payment: true
    }
  });

  console.log(`[Review] Found rentalRequest:`, JSON.stringify(rentalRequest, null, 2));

  if (!rentalRequest) {
    throw new Error("You can only review properties you have rented and completed payment for");
  }

  const isRentalCompleted = rentalRequest.status === "COMPLETED";
  const isPaymentCompleted = rentalRequest.payment?.status === "COMPLETED";
  console.log(rentalRequest, "aaaaaaa")

  console.log(`[Review] isRentalCompleted: ${isRentalCompleted}, isPaymentCompleted: ${isPaymentCompleted}`);

  // কোনোটাই complete না হলে error দাও
  if (!isRentalCompleted && !isPaymentCompleted) {
    throw new Error("You can only review properties you have rented and completed payment for");
  }

  // Payment complete কিন্তু rentalRequest status এখনো update হয়নি — auto-fix করো
  if (!isRentalCompleted && isPaymentCompleted) {
    console.log(`[Review] Auto-fixing rentalRequest status to COMPLETED`);
    await prisma.rentalRequest.update({
      where: { id: rentalRequest.id },
      data: { status: "COMPLETED" }
    });
  }

  const review = await prisma.review.create({
    data: {
      tenantId,
      propertyId: payload.propertyId,
      rating: payload.rating,
      comment: payload.comment
    }
  });

  return review;
};

const getPropertyReviews = async (propertyId: string, filters: IReviewFilterQuery) => {
  const reviews = await prisma.review.findMany({
    where: { propertyId },
    include: {
      tenant: { select: { id: true, name: true, email: true } }
    },
    orderBy: { createdAt: 'desc' }
  });
  return reviews;
};

const updateReview = async (reviewId: string, tenantId: string, payload: IUpdateReviewPayload) => {
  const existingReview = await prisma.review.findUnique({
    where: { id: reviewId }
  });

  if (!existingReview) {
    throw new Error("Review not found");
  }

  if (existingReview.tenantId !== tenantId) {
    throw new Error("You are not authorized to update this review");
  }

  const updatedReview = await prisma.review.update({
    where: { id: reviewId },
    data: {
      rating: payload.rating !== undefined ? payload.rating : existingReview.rating,
      comment: payload.comment !== undefined ? payload.comment : existingReview.comment
    }
  });

  return updatedReview;
};

const deleteReview = async (reviewId: string, userId: string) => {
  const existingReview = await prisma.review.findUnique({
    where: { id: reviewId },
    include: { tenant: true }
  });

  if (!existingReview) {
    throw new Error("Review not found");
  }

  const user = await prisma.user.findUnique({ where: { id: userId } });

  if (existingReview.tenantId !== userId && user?.role !== "ADMIN") {
    throw new Error("You are not authorized to delete this review");
  }

  await prisma.review.delete({
    where: { id: reviewId }
  });

  return null;
};

export const reviewService = {
  createReview,
  getPropertyReviews,
  updateReview,
  deleteReview,
};

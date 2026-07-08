import { Router } from "express";
import { reviewController } from "./review.controller";
import { auth } from "../../middlewares/auth";
import { Role } from "../../../generated/prisma/enums";

const router = Router();

// ========================
// Public Routes
// ========================
router.get("/", reviewController.getPropertyReviews);

// ========================
// Tenant Protected Routes
// ========================
router.post(
  "/",
  auth(Role.TENANT),
  reviewController.createReview
);

router.put(
  "/:id",
  auth(Role.TENANT),
  reviewController.updateReview
);

router.delete(
  "/:id",
  auth(Role.TENANT, Role.ADMIN),
  reviewController.deleteReview
);

export const reviewRoutes = router;

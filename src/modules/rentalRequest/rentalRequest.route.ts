import { Router } from "express";
import { rentalRequestController } from "./rentalRequest.controller";
import { auth } from "../../middlewares/auth";
import { Role } from "../../../generated/prisma/enums";

const router = Router();

// ========================
// Tenant Routes
// ========================
router.post(
  "/",
  auth(Role.TENANT),
  rentalRequestController.createRentalRequest
);

router.get(
  "/",
  auth(Role.TENANT),
  rentalRequestController.getMyRentalRequests
);

router.get(
  "/:id",
  auth(Role.TENANT, Role.LANDLORD, Role.ADMIN),
  rentalRequestController.getRentalRequestById
);

// ========================
// Landlord Routes
// ========================
router.get(
  "/landlord/all",
  auth(Role.LANDLORD),
  rentalRequestController.getLandlordRentalRequests
);

router.patch(
  "/landlord/:id",
  auth(Role.LANDLORD),
  rentalRequestController.updateRentalRequestStatus
);

// ========================
// Admin Routes
// ========================
router.get(
  "/admin/all",
  auth(Role.ADMIN),
  rentalRequestController.getAllRentalRequests
);

export const rentalRequestRoutes = router;

import { Router } from "express";
import { adminController } from "./admin.controller";
import { auth } from "../../middlewares/auth";
import { Role } from "../../../generated/prisma/enums";

const router = Router();

// All admin routes are protected
router.use(auth(Role.ADMIN));

// ========================
// User Management
// ========================
router.get("/users", adminController.getAllUsers);
router.patch("/users/:id", adminController.updateUserStatus);
router.delete("/users/:id", adminController.deleteUser);

// ========================
// Property & Rental Management
// ========================
router.get("/properties", adminController.getAllProperties);
router.get("/rentals", adminController.getAllRentalRequests);

export const adminRoutes = router;

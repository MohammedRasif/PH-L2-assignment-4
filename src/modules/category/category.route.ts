import { Router } from "express";
import { categoryController } from "./category.controller";
import { auth } from "../../middlewares/auth";
import { Role } from "../../../generated/prisma/enums";

const router = Router();

// ========================
// Public Routes
// ========================
router.get("/", categoryController.getAllCategories);
router.get("/:id", categoryController.getCategoryById);

// ========================
// Admin Protected Routes
// ========================
router.post(
  "/",
  auth(Role.ADMIN),
  categoryController.createCategory
);

router.put(
  "/:id",
  auth(Role.ADMIN),
  categoryController.updateCategory
);

router.delete(
  "/:id",
  auth(Role.ADMIN),
  categoryController.deleteCategory
);

export const categoryRoutes = router;

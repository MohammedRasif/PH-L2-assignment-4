import { Router } from "express";
import { profileController } from "./profile.controller";
import { auth } from "../../middlewares/auth";
import { Role } from "../../../generated/prisma/enums";

const router = Router();

// All profile routes require authentication
router.get(
  "/me",
  auth(Role.ADMIN, Role.TENANT, Role.LANDLORD),
  profileController.getMyProfile
);

router.patch(
  "/me",
  auth(Role.ADMIN, Role.TENANT, Role.LANDLORD),
  profileController.updateProfile
);

router.patch(
  "/me/info",
  auth(Role.ADMIN, Role.TENANT, Role.LANDLORD),
  profileController.updateMyInfo
);

export const profileRoutes = router;

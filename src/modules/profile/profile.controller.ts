import { NextFunction, Request, Response } from "express";
import { profileService } from "./profile.service";

// ========================
// Profile Controller
// ========================

// GET /api/profile/me
const getMyProfile = async (req: Request, res: Response, next: NextFunction) => {};

// PATCH /api/profile/me
const updateProfile = async (req: Request, res: Response, next: NextFunction) => {};

// PATCH /api/profile/me/info
const updateMyInfo = async (req: Request, res: Response, next: NextFunction) => {};

export const profileController = {
  getMyProfile,
  updateProfile,
  updateMyInfo,
};

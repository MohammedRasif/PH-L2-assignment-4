import { NextFunction, Request, Response } from "express";
import { profileService } from "./profile.service";

const getMyProfile = async (req: Request, res: Response, next: NextFunction) => {};

const updateProfile = async (req: Request, res: Response, next: NextFunction) => {};

const updateMyInfo = async (req: Request, res: Response, next: NextFunction) => {};

export const profileController = {
  getMyProfile,
  updateProfile,
  updateMyInfo,
};

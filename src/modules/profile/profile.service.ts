import prisma from "../../lib/prisma";
import { IUpdateMyInfoPayload, IUpdateProfilePayload } from "./profile.interface";

// ========================
// Profile Service
// ========================

// Get current user's profile (with user info)
const getMyProfile = async (userId: string) => {};

// Update profile (bio, profilePhoto)
const updateProfile = async (userId: string, payload: IUpdateProfilePayload) => {};

// Update user basic info (name)
const updateMyInfo = async (userId: string, payload: IUpdateMyInfoPayload) => {};

export const profileService = {
  getMyProfile,
  updateProfile,
  updateMyInfo,
};

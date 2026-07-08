import { IUpdateMyInfoPayload, IUpdateProfilePayload } from "./profile.interface";

const getMyProfile = async (userId: string) => {};

const updateProfile = async (userId: string, payload: IUpdateProfilePayload) => {};

const updateMyInfo = async (userId: string, payload: IUpdateMyInfoPayload) => {};

export const profileService = {
  getMyProfile,
  updateProfile,
  updateMyInfo,
};

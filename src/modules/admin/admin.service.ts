import prisma from "../../lib/prisma";
import { IAdminPropertyFilterQuery, IAdminUserFilterQuery, IUpdateUserStatusPayload } from "./admin.interface";

// ========================
// Admin Service
// ========================

// Get all users (tenants & landlords)
const getAllUsers = async (filters: IAdminUserFilterQuery) => {};

// Update user status (ban / unban)
const updateUserStatus = async (userId: string, payload: IUpdateUserStatusPayload) => {};

// Get all properties
const getAllProperties = async (filters: IAdminPropertyFilterQuery) => {};

// Get all rental requests
const getAllRentalRequests = async () => {};

// Delete a user (admin)
const deleteUser = async (userId: string) => {};

export const adminService = {
  getAllUsers,
  updateUserStatus,
  getAllProperties,
  getAllRentalRequests,
  deleteUser,
};

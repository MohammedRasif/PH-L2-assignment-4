import { prisma } from "../../lib/prisma";
import { IAdminPropertyFilterQuery, IAdminUserFilterQuery, IUpdateUserStatusPayload } from "./admin.interface";

const getAllUsers = async (filters: IAdminUserFilterQuery) => {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      activeStatus: true,
      createdAt: true,
      profile: true,
    },
    orderBy: { createdAt: 'desc' }
  });
  return users;
};

const updateUserStatus = async (userId: string, payload?: IUpdateUserStatusPayload) => {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) {
    throw new Error("User not found");
  }

  // Body দিলে সেটা use করো, না দিলে auto-toggle করো
  let newStatus: "ACTIVE" | "BLOCKED";

  if (payload?.status) {
    // Explicitly body তে status দেওয়া হয়েছে
    newStatus = payload.status;
  } else {
    // Auto-toggle: ACTIVE হলে BLOCKED করো, BLOCKED হলে ACTIVE করো
    newStatus = user.activeStatus === "ACTIVE" ? "BLOCKED" : "ACTIVE";
  }

  const updatedUser = await prisma.user.update({
    where: { id: userId },
    data: { activeStatus: newStatus },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      activeStatus: true,
    }
  });

  return updatedUser;
};

const getAllProperties = async (filters: IAdminPropertyFilterQuery) => {
  const properties = await prisma.property.findMany({
    include: {
      owner: { select: { id: true, name: true, email: true } },
      category: true
    },
    orderBy: { createdAt: 'desc' }
  });
  return properties;
};

const getAllRentalRequests = async () => {
  const requests = await prisma.rentalRequest.findMany({
    include: {
      property: true,
      tenant: { select: { id: true, name: true, email: true } },
      payment: true
    },
    orderBy: { createdAt: 'desc' }
  });
  return requests;
};

const deleteUser = async (userId: string) => {
  // Option: cascade delete or throw error if relations exist.
  // We'll just delete the user directly (Prisma cascade should handle it if set up, or it will throw error).
  await prisma.user.delete({
    where: { id: userId }
  });
  return null;
};

export const adminService = {
  getAllUsers,
  updateUserStatus,
  getAllProperties,
  getAllRentalRequests,
  deleteUser,
};

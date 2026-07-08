import prisma from "../../lib/prisma";
import { ICreateCategoryPayload, IUpdateCategoryPayload } from "./category.interface";

// ========================
// Category Service
// ========================

// Get all categories (public)
const getAllCategories = async () => {};

// Get category by id
const getCategoryById = async (id: string) => {};

// Create new category (admin)
const createCategory = async (payload: ICreateCategoryPayload) => {};

// Update category (admin)
const updateCategory = async (id: string, payload: IUpdateCategoryPayload) => {};

// Delete category (admin)
const deleteCategory = async (id: string) => {};

export const categoryService = {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};

import { ICreateCategoryPayload, IUpdateCategoryPayload } from "./category.interface";

const getAllCategories = async () => {};

const getCategoryById = async (id: string) => {};

const createCategory = async (payload: ICreateCategoryPayload) => {};

const updateCategory = async (id: string, payload: IUpdateCategoryPayload) => {};

const deleteCategory = async (id: string) => {};

export const categoryService = {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};

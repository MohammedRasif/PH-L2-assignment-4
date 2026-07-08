import { NextFunction, Request, Response } from "express";
import { categoryService } from "./category.service";

// ========================
// Category Controller
// ========================

// GET /api/categories
const getAllCategories = async (req: Request, res: Response, next: NextFunction) => {};

// GET /api/categories/:id
const getCategoryById = async (req: Request, res: Response, next: NextFunction) => {};

// POST /api/admin/categories
const createCategory = async (req: Request, res: Response, next: NextFunction) => {};

// PUT /api/admin/categories/:id
const updateCategory = async (req: Request, res: Response, next: NextFunction) => {};

// DELETE /api/admin/categories/:id
const deleteCategory = async (req: Request, res: Response, next: NextFunction) => {};

export const categoryController = {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};

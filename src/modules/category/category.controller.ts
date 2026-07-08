import { NextFunction, Request, Response } from "express";
import { categoryService } from "./category.service";

const getAllCategories = async (req: Request, res: Response, next: NextFunction) => {};

const getCategoryById = async (req: Request, res: Response, next: NextFunction) => {};

const createCategory = async (req: Request, res: Response, next: NextFunction) => {};

const updateCategory = async (req: Request, res: Response, next: NextFunction) => {};

const deleteCategory = async (req: Request, res: Response, next: NextFunction) => {};

export const categoryController = {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};

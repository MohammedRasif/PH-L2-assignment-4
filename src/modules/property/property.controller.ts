import { NextFunction, Request, Response } from "express";
import { propertyService } from "./property.service";

// ========================
// Property Controller
// ========================

// GET /api/properties
const getAllProperties = async (req: Request, res: Response, next: NextFunction) => {};

// GET /api/properties/:id
const getPropertyById = async (req: Request, res: Response, next: NextFunction) => {};

// POST /api/landlord/properties
const createProperty = async (req: Request, res: Response, next: NextFunction) => {};

// PUT /api/landlord/properties/:id
const updateProperty = async (req: Request, res: Response, next: NextFunction) => {};

// DELETE /api/landlord/properties/:id
const deleteProperty = async (req: Request, res: Response, next: NextFunction) => {};

// PATCH /api/landlord/properties/:id/availability
const toggleAvailability = async (req: Request, res: Response, next: NextFunction) => {};

export const propertyController = {
  getAllProperties,
  getPropertyById,
  createProperty,
  updateProperty,
  deleteProperty,
  toggleAvailability,
};

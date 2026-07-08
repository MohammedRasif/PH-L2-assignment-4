import prisma from "../../lib/prisma";
import { ICreatePropertyPayload, IPropertyFilterQuery, IUpdatePropertyPayload } from "./property.interface";

// ========================
// Property Service
// ========================

// Get all properties with filters (public)
const getAllProperties = async (filters: IPropertyFilterQuery) => {};

// Get single property by id (public)
const getPropertyById = async (id: string) => {};

// Create new property (landlord)
const createProperty = async (ownerId: string, payload: ICreatePropertyPayload) => {};

// Update property (landlord)
const updateProperty = async (propertyId: string, ownerId: string, payload: IUpdatePropertyPayload) => {};

// Delete property (landlord)
const deleteProperty = async (propertyId: string, ownerId: string) => {};

// Toggle availability status (landlord)
const toggleAvailability = async (propertyId: string, ownerId: string) => {};

export const propertyService = {
  getAllProperties,
  getPropertyById,
  createProperty,
  updateProperty,
  deleteProperty,
  toggleAvailability,
};

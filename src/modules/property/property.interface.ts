import { ActiveStatus } from "../../../generated/prisma/enums";

// ========================
// Property Interfaces
// ========================

export interface ICreatePropertyPayload {
  title: string;
  description: string;
  price: number;
  location: string;
  bedrooms: number;
  bathrooms: number;
  categoryId: string;
  amenities?: string[];
  images?: string[];
  isAvailable?: boolean;
}

export interface IUpdatePropertyPayload {
  title?: string;
  description?: string;
  price?: number;
  location?: string;
  bedrooms?: number;
  bathrooms?: number;
  categoryId?: string;
  amenities?: string[];
  images?: string[];
  isAvailable?: boolean;
}

export interface IPropertyFilterQuery {
  location?: string;
  minPrice?: number;
  maxPrice?: number;
  categoryId?: string;
  bedrooms?: number;
  bathrooms?: number;
  isAvailable?: boolean;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

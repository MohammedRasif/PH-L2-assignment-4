


export interface ICreatePropertyPayload {
  title: string;
  description: string;
  price: number;
  location: string;
  bedrooms: number;
  bathrooms: number;
  categoryId: string;
  amenities?: string[];
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
  isAvailable?: boolean;
}

export interface IPropertyFilterQuery {
  location?: string;
  minPrice?: number;
  maxPrice?: number;
  categoryId?: string;
  bedrooms?: number;
  bathrooms?: number;
  amenities?: string[];  
  isAvailable?: boolean;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

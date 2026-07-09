export interface ICreateReviewPayload {
  propertyId: string;
  rating: number; // 1 - 5
  comment: string;
}

export interface IUpdateReviewPayload {
  rating?: number;
  comment?: string;
}

export interface IReviewFilterQuery {
  propertyId?: string;
  page?: number;
  limit?: number;
}

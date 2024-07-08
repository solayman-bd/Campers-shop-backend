import { Document } from 'mongoose';
// Define interface for Product document
export default interface IProduct extends Document {
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  ratings: number;
  isFeatured: boolean;
  salesCount: number;
  images: string[];
}
// interfaces/IGetProductsParams.ts
export interface IGetProductsParams {
  searchItem?: string;
  filterByCategory?: string;
  filterByPriceRangeMin?: string;
  filterByPriceRangeMax?: string;
  sort?: 'asc' | 'desc';
  page?: number;
  limit?: number;
}

export interface IProductCondition {
  [key: string]: {
    $regex: RegExp;
  };
}

export interface IProductConditions {
  $or?: IProductCondition[];
  category?: string;
  price?: {
    $gte?: number;
    $lte?: number;
  };
}

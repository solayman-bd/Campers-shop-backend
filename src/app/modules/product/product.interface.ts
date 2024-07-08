import { Document } from 'mongoose';
// Define interface for Product document
export default interface IProduct extends Document {
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  ratings: number;
  images: string[];
}

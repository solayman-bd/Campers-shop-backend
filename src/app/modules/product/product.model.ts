import mongoose, { Schema } from 'mongoose';
import IProduct from './product.interface';

const productSchema = new Schema<IProduct>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
  category: { type: String, required: true },
  ratings: { type: Number, default: 0 },
  images: { type: [String], default: [] },
  isFeatured: { type: Boolean, default: false },
  salesCount: { type: Number, default: 0 },
});
const ProductModel = mongoose.model<IProduct>('Product', productSchema);

export default ProductModel;

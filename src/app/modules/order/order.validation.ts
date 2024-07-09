import { z } from 'zod';
import mongoose from 'mongoose';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isObjectId = (val: any): val is mongoose.Types.ObjectId => {
  return mongoose.Types.ObjectId.isValid(val);
};
const productDetailSchema = z.object({
  productId: z.string().refine(isObjectId, {
    message: 'Invalid product ID',
  }),
  quantity: z.number().min(1, { message: 'Quantity must be at least 1' }),
  totalPrice: z
    .number()
    .min(0, { message: 'Total price must be a positive number' }),
});

const orderValidationSchema = z.object({
  body: z.object({
    name: z.string().min(1, { message: 'Name is required' }),
    email: z.string().email({ message: 'Invalid email address' }),
    phoneNumber: z.string().min(1, { message: 'Phone number is required' }),
    deliveryAddress: z
      .string()
      .min(1, { message: 'Delivery address is required' }),
    productDetails: z
      .array(productDetailSchema)
      .min(1, { message: 'Product details are required' }),
    totalCost: z
      .number()
      .min(0, { message: 'Total cost must be a positive number' }),
    paymentMethod: z.enum(['stripe', 'cashOnDelivery'], {
      message: 'Payment method must be either stripe or cashOnDelivery',
    }),
  }),
});

export const orderValidation = { orderValidationSchema };

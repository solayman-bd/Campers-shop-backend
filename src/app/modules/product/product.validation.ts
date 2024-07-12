import { z } from 'zod';

// Define Zod schema for Product
const ProductValidationSchema = z.object({
  body: z.object({
    name: z
      .string()
      .min(1, { message: 'Name must be at least 1 character long' })
      .max(255, { message: 'Name cannot exceed 255 characters' }),
    description: z
      .string()
      .min(1, { message: 'Description must be at least 1 character long' }),
    price: z.number().positive({ message: 'Price must be a positive number' }),
    stock: z
      .number()
      .min(0, { message: 'Stock must be a non-negative number' }),
    category: z
      .string()
      .min(1, { message: 'Category must be at least 1 character long' })
      .max(100, { message: 'Category cannot exceed 100 characters' }),
    ratings: z
      .number()
      .int()
      .min(0, { message: 'Ratings must be a non-negative integer' })
      .max(5, { message: 'Ratings cannot exceed 5' }),
    images: z
      .array(z.string())
      .min(1, { message: 'At least one image URL must be provided' }),
    isFeatured: z.boolean(),
    salesCount: z
      .number()
      .int()
      .min(0, { message: 'Sales count must be a non-negative integer' })
      .optional(),
  }),
});

export const productValidations = { ProductValidationSchema };

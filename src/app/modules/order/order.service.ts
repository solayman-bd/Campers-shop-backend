import IProduct from '../product/product.interface';
import ProductModel from '../product/product.model';
import { IOrder } from './order.interface';
import OrderModel from './order.model';

const createAnOrder = async (payload: IOrder) => {
  try {
    // Check if all products in the order exist and have sufficient quantities
    const productIds = payload.productDetails.map((detail) => detail.productId);

    // Fetch all products matching the productIds
    const products: IProduct[] = await ProductModel.find({
      _id: { $in: productIds },
    });

    // Validate products existence and reduce quantities
    for (const detail of payload.productDetails) {
      const product = products.find(
        (p) => p._id.toString() === detail.productId.toString(),
      ) as IProduct | undefined;
      if (!product) {
        throw new Error(`Product with ID ${detail.productId} not found`);
      }
      if (product.stock < detail.quantity) {
        throw new Error(`Insufficient stock for product ${product.name}`);
      }

      // Reduce the quantity in stock
      product.stock -= detail.quantity;
      await product.save(); // Save the updated product
    }

    // Create the order if all products are valid and quantities are reduced
    const result = await OrderModel.create(payload);
    return result;
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(err.message); // If it's a standard Error object, throw its message
    } else {
      throw new Error('Unknown error occurred'); // Handle other types of errors
    }
  }
};

export const orderServices = { createAnOrder };

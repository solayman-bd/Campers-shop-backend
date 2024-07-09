import { ObjectId } from 'mongoose';

export interface IProductDetail {
  productId: ObjectId;
  quantity: number;
  totalPrice: number;
}

export interface IOrder {
  name: string;
  email: string;
  phoneNumber: string;
  deliveryAddress: string;
  productDetails: IProductDetail[];
  totalCost: number;
  paymentMethod: 'stripe' | 'cashOnDelivery';
}

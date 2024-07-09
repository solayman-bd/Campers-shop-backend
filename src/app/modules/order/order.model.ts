import { Schema, model, Document } from 'mongoose';
import { IOrder, IProductDetail } from './order.interface';

interface IOrderModel extends IOrder, Document {}

const productDetailSchema = new Schema<IProductDetail>({
  productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, required: true },
  totalPrice: { type: Number, required: true },
});

const orderSchema = new Schema<IOrderModel>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  deliveryAddress: { type: String, required: true },
  productDetails: { type: [productDetailSchema], required: true },
  totalCost: { type: Number, required: true },
  paymentMethod: {
    type: String,
    enum: ['stripe', 'cashOnDelivery'],
    required: true,
  },
});

const OrderModel = model<IOrderModel>('Order', orderSchema);

export default OrderModel;

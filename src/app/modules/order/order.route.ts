import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { orderValidation } from './order.validation';
import { orderController } from './order.controller';

const router = express.Router();

router.post(
  '/create-an-order',
  validateRequest(orderValidation.orderValidationSchema),
  orderController.createAnOrder,
);

export const orderRoutes = router;

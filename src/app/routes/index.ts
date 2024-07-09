import { Router } from 'express';

import { productRoutes } from '../modules/product/product.route';
import { orderRoutes } from '../modules/order/order.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/order',
    route: orderRoutes,
  },
  {
    path: '/product',
    route: productRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;

import { Router } from 'express';
import { userRoutes } from '../modules/user/user.route';
import { productRoutes } from '../modules/product/product.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: userRoutes,
  },
  {
    path: '/product',
    route: productRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;

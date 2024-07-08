import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { productValidations } from './product.validation';
import { productControllers } from './product.controller';
import authGuard from '../../utils/authGuard';
const router = express.Router();

router.post(
  '/create-a-product',
  authGuard('admin'),
  validateRequest(productValidations.ProductValidationSchema),
  productControllers.createAProduct,
);
router.get('/get-all-products', productControllers.getAllProducts);
router.get(
  '/get-best-selling-products',
  productControllers.getBestSellingProducts,
);
router.get('/get-all-categories', productControllers.getAllCategories);
router.get('/:productId', productControllers.getASingleProduct);

router.patch(
  '/update-a-product',
  authGuard('admin'),
  productControllers.updateAProduct,
);
router.delete(
  '/delete-a-product',
  authGuard('admin'),
  productControllers.deleteAProduct,
);

export const productRoutes = router;

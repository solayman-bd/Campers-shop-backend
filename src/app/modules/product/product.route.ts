import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { productValidations } from './product.validation';
import { productControllers } from './product.controller';
const router = express.Router();

router.post(
  '/create-a-product',
  validateRequest(productValidations.ProductValidationSchema),
  productControllers.createAProduct,
);
router.get('/get-all-products', productControllers.getAllProducts);
router.get('/', productControllers.getProductsByQuery);
router.get(
  '/get-best-selling-products',
  productControllers.getBestSellingProducts,
);
router.get('/get-all-categories', productControllers.getAllCategories);
router.get('/:productId', productControllers.getASingleProduct);

router.patch('/update-a-product', productControllers.updateAProduct);
router.delete('/delete-a-product', productControllers.deleteAProduct);

export const productRoutes = router;

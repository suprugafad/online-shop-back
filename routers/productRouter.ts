import { Router } from 'express';
import productController from '../controllers/productController';

const productRouter = Router();

productRouter.get('/', productController.getProducts);
productRouter.get('/:id', productController.getProductById);
productRouter.put('/:id', productController.updateProduct);
productRouter.post('/', productController.postProduct);
productRouter.delete('/:id', productController.deleteProduct);

export default productRouter;

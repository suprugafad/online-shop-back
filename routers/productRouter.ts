import { Router } from 'express';
import productController from '../controllers/productController';
import upload from "../middleware/imageUploadMW";

const cors = require("cors");

const router = Router();

router.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));

router.get('/', productController.getProducts);
router.post(
  "/",
  upload.fields([{ name: 'mainImage', maxCount: 1 }, { name: 'additionalImages', maxCount: 10 }]),
  productController.postProduct
);
router.get('/:id', productController.getProductById);
router.put('/:id', productController.updateProduct);
router.delete('/:id', productController.deleteProduct);
router.get('/title/:title', productController.getProductByTitle);

export default router;

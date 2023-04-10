const express = require('express');
import productCategoryController from '../controllers/productCategoryController';

const router = express.Router();

router.get('/', productCategoryController.getAllCategoryProduct);
router.get('/:filterType/:filterValue', productCategoryController.getProductsByCategoryId);
router.post('/', productCategoryController.createProductCategory);
router.delete('/:id', productCategoryController.deleteProductCategory);
router.delete('/:productId/:categoryId', productCategoryController.deleteProductCategoriesByProductId);
router.put('/:productId', productCategoryController.updateProductCategory);

export default router;

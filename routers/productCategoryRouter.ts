import {Router} from "express";

const express = require('express');
import productCategoryController from '../controllers/productCategoryController';
const cors = require("cors");

const router = Router();

router.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));

router.get('/', productCategoryController.getAllCategoryProduct);
router.get('/:filterType/:filterValue', productCategoryController.getByFilter);
router.post('/', productCategoryController.createProductCategory);
router.delete('/:productId/:categoryId', productCategoryController.deleteByProductIdAndCategoryId);
router.put('/:productId', productCategoryController.updateProductCategory);

export default router;

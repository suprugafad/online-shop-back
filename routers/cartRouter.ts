import { Router } from 'express';
import CartController from '../controllers/cartController';
import cartController from "../controllers/cartController";

const cors = require("cors");

const router = Router();

router.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));

router.post('/', CartController.createCart);
router.get('/:userId', cartController.getCartByUserId);

export default router;
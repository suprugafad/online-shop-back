import { Router } from 'express';
import cartItemController from '../controllers/cartItemController';

const router = Router();

router.post('/', cartItemController.createCartItem);
router.get('/', cartItemController.getAllCartItems);
router.delete('/:id', cartItemController.deleteCartItem);
router.get('/:id', cartItemController.getCartItemById);
router.put('/:id', cartItemController.updateCartItem);
router.get('/cart/:cartId', cartItemController.getAllByCartId);
router.get('/cart/:cartId/count', cartItemController.getItemCount);
router.delete('/cart/:cartId', cartItemController.deleteAllCartItemsFromCart);

export default router;

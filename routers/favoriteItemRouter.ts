import { Router } from 'express';
import favoriteItemController from '../controllers/favoriteItemController';

const router = Router();

router.post('/', favoriteItemController.createFavoriteItem);
router.get('/', favoriteItemController.getAllFavoriteItems);
router.get('/user/:userId', favoriteItemController.getAllFavoriteItemsByUserId);
router.get('/user/:userId/product/:productId', favoriteItemController.isFavoriteItem);
router.delete('/:id', favoriteItemController.deleteFavoriteItem);
router.delete('/user/:userId/product/:productId', favoriteItemController.deleteFavoriteItemByUserIdAndProductId);
router.get('/:id', favoriteItemController.getFavoriteItemById);


export default router;
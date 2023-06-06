import { Router } from 'express';
import favoriteItemController from '../controllers/favoriteItemController';

const router = Router();

router.post('/', favoriteItemController.createFavoriteItem);
router.get('/', favoriteItemController.getAllFavoriteItems);
router.delete('/:id', favoriteItemController.deleteFavoriteItem);
router.get('/:id', favoriteItemController.getFavoriteItemById);
router.get('/user/:userId', favoriteItemController.getAllFavoriteItemsByUserId);
router.get('/user/:userId/product/:productId', favoriteItemController.isFavoriteItem);

export default router;
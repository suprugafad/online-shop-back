import FavoriteItemDTO from '../dtos/favoriteItemDTO';
import { FavoriteItemRepositoryImpl } from '../repositories/favoriteItemRepositoryImpl';
import {Request, Response} from "express";

const favoriteItemRepository = new FavoriteItemRepositoryImpl();

class FavoriteItemController {
  public createFavoriteItem = async (req: Request, res: Response) => {
    try {
      const { productId, userId } = req.body;

      const newFavoriteItem = new FavoriteItemDTO(null, productId, userId);

      await favoriteItemRepository.create(newFavoriteItem);

      res.status(201).send('Favorite item created successfully');
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error creating favorite item.' });
    }
  };

  public getAllFavoriteItems = async (req: Request, res: Response) => {
    try {
      const favoriteItems = await favoriteItemRepository.getAll();

      res.status(200).json(favoriteItems);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error getting all favorite items.' });
    }
  };

  public deleteFavoriteItem = async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const favoriteItem = await favoriteItemRepository.getById(id);

      if (!favoriteItem) {
        return res.status(404).json({ message: 'Favorite item not found.' });
      }

      await favoriteItemRepository.delete(id);

      res.status(200).send('Favorite item deleted successfully');
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error deleting favorite item.' });
    }
  };

  public getFavoriteItemById = async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);

      const favoriteItem = await favoriteItemRepository.getById(id);

      if (!favoriteItem) {
        return res.status(404).json({message: 'Favorite item not found'});
      }

      res.status(200).json(favoriteItem);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error getting favorite item by ID.' });
    }
  };

  public getAllFavoriteItemsByUserId = async (req: Request, res: Response) => {
    try {
      const userId = parseInt(req.params.userId);

      const favoriteItems = await favoriteItemRepository.getAllByUserId(userId);

      res.status(200).json(favoriteItems);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error getting favorite items by user ID.' });
    }
  };

  public isFavoriteItem = async (req: Request, res: Response) => {
    try {
      const { productId, userId } = req.body;

      const isFavorite = await favoriteItemRepository.isFavoriteItem(userId, productId);

      res.status(201).json({isFavorite});
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error getting is favorite item.' });
    }
  };
}

export default new FavoriteItemController();

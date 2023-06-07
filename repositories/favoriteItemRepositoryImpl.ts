import FavoriteItemDTO from "../dtos/favoriteItemDTO"
import { query } from "../db";

export class FavoriteItemRepositoryImpl  {
  async create(favoriteItem: FavoriteItemDTO): Promise<void> {
    const queryText = 'INSERT INTO favorite_item (product_id, user_id) VALUES ($1, $2)';
    const values = [favoriteItem.productId, favoriteItem.userId];

    try {
      await query(queryText, values);
    } catch (err) {
      throw new Error('Unable to create favorite item');
    }
  }

  async getAll(): Promise<FavoriteItemDTO[]> {
    const queryText = 'SELECT id, product_id, user_id FROM favorite_item ORDER BY id ASC';

    try {
      const result = await query(queryText);

      return result.rows.map(row => new FavoriteItemDTO(row.id, row.product_id, row.user_id));
    } catch (err) {
      throw new Error('Unable to get all favorite items');
    }
  }

  async delete(id: number): Promise<void> {
    const queryText = 'DELETE FROM favorite_item WHERE id = $1';
    const values = [id];

    try {
      await query(queryText, values);
    } catch (err) {
      throw new Error('Unable to delete favorite item');
    }
  }

  async deleteByUserIdAndProductId(userId: number, productId: number): Promise<void> {
    const queryText = 'DELETE FROM favorite_item WHERE user_id = $1 AND product_id = $2';
    const values = [userId, productId];

    try {
      await query(queryText, values);
    } catch (err) {
      throw new Error('Unable to delete favorite item by user id and product id');
    }
  }

  async getById(id: number): Promise<FavoriteItemDTO | null> {
    const queryText = 'SELECT id, product_id, user_id FROM favorite_item WHERE id = $1';
    const values = [id];

    try {
      const result = await query(queryText, values);

      if (result.rows.length > 0) {
        const {id, product_id, user_id} = result.rows[0];

        return new FavoriteItemDTO(id, product_id, user_id);
      }
    } catch (err) {
      throw new Error('Unable to get favorite item by id');
    }
    return null;
  }

  async isFavoriteItem(userId: number, productId: number): Promise<boolean> {
    const queryText = 'SELECT id, product_id, user_id FROM favorite_item WHERE user_id = $1 AND product_id = $2';
    const values = [userId, productId];

    try {
      const result = await query(queryText, values);
      if (result.rows.length > 0) {
        return true;
      }
    } catch (err) {
      throw new Error('Unable to get favorite item by id');
    }
    return false;
  }

  async getAllByUserId(userId: number): Promise<any[]> {
    const queryText = `SELECT favorite_item.id, favorite_item.product_id, product.title, product.price, product.main_image 
                        FROM favorite_item 
                        LEFT JOIN product ON product.id = favorite_item.product_id 
                        WHERE user_id = $1 
                        ORDER BY id DESC`;

    const values = [userId];

    try {
      const result = await query(queryText, values);

      return result.rows.map(row => ({id: row.id, productId: row.product_id, title: row.title, price: row.price, mainImage: row.main_image}));
    } catch (err) {
      throw new Error('Unable to get favorite items of user');
    }
  }
}
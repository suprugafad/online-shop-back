import { query } from "../db";
import { IRepository } from "./IRepository";
import CartDTO from "../dtos/cartDTO";

export class CartRepositoryImpl implements IRepository<CartDTO> {
  async create(cart: CartDTO): Promise<void> {
    const queryText = 'INSERT INTO cart (user_id) VALUES ($1) RETURNING id';
    const values = [cart.userId];

    try {
      await query(queryText, values);
    } catch (err) {
      throw new Error('Unable to create cart');
    }
  }

  async getAll(): Promise<CartDTO[]> {
    const queryText = 'SELECT id, user_id, created_at FROM cart ORDER BY id ASC';

    try {
      const result = await query(queryText);

      return result.rows.map(row => new CartDTO(row.id, row.userId, row.createdAt));
    } catch (err) {
      throw new Error('Unable to get all carts');
    }
  }

  async delete(id: number): Promise<void> {
    const queryText = 'DELETE FROM cart WHERE id = $1';
    const values = [id];

    try {
      await query(queryText, values);
    } catch (err) {
      throw new Error('Unable to delete cart');
    }
  }

  async getById(id: number): Promise<CartDTO|null> {
    const queryText = 'SELECT id, user_id, created_at FROM cart WHERE id = $1';
    const values = [id];

    try {
      const result = await query(queryText, values);

      if (result.rows.length > 0) {
        const {id, user_id, created_at} = result.rows[0];

        return new CartDTO(id, user_id, created_at);
      }
    } catch (err) {
      throw new Error('Unable to get cart');
    }
    return null;
  }

  async update(cart: CartDTO): Promise<void> {
    const queryText = 'UPDATE cart SET user_id = $1 WHERE id = $2';
    const values = [cart.userId, cart.id];

    try {
      await query(queryText, values);
    } catch (err) {
      throw new Error('Unable to update cart');
    }
  }
}

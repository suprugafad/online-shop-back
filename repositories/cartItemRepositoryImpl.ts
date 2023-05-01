import CartItemDTO from "../dtos/cartItemDTO";
import { query } from "../db";
import { ICartItemRepository } from "./interfaces/ICartItemRepository";
import cartItemDTO from "../dtos/cartItemDTO";

export class CartItemRepositoryImpl implements ICartItemRepository {
  async create(cartItem: CartItemDTO): Promise<void> {
    const queryText = 'INSERT INTO cart_item (product_id, quantity, cart_id) VALUES ($1, $2, $3)';
    const values = [cartItem.productId, cartItem.quantity, cartItem.cartId];

    try {
      await query(queryText, values);
    } catch (err) {
      throw new Error('Unable to create cart item');
    }
  }

  async getAll(): Promise<CartItemDTO[]> {
    const queryText = 'SELECT id, product_id, quantity, cart_id FROM cart_item ORDER BY id ASC';

    try {
      const result = await query(queryText);

      return result.rows.map(row => new CartItemDTO(row.id, row.productId, row.quantity, row.cartId));
    } catch (err) {
      throw new Error('Unable to get all cart items');
    }
  }

  async delete(id: number): Promise<void> {
    const queryText = 'DELETE FROM cart_item WHERE id = $1';
    const values = [id];

    try {
      await query(queryText, values);
    } catch (err) {
      throw new Error('Unable to delete cart item');
    }
  }

  async deleteAllByCartId(cartId: number): Promise<void> {
    const queryText = 'DELETE FROM cart_item WHERE cart_id = $1';
    const values = [cartId];

    try {
      await query(queryText, values);
    } catch (err) {
      throw new Error('Unable to get cart items for cart');
    }
  }

  async getById(id: number): Promise<CartItemDTO|null> {
    const queryText = 'SELECT id, product_id, quantity, cart_id FROM cart_item WHERE id = $1';
    const values = [id];

    try {
      const result = await query(queryText, values);

      if (result.rows.length > 0) {
        const {id, product_id, quantity, cart_id} = result.rows[0];

        return new CartItemDTO(id, product_id, quantity, cart_id);
      }
    } catch (err) {
      throw new Error('Unable to get cart item');
    }
    return null;
  }

  async update(cartItem: CartItemDTO): Promise<void> {
    const queryText = 'UPDATE cart_item SET product_id = $1, quantity = $2, cart_id = $3 WHERE id = $4';
    const values = [cartItem.productId, cartItem.quantity, cartItem.cartId, cartItem.id];

    try {
      await query(queryText, values);
    } catch (err) {
      throw new Error('Unable to update cart item');
    }
  }

  async getAllByCartId(cartId: number): Promise<CartItemDTO[]> {
    const queryText = 'SELECT id, product_id, quantity, cart_id FROM cart_item WHERE cart_id = $1 ORDER BY id ASC';
    const values = [cartId];

    try {
      const result = await query(queryText, values);

      return result.rows.map(row => new CartItemDTO(row.id, row.product_id, row.quantity, row.cart_id));
    } catch (err) {
      throw new Error('Unable to get cart items for cart');
    }
  }

  async getItemCount(cartId: number): Promise<number> {
    const queryText = 'SELECT SUM(quantity) as count FROM cart_item WHERE cart_id = $1;';
    const values = [cartId];

    try {
      const result = await query(queryText, values);

      return parseInt(result.rows[0].count);
    } catch (err) {
      throw new Error('Unable to get cart item count');
    }
  };

  async getByProductIdAndCartId(productId: number, cartId: number):Promise<cartItemDTO | null> {
    const queryText = 'SELECT id, product_id, quantity, cart_id FROM cart_item WHERE product_id = $1 AND cart_id = $2;';
    const values = [productId, cartId];

    try {
      const result = await query(queryText, values);

      if (result.rows.length > 0) {
        const {id, product_id, quantity, cart_id} = result.rows[0];

        return new CartItemDTO(id, product_id, quantity, cart_id);
      }
    } catch (err) {
      throw new Error('Unable to get cart item');
    }
    return null;
  }
}

import { IOrderRepository } from "./interfaces/IOrderRepository";
import { query } from '../db';
import OrderDTO from "../dtos/orderDTO";

export class OrderRepositoryImpl implements IOrderRepository {
  async create(order: OrderDTO): Promise<void> {
    const queryText = `INSERT INTO order (user_id, total_price, comment, status, products, address_id) VALUES ($1, $2, $3, $4, $5, $6);`;
    const values = [order.userId, order.totalPrice, order.comment, order.status, order.products, order.addressId];

    try {
      await query(queryText, values);
    } catch (err) {
      throw new Error('Unable to create order');
    }
  };

  async getAll(): Promise<OrderDTO[]> {
    const queryText = `SELECT id, user_id, total_price, comment, status, products, address_id FROM order ORDER BY id ASC;`;

    try {
      const result = await query(queryText);

      return result.rows.map(row => new OrderDTO(row.id, row.userId, row.totalPrice, row.comment, row.status, row.products, row.addressId));
    } catch (err) {
      throw new Error('Unable to get all orders');
    }
  };

  async getById(id: number): Promise<OrderDTO | null> {
    const queryText = `SELECT id, user_id, total_price, comment, status, products, address_id FROM order WHERE id = $1;`;
    const values = [id];

    try {
      const result = await query(queryText, values);

      if (result.rows.length > 0) {
        const { id, userId, totalPrice, comment, status, products, addressId } = result.rows[0];

        return new OrderDTO(id, userId, totalPrice, comment, status, products, addressId);
      }
    } catch (err) {
      throw new Error('Unable to get order by ID');
    }
    return null;
  };

  async filterByParameter(type: string, value: string | number): Promise<OrderDTO[]> { // user_id, status
    const queryText = `SELECT id, user_id, total_price, comment, status, products, address_id FROM order WHERE ${type} = $1`;
    const values = [value];

    try {
      const result = await query(queryText, values);

      return result.rows.map(row => new OrderDTO(row.id, row.userId, row.totalPrice, row.comment, row.status, row.products, row.addressId));
    } catch (err) {
      throw new Error(`Unable to get orders by ${type}`);
    }
  };

  async delete(id: number): Promise<void> {
    const queryText = 'DELETE FROM order WHERE id = $1';
    const values = [id];

    try {
      await query(queryText, values);
    } catch (err) {
      throw new Error('Unable to delete order');
    }
  };

  async update(order: OrderDTO): Promise<void> {
    const queryText = 'UPDATE product SET totalPrice = $1, comment = $2, status = $3, addressId = $4 WHERE id = $5';
    const values = [order.totalPrice, order.comment, order.status, order.addressId, order.id];

    try {
      await query(queryText, values);
    } catch (err) {
      throw new Error('Unable to update order');
    }
  }
}
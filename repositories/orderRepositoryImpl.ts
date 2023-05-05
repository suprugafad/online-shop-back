import { IOrderRepository } from "./interfaces/IOrderRepository";
import { query } from '../db';
import OrderDTO from "../dtos/orderDTO";

export class OrderRepositoryImpl implements IOrderRepository {
  async create(order: OrderDTO): Promise<void> {
    const queryText = `INSERT INTO "order" (user_id, total_price, comment, status, products, address_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id;`;
    const values = [order.userId, order.totalPrice, order.comment, order.status.toLowerCase(), JSON.stringify(order.products).toString(), order.addressId];

    try {
      const result = await query(queryText, values);

      return result.rows[0].id;
    } catch (err) {
      throw new Error('Unable to create order');
    }
  };

  async getAll(): Promise<OrderDTO[]> {
    const queryText = `SELECT id, user_id, total_price, comment, status, products, address_id, created_at FROM "order" ORDER BY id ASC;`;

    try {
      const result = await query(queryText);

      return result.rows.map(row => new OrderDTO(row.id, row.products, row.userId, row.status, row.comment, row.totalPrice, row.addressId, row.createdAt));
    } catch (err) {
      throw new Error('Unable to get all orders');
    }
  };

  async getById(id: number): Promise<OrderDTO | null> {
    const queryText = `SELECT id, user_id, total_price, comment, status, products, address_id, created_at FROM order WHERE id = $1;`;
    const values = [id];

    try {
      const result = await query(queryText, values);

      if (result.rows.length > 0) {
        const { id, userId, totalPrice, comment, status, products, addressId, createdAt } = result.rows[0];

        return new OrderDTO(id, products, userId, status, comment, totalPrice, addressId, createdAt);
      }
    } catch (err) {
      throw new Error('Unable to get order by ID');
    }
    return null;
  };

  async filterByParameter(type: string, value: string | number): Promise<OrderDTO[]> { // user_id, status
    const queryText = `SELECT id, user_id, total_price, comment, status, products, address_id, created_at FROM "order" WHERE ${type} = $1 ORDER BY created_at ASC;`;
    const values = [value];

    try {
      const result = await query(queryText, values);

      return result.rows.map(row => new OrderDTO(row.id, row.products, row.user_id, row.status, row.comment, row.total_price, row.address_id, row.created_at));
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
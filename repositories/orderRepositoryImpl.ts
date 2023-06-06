import { IOrderRepository } from "./interfaces/IOrderRepository";
import { query } from '../db';
import OrderDTO from "../dtos/orderDTO";
import ProductDTO from "../dtos/productDTO";

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

      return result.rows.map(row => new OrderDTO(row.id, row.products, row.user_id, row.status, row.comment, row.total_price, row.address_id, row.created_at));
    } catch (err) {
      throw new Error('Unable to get all orders');
    }
  };

  async getAllFullInfo(): Promise<{id: number, createdAt: Date, userId: number, userEmail: string, comment: string, totalPrice: number, status: string, products: ProductDTO[], address: string, paymentMethod: string, paymentStatus: string }[]> {
    const queryText = `SELECT "order".id, "order".created_at, "order".total_price, "order".comment, "order".status, "order".products, 
                      "user".email, "order".user_id, address.country, address.city, address.street, address.house, address.apartment, 
                      payment.status AS payment_status, payment.method 
                      FROM "order"
                      LEFT JOIN address ON "order".address_id = address.id 
                      LEFT JOIN "user" ON "order".user_id = "user".id
                      LEFT JOIN payment ON payment.order_id = "order".id`;

    try {
      const result = await query(queryText);

      return result.rows.map(row => ({
        id: row.id,
        createdAt: row.created_at,
        userId: row.user_id,
        userEmail: row.email,
        comment: row.comment,
        totalPrice: row.total_price,
        status: row.status,
        products: row.products,
        address: `${row.country}, ${row.city}, ${row.street} ${row.house}, ${row.apartment ? 'Apt. ' + row.apartment : ''}`,
        paymentMethod: row.method,
        paymentStatus: row.payment_status,
      }));

    } catch (err) {
      throw new Error('Unable to get all orders');
    }
  };

  async getById(id: number): Promise<OrderDTO | null> {
    const queryText = `SELECT id, user_id, total_price, comment, status, products, address_id, created_at FROM "order" WHERE id = $1;`;
    const values = [id];

    try {
      const result = await query(queryText, values);

      if (result.rows.length > 0) {
        const { id, user_id, total_price, comment, status, products, address_id, created_at } = result.rows[0];

        return new OrderDTO(id, products, user_id, status, comment, total_price, address_id, created_at);
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

  async filterByProductId(productId: number): Promise<OrderDTO[]> {
    const queryText = `SELECT id, user_id, total_price, comment, status, products, address_id, created_at FROM "order" WHERE products @> '[{"id": ${productId}}]'::jsonb ORDER BY created_at ASC;`;

    try {
      const result = await query(queryText);

      return result.rows.map(row => new OrderDTO(row.id, row.products, row.user_id, row.status, row.comment, row.total_price, row.address_id, row.created_at));
    } catch (err) {
      console.error(err);
      throw new Error(`Unable to get orders by product id`);
    }
  };

  async getAmountOfDelivered(): Promise<number> {
    const queryText = `SELECT COUNT(*) FROM "order" WHERE status = 'delivered';`;

    try {
      const result = await query(queryText);
      return parseInt(result.rows[0].count);
    } catch (err) {
      throw new Error('Unable to count all users');
    }
  };

  async getMonthlySales(): Promise<{ month: number, total_sales: number }[]> {
    const queryText = `
    SELECT EXTRACT(MONTH FROM created_at) AS month, SUM(total_price) as total_sales
    FROM "order"
    WHERE status='delivered'
    GROUP BY month
    ORDER BY month ASC;
  `;

    try {
      const result = await query(queryText);

      return result.rows;
    } catch (err) {
      throw new Error('Unable to get monthly sales');
    }
  };

  async delete(id: number): Promise<void> {
    const queryText = 'DELETE FROM "order" WHERE id = $1';
    const values = [id];

    try {
      await query(queryText, values);
    } catch (err) {
      throw new Error('Unable to delete order');
    }
  };

  async update(order: OrderDTO): Promise<void> {
    const queryText = 'UPDATE "order" SET total_price = $1, comment = $2, status = $3, address_id = $4 WHERE id = $5';
    const values = [order.totalPrice, order.comment, order.status, order.addressId, order.id];

    try {
      await query(queryText, values);
    } catch (err) {
      throw new Error('Unable to update order');
    }
  }
}
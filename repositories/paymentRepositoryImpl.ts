import PaymentDTO from "../dtos/paymentDTO";
import { query } from "../db";
import { IPaymentRepository } from "./interfaces/IPaymentRepository";

export class PaymentRepositoryImpl implements IPaymentRepository {
  async create(payment: PaymentDTO): Promise<void> {
    const queryText = 'INSERT INTO payment (user_id, order_id, transaction_id, amount, transaction_date, method, status) VALUES ($1, $2, $3, $4, $5, $6, $7)';
    const values = [payment.userId, payment.orderId, payment.transactionId, payment.amount, payment.transactionDate, payment.method, payment.status];

    try {
      await query(queryText, values);
    } catch (err) {
      throw new Error('Unable to create payment');
    }
  };

  async getAll(): Promise<PaymentDTO[]> {
    const queryText = 'SELECT id, user_id, order_id, transaction_id, amount, transaction_date, method, status FROM payment ORDER BY id ASC';

    try {
      const result = await query(queryText);

      return result.rows.map(row => new PaymentDTO(null, row.userId, row.orderId, row.transactionId, row.amount, row.transactionDate, row.method, row.status));
    } catch (err) {
      throw new Error('Unable to get all payments');
    }
  };

  async delete(id: number): Promise<void> {
    const queryText = 'DELETE FROM payment WHERE id = $1';
    const values = [id];

    try {
      await query(queryText, values);
    } catch (err) {
      throw new Error('Unable to delete payment');
    }
  };

  async getById(id: number): Promise<PaymentDTO | null> {
    const queryText = 'SELECT id, user_id, order_id, transaction_id, amount, transaction_date, method, status FROM payment WHERE id = $1';
    const values = [id];

    try {
      const result = await query(queryText, values);

      if (result.rows.length > 0) {
        const { id, userId, orderId, transactionId, amount, transactionDate, method, status } = result.rows[0];

        return new PaymentDTO(id, userId, orderId, transactionId, amount, transactionDate, method, status);
      }
    } catch (err) {
      throw new Error('Unable to get cart item by ID');
    }
    return null;
  };

  async update(payment: PaymentDTO): Promise<void> {
    const queryText = 'UPDATE payment SET user_id = $1, order_id = $2, transaction_id = $3, amount = $4, transaction_date = $5, method = $6, status = $7 WHERE id = $8';
    const values = [payment.userId, payment.orderId, payment.transactionId, payment.amount, payment.transactionDate, payment.method, payment.status, payment.id];

    try {
      await query(queryText, values);
    } catch (err) {
      throw new Error('Unable to update payment');
    }
  };

  async filterByParameter(type: string, value: string | number): Promise<PaymentDTO[]> { // method, status, order_id, user_id, transaction_id
    const queryText = `SELECT id, user_id, order_id, transaction_id, amount, transaction_date, method, status FROM payment WHERE ${type} = $1`;
    const values = [value];

    try {
      const result = await query(queryText, values);

      return result.rows.map(row => new PaymentDTO(row.id, row.user_id, row.order_id, row.transaction_id, row.amount, row.transaction_date, row.method, row.status));
    } catch (err) {
      throw new Error(`Unable to get payments by ${type}`);
    }
  };

  async getRevenueByMonth(year: number, month: number): Promise<number> {
    const queryText = 'SELECT SUM(amount) FROM payment WHERE EXTRACT(YEAR FROM transaction_date) = $1 AND EXTRACT(MONTH FROM transaction_date) = $2';
    const values = [year, month];

    try {
      const result = await query(queryText, values);

      const { sum } = result.rows[0];

      return sum || 0;
    } catch (err) {
      throw new Error('Unable to calculate revenue');
    }
  };

  async getTotalAmount(): Promise<number> {
    const queryText = 'SELECT SUM(amount) FROM payment';

    try {
      const result = await query(queryText);

      const { sum } = result.rows[0];

      return sum || 0;
    } catch (err) {
      throw new Error('Unable to get total amount');
    }
  };
}
import {IReviewRepository} from "./interfaces/IReviewRepository";
import ReviewDTO from "../dtos/reviewDTO";
import { query } from "../db";

export class ReviewRepositoryImpl implements IReviewRepository {
  async create(review: ReviewDTO): Promise<void> {
    const queryText = `INSERT INTO review (product_id, user_id, rating, comment) VALUES ($1, $2, $3, $4);`;
    const values = [review.productId, review.userId, review.rating, review.comment];

    try {
      await query(queryText, values);
    } catch (err) {
      throw new Error('Unable to create review');
    }
  };

  async getAll(): Promise<ReviewDTO[]> {
    const queryText = `SELECT id, product_id, user_id, rating, comment, created_at FROM review ORDER BY id ASC;`;

    try {
      const result = await query(queryText);

      return result.rows.map(row => new ReviewDTO(row.id, row.product_id, row.user_id, row.rating, row.comment, row.created_at));
    } catch (err) {
      throw new Error('Unable to get all reviews');
    }
  };

  async getById(id: number): Promise<ReviewDTO | null> {
    const queryText = `SELECT id, product_id, user_id, rating, comment, created_at FROM review WHERE id = $1;`;
    const values = [id];

    try {
      const result = await query(queryText, values);

      if (result.rows.length > 0) {
        const {id, product_id, user_id, rating, comment, created_at} = result.rows[0];

        return new ReviewDTO(id, product_id, user_id, rating, comment, created_at);
      }
    } catch (err) {
      throw new Error('Unable to get review');
    }
    return null;
  };

  async filterByParameter(type: string, value: string | number): Promise<ReviewDTO[]> { // user_id, product_id
    const queryText = `SELECT id, product_id, user_id, rating, comment, created_at FROM review WHERE ${type} = $1;`;
    const values = [value];

    try {
      const result = await query(queryText, values);

      return result.rows.map(row => new ReviewDTO(row.id, row.product_id, row.user_id, row.rating, row.comment, row.created_at));
    } catch (err) {
      throw new Error(`Unable to get review by ${type}`);
    }
  };

  async getByProductIdAndRating(productId: number, rating: number): Promise<ReviewDTO[]> {
    const queryText = `SELECT id, product_id, user_id, rating, comment, created_at FROM review WHERE product_id = $1 AND rating = $2;`;
    const values = [productId, rating];

    try {
      const result = await query(queryText, values);

      return result.rows.map(row => new ReviewDTO(row.id, row.product_id, row.user_id, row.rating, row.comment, row.created_at));
    } catch (err) {
      throw new Error('Unable to get review');
    }
  };

  async delete(id: number): Promise<void> {
    const queryText = 'DELETE FROM review WHERE id = $1';
    const values = [id];

    try {
      await query(queryText, values);
    } catch (err) {
      throw new Error('Unable to delete review');
    }
  };

  async update(review: ReviewDTO): Promise<void> {
    const queryText = 'UPDATE review SET rating = $1, comment = $2 WHERE id = $3';
    const values = [review.rating, review.comment, review.id];

    try {
      await query(queryText, values);
    } catch (err) {
      throw new Error('Unable to update review');
    }
  };

  async deleteByProductId(productId: number): Promise<void> {
    const queryText = 'DELETE FROM review WHERE product_id = $1';
    const values = [productId];

    try {
      await query(queryText, values);
    } catch (err) {
      throw new Error('Unable to delete review by product ID');
    }
  };

  async getAverageRatingByProductId(productId: number): Promise<number> {
    const queryText = `SELECT AVG(rating) as average_rating FROM review WHERE product_id = $1;`;
    const values = [productId];

    try {
      const result = await query(queryText, values);

      return parseFloat(result.rows[0].average_rating);
    } catch (err) {
      throw new Error('Unable to get average rating');
    }
  };

  async getByUserIdAndProductId(userId: number, productId: number): Promise<ReviewDTO | null> {
    const queryText = `SELECT id, product_id, user_id, rating, comment, created_at FROM review WHERE product_id = $1 AND user_id = $2;`;
    const values = [productId, userId];

    try {
      const result = await query(queryText, values);

      if (result.rows.length > 0) {
        const {id, product_id, user_id, rating, comment, created_at} = result.rows[0];

        return new ReviewDTO(id, product_id, user_id, rating, comment, created_at);
      }
    } catch (err) {
      throw new Error('Unable to get review by user ID and product ID');
    }
    return null;
  };
}
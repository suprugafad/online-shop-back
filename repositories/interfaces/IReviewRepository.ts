import { IRepository } from "./IRepository";
import ReviewDTO from "../../dtos/reviewDTO";

export interface IReviewRepository extends IRepository<ReviewDTO> {
  getByUserId(id: number): Promise<ReviewDTO | null>;

  getByProductId(id: number): Promise<ReviewDTO | null>;

  getByProductIdAndRating(productId: number, rating: number): Promise<ReviewDTO[]>;

  getUserReview(userId: number, productId: number): Promise<ReviewDTO | null>;

  getAverageRatingByProductId(productId: number): Promise<number>;

  deleteByProductId(productId: number): Promise<void>;
}
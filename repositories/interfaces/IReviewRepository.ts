import { IRepository } from "./IRepository";
import ReviewDTO from "../../dtos/reviewDTO";

export interface IReviewRepository extends IRepository<ReviewDTO> {
  filterByParameter(type: string, value: string | number): Promise<ReviewDTO[]>;

  getByProductIdAndRating(productId: number, rating: number): Promise<ReviewDTO[]>;

  getByUserIdAndProductId(userId: number, productId: number): Promise<ReviewDTO | null>;

  getAverageRatingByProductId(productId: number): Promise<number>;

  deleteByProductId(productId: number): Promise<void>;
}
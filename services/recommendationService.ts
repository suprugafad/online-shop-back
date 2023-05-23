import { ReviewRepositoryImpl } from '../repositories/reviewRepositoryImpl';
import { ProductRepositoryImpl } from '../repositories/productRepositoryImpl';
import { ProductCategoryRepositoryImpl } from '../repositories/productCategoryRepositoryImpl';

import { OrderService } from "./orserService";
import ProductDTO from "../dtos/productDTO";
import CategoryDTO from "../dtos/categoryDTO";

const reviewRepository = new ReviewRepositoryImpl();
const productRepository = new ProductRepositoryImpl();
const productCategoryRepository = new ProductCategoryRepositoryImpl();
const orderService = new OrderService();

function getContentBasedScore(product: ProductDTO, favoriteCategories: CategoryDTO[]): number {
  let score = 0;

  for (const favoriteCategory of favoriteCategories) {
    if (product.id && favoriteCategory.id) {
      const productCategory = productCategoryRepository.getByProductIdAndCategoryId(product.id, favoriteCategory.id);

      if (product.description.toLowerCase().includes(favoriteCategory.name.toLowerCase())) {
        score += 2;
      }

      // if (product.price >= favoriteCategory.minPrice && product.price <= favoriteCategory.maxPrice) {
      //   score += 1;
      // }
    }
  }

  return score;
}


async function getRecommendationsByProductIdAndUserId(productId: number, userId: number) {
  try {
    const reviews = await reviewRepository.filterByParameter("productId", productId);

    const similarityScores: { [key: number]: { [key: number]: number } } = {};

    for (let i = 0; i < reviews.length; i++) {
      for (let j = i + 1; j < reviews.length; j++) {
        const review1 = reviews[i];
        const review2 = reviews[j];
        const similarity = calculateSimilarity(review1.rating, review2.rating);

        if (!similarityScores[review1.userId]) {
          similarityScores[review1.userId] = {};
        }

        if (!similarityScores[review2.userId]) {
          similarityScores[review2.userId] = {};
        }

        similarityScores[review1.userId][review2.userId] = similarity;
        similarityScores[review2.userId][review1.userId] = similarity;
      }
    }

    const currentReview = await reviewRepository.getByUserIdAndProductId(userId, productId);

    if (currentReview) {
      const currentUserId = currentReview.userId;
      const similarUsers: { userId: number; similarity: number }[] = [];

      for (const userIdStr of Object.keys(similarityScores[currentUserId])) {
        const userId = parseInt(userIdStr);

        if (userId !== currentUserId) {
          similarUsers.push({userId, similarity: similarityScores[currentUserId][userId]});
        }
      }

      similarUsers.sort((a, b) => b.similarity - a.similarity);

      const contentBasedRecommendations = [];

      const favoriteCategories = await orderService.getFavoriteCategories(userId);

      for (const user of similarUsers) {
        const userReviews = await reviewRepository.filterByParameter("userId", user.userId);

        for (const userReview of userReviews) {
          if (userReview.userId !== currentUserId) {
            const productReviews = await reviewRepository.filterByParameter("productId", userReview.productId);
            const reviewedProductIds = new Set(productReviews.map((r) => r.productId));
            const isReviewedByCurrentUser = reviewedProductIds.has(productId);

            if (!isReviewedByCurrentUser) {
              const product = await productRepository.getById(userReview.productId);
              if (product) {
                const contentBasedScore = getContentBasedScore(product, favoriteCategories);
                contentBasedRecommendations.push({product, score: contentBasedScore});
              }
            }
          }
        }
      }

      return ;
    }
  } catch (err) {
    console.error(err);
    return null;
  }
}

function calculateSimilarity(rating1: number, rating2: number): number {
  const numerator = rating1 * rating2;
  const denominator = Math.sqrt(Math.pow(rating1, 2) + Math.pow(rating2, 2));
  return numerator / denominator;
}

export default { getRecommendationsByProductIdAndUserId };

import { Router } from "express";
import reviewController from "../controllers/reviewController";

const router = Router();

router.get('/', reviewController.getAllReviews);
router.get('/:id', reviewController.getReviewById);
router.put('/:id', reviewController.updateReview);
router.post('/', reviewController.createReview);
router.delete('/:id', reviewController.deleteReview);
router.post('/:filterType/:filterValue', reviewController.getReviewsByFilter);
router.get('/product/:productId/user/:userId', reviewController.getReviewsByProductIdAndUserId);
router.get('/product/:productId/rating/:rating', reviewController.getReviewsByProductIdAndRating);
router.delete('/product/:productId', reviewController.deleteReviewByProductId);
router.get('/product/:id/average-rating', reviewController.getAverageRatingForProduct);

export default router;
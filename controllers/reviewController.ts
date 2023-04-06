import { ReviewRepositoryImpl } from '../repositories/reviewRepositoryImpl';
import ReviewDTO from "../dtos/reviewDTO";
import { Request, Response } from "express";

const reviewRepository = new ReviewRepositoryImpl();

class reviewController {
  public getAllReviews = async (req: Request, res: Response) => {
    try {
      const reviews = await reviewRepository.getAll();

      if (!reviews) {
        return res.status(404).json({ message: 'Reviews not found' });
      }

      res.status(200).json(reviews);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error getting reviews.' });
    }
  };

  public getReviewById = async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);

      const review = await reviewRepository.getById(id);

      if (!review) {
        return res.status(404).json({ message: 'Review not found' });
      }

      res.status(200).json(review);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error getting review by ID.' });
    }
  };

  public getReviewsByFilter = async (req: Request, res: Response) => {  // user_id, product_id
    const { filterType, filterValue } = req.params;

    try {
      const reviews = await reviewRepository.filterByParameter(filterType, filterValue);

      if (!reviews) {
        return res.status(404).json({message: `Reviews not found by ${filterType}`});
      }

      res.status(200).json(reviews);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: `Error getting reviews by ${filterType}` });
    }
  };

  public getReviewsByProductIdAndUserId = async (req: Request, res: Response) => {
    try {
      const productId = parseInt(req.params.productId);
      const userId = parseInt(req.params.userId);

      const reviews = await reviewRepository.getByUserIdAndProductId(productId, userId);

      if (!reviews) {
        return res.status(404).json({message: 'Reviews not found by product ID and user ID'});
      }

      res.status(200).json(reviews);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error getting reviews by product ID and user ID.' });
    }
  };

  public getReviewsByProductIdAndRating = async (req: Request, res: Response) => {
    try {
      const productId = parseInt(req.params.productId);
      const rating = parseInt(req.params.rating);

      const reviews = await reviewRepository.getByProductIdAndRating(productId, rating);

      if (!reviews) {
        return res.status(404).json({message: 'Reviews not found by product ID and rating'});
      }

      res.status(200).json(reviews);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error getting reviews by product ID and rating.' });
    }
  };

  public updateReview = async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const { rating, comment } = req.body;

      const review = await reviewRepository.getById(id);

      if (!review) {
        return res.status(404).json({message: 'Review not found.'});
      }

      const newReview = new ReviewDTO(review.id, review.productId, review.userId, rating || review.rating, comment || review.comment);

      await reviewRepository.update(newReview);

      res.status(200).send(`Review modified with ID: ${id}`);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error updating review.' });
    }
  };

  public createReview = async (req: Request, res: Response) => {
    try {
      const { productId, userId, rating, comment } = req.body;

      const existingReview = await reviewRepository.getByUserIdAndProductId(userId, productId);

      if (existingReview) {
        res.status(400).send(`Review with this user ID and product ID already exists.`);
        return;
      }

      const review = new ReviewDTO(null, productId, userId, rating, comment);
      await reviewRepository.create(review);

      res.status(201).send(`Review was added`);
    } catch (err) {
      console.error(err);
      res.status(500).send('Error creating review');
    }
  };

  public deleteReview  = async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);

      const review = await reviewRepository.getById(id);

      if (!review) {
        return res.status(404).json({ message: 'Review not found.' });
      }

      await reviewRepository.delete(id);

      res.status(200).send(`Review deleted with ID: ${id}`);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error deleting review.' });
    }
  };

  public deleteReviewByProductId = async (req: Request, res: Response) => {
    try {
      const productId = parseInt(req.params.productId);

      const review = await reviewRepository.filterByParameter('productId', productId);

      if (!review) {
        return res.status(404).json({ message: 'Review not found.' });
      }

      await reviewRepository.deleteByProductId(productId);

      res.status(200).send(`Review deleted with product ID: ${productId}`);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error deleting review by product ID.' });
    }
  };

  public getAverageRatingForProduct = async (req: Request, res: Response) => {
    try {
      const productId = parseInt(req.params.id);

      const existingReviews = await reviewRepository.filterByParameter('productId', productId);

      if (!existingReviews) {
        return res.status(404).json({ message: 'Review not found' });
      }

      const averageRating = await reviewRepository.getAverageRatingByProductId(productId);

      res.status(200).json(averageRating);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error getting review by ID.' });
    }
  };
}

export default new reviewController();
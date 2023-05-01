import { CartRepositoryImpl } from "../repositories/cartRepositoryImpl";
import {Request, Response} from "express";
import CartDTO from "../dtos/cartDTO";

const cartRepository = new CartRepositoryImpl();

class CartController {
  public createCart = async (req: Request, res: Response) => {
    try {
      const { userId } = req.body;

      const existingCartItem = await cartRepository.getByUserId(userId);

      if (existingCartItem) {
        return res.status(200).send(`Cart for this user ${userId} already exists.`);
      } else {
        const newCart = new CartDTO(null, userId);

        await cartRepository.create(newCart);
      }

      res.status(201).send('Cart item created successfully');
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error creating cart item.' });
    }
  };

  public getCartByUserId = async (req: Request, res: Response) => {
    try {
      const userId = parseInt(req.params.userId);
      console.log('get cart')
      console.log(userId)

      const cart = await cartRepository.getByUserId(userId);

      if (!cart) {
        return res.status(404).json({message: 'Cart not found by user_id'});
      }

      res.status(200).json(cart);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error getting cart by user_id.' });
    }
  }
}
export default new CartController();
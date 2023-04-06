import CartItemDTO from '../dtos/cartItemDTO';
import { CartItemRepositoryImpl } from '../repositories/cartItemRepositoryImpl';
import {Request, Response} from "express";

const cartItemRepository = new CartItemRepositoryImpl();

class CartItemController {
  public createCartItem = async (req: Request, res: Response) => {
    try {
      const { productId, quantity, cartId } = req.body;
      const existingCartItem = await cartItemRepository.getByProductIdAndCartId(productId, cartId);

      if (existingCartItem) {
        existingCartItem.quantity += quantity;

        await cartItemRepository.update(existingCartItem);
      } else {
        const newCartItem = new CartItemDTO(null, productId, quantity, cartId);

        await cartItemRepository.create(newCartItem);
      }

      res.status(201).send('Cart item created successfully');
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error creating cart item.' });
    }
  };

  public getAllCartItems = async (req: Request, res: Response) => {
    try {
      const cartItems = await cartItemRepository.getAll();

      res.status(200).json(cartItems);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error getting all cart items.' });
    }
  };

  public deleteCartItem = async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const cartItem = await cartItemRepository.getById(id);

      if (!cartItem) {
        return res.status(404).json({ message: 'Cart item not found.' });
      }

      await cartItemRepository.delete(id);

      res.status(200).send('Cart item deleted successfully');
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error deleting cart item.' });
    }
  };

  public getCartItemById = async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);

      const cartItem = await cartItemRepository.getById(id);

      if (!cartItem) {
        return res.status(404).json({message: 'Cart item not found'});
      }

      res.status(200).json(cartItem);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error getting cart item by ID.' });
    }
  };

  public updateCartItem = async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const { productId, quantity, cartId } = req.body;

      const cartItem = await cartItemRepository.getById(id);

      if (!cartItem) {
        return res.status(404).json({message: 'Cart item not found.'});
      }

      const newCartItem = new CartItemDTO(cartItem.id, productId || cartItem.productId, quantity || cartItem.quantity, cartId || cartItem.cartId);

      await cartItemRepository.update(newCartItem);

      res.status(200).send('Cart item updated successfully');

    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error updating cart item.' });
    }
  };

  public getAllByCartId = async (req: Request, res: Response) => {
    try {
      const cartId = parseInt(req.params.cartId);

      const cartItems = await cartItemRepository.getAllByCartId(cartId);

      res.status(200).json(cartItems);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error getting cart items by cart ID.' });
    }
  };

  public getItemCount = async (req: Request, res: Response) => {
    try {
      const cartId = parseInt(req.params.cartId);

      const count = await cartItemRepository.getItemCount(cartId);

      res.status(200).json(count);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error getting cart items count.' });
    }
  };
}

export default new CartItemController();

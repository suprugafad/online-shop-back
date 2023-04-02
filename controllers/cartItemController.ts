import CartItemDTO from '../dtos/cartItemDTO';
import { CartItemRepositoryImpl } from '../repositories/cartItemRepositoryImpl';

const cartItemRepository = new CartItemRepositoryImpl();

class CartItemController {
  public create = async (req: any, res: any) => {
    try {
      const cartItem: CartItemDTO = req.body;
      await cartItemRepository.create(cartItem);
      res.status(201).send('Cart item created successfully');
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error creating cart item.' });
    }
  };

  public getAll = async (req: any, res: any) => {
    try {
      const cartItems: CartItemDTO[] = await cartItemRepository.getAll();
      res.status(200).json(cartItems);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error getting all cart items.' });
    }
  };

  public delete = async (req: any, res: any) => {
    try {
      const id: number = parseInt(req.params.id);
      await cartItemRepository.delete(id);
      res.status(200).send('Cart item deleted successfully');
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error deleting cart item.' });
    }
  };

  public getById = async (req: any, res: any) => {
    try {
      const id: number = parseInt(req.params.id);
      const cartItem: CartItemDTO|null = await cartItemRepository.getById(id);
      if (cartItem) {
        res.status(200).json(cartItem);
      } else {
        res.status(404).send('Cart item not found');
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error getting cart item by ID.' });
    }
  };

  public update = async (req: any, res: any) => {
    try {
      const cartItem: CartItemDTO = req.body;
      await cartItemRepository.update(cartItem);
      res.status(200).send('Cart item updated successfully');
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error updating cart item.' });
    }
  };

  public getAllByCartId = async (req: any, res: any) => {
    try {
      const cartId: number = parseInt(req.params.cartId);
      const cartItems: CartItemDTO[] = await cartItemRepository.getAllByCartId(cartId);
      res.status(200).json(cartItems);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error getting cart items by cart ID.' });
    }
  };

  public getItemCount = async (req: any, res: any) => {
    try {
      const cartId: number = parseInt(req.params.cartId);
      const count: number = await cartItemRepository.getItemCount(cartId);
      res.status(200).json(count);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error getting cart items count.' });
    }
  };
}

export default new CartItemController();

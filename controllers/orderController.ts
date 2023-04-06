import { OrderRepositoryImpl } from '../repositories/orderRepositoryImpl';
import OrderDTO from "../dtos/orderDTO";
import { Request, Response } from "express";

const orderRepository = new OrderRepositoryImpl();

class orderController {
  public getOrders = async (req: Request, res: Response) => {
    try {
      const orders = await orderRepository.getAll();

      if (!orders) {
        return res.status(404).json({message: 'Orders not found'});
      }

      res.status(200).json(orders);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error getting orders.' });
    }
  };

  public getOrderById = async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);

      const order = await orderRepository.getById(id);

      if (!order) {
        return res.status(404).json({message: 'Order not found'});
      }

      res.status(200).json(order);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error getting order by ID.' });
    }
  };

  public getOrdersByFilter = async (req: Request, res: Response) => {
    const { filterType, filterValue } = req.params;

    try {
      const order = await orderRepository.filterByParameter(filterType, filterValue);

      if (!order) {
        return res.status(404).json({message: `Orders not found by ${filterType}`});
      }

      res.status(200).json(order);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: `Error getting orders by ${filterType}` });
    }
  };

  public updateOrder = async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const { totalPrice, comment, status, addressId } = req.body;

      const order = await orderRepository.getById(id);

      if (!order) {
        return res.status(404).json({message: 'Order not found.'});
      }

      const newProduct = new OrderDTO(order.id, order.products, order.userId, status || order.status, comment || order.comment,totalPrice || order.totalPrice,  addressId || order.addressId);

      await orderRepository.update(newProduct);

      res.status(200).send(`Order modified with ID: ${id}`);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error updating order.' });
    }
  };

  public createOrder = async (req: Request, res: Response) => {
    try {
      const { products, userId, status, comment, totalPrice, addressId } = req.body;

      const order = new OrderDTO(null, products, userId, status, comment, totalPrice, addressId);
      await orderRepository.create(order);

      res.status(201).send(`Order was added`);
    } catch (err) {
      console.error(err);
      res.status(500).send('Error creating order');
    }
  };

  public deleteOrder  = async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);

      const order = await orderRepository.getById(id);

      if (!order) {
        return res.status(404).json({ message: 'Order not found.' });
      }

      await orderRepository.delete(id);

      res.status(200).send(`Order deleted with ID: ${id}`);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error deleting order.' });
    }
  };
}

export default new orderController();
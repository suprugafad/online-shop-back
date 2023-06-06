import { OrderRepositoryImpl } from '../repositories/orderRepositoryImpl';
import OrderDTO from "../dtos/orderDTO";
import { Request, Response } from "express";
import {OrderStatus} from "../enums/orderStatusEnum";

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

  public getOrdersFullInfo = async (req: Request, res: Response) => {
    try {
      const orders = await orderRepository.getAllFullInfo();

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

  public getOrdersByProductId = async (req: Request, res: Response) => {
    const productId = parseInt(req.params.productId);

    try {
      const order = await orderRepository.filterByProductId(productId);

      if (!order) {
        return res.status(404).json({message: `Orders not found by product ID`});
      }

      res.status(200).json(order);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: `Error getting orders by product ID` });
    }
  };

  public getMonthlySales = async (req: Request, res: Response) => {
    try {
      const sales = await orderRepository.getMonthlySales();

      if (!sales) {
        return res.status(404).json({message: 'Sales not found'});
      }

      res.status(200).json(sales);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error getting sales.' });
    }
  }

  public getAmountOfDelivered = async (req: Request, res: Response) => {
    try {
      const amount = await orderRepository.getAmountOfDelivered();

      res.status(200).json(amount);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error getting sales.' });
    }
  }

  public isProductInOrdersByUserId = async (req: Request, res: Response) => {
    try {
      const userId = parseInt(req.params.userId);
      const productId = parseInt(req.params.productId);

      const orders = await orderRepository.filterByParameter('user_id', userId);

      for (const order of orders) {
        if (order.status.toUpperCase() === 'DELIVERED') {
          for (const product of order.products) {
            if (productId === product.id) {
              return res.status(200).json({ isExist: true });
            }
          }
        }
      }

      return res.status(200).json({isExist: false});

    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error getting orders of user.' });
    }
  }

  public updateOrder = async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const { totalPrice, comment, status, addressId } = req.body;

      const order = await orderRepository.getById(id);

      if (!order) {
        return res.status(404).json({message: 'Order not found.'});
      }

      const newProduct = new OrderDTO(order.id, order.products, order.userId, status.toLowerCase() || order.status, comment || order.comment,totalPrice || order.totalPrice,  addressId || order.addressId, order.createdAt);

      await orderRepository.update(newProduct);

      res.status(200).send(`Order modified with ID: ${id}`);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error updating order.' });
    }
  };

  public createOrder = async (req: Request, res: Response) => {
    try {
      const { products, userId, comment, totalPrice, addressId } = req.body;

      const order = new OrderDTO(null, products, userId, OrderStatus.PENDING, comment, totalPrice, addressId, null);
      const orderId = await orderRepository.create(order);

      res.status(201).json({ message:`Order was added`, orderId });
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
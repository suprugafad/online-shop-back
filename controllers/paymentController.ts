import { PaymentRepositoryImpl } from '../repositories/paymentRepositoryImpl';
import PaymentDTO from "../dtos/paymentDTO";
import {Request, Response} from "express";

const paymentRepository = new PaymentRepositoryImpl();

class paymentController {
  public getPayments = async (req: Request, res: Response) => {
    try {
      const payments = await paymentRepository.getAll();

      if (!payments) {
        return res.status(404).json({message: 'Payments not found'});
      }

      res.status(200).json(payments);
    } catch (err) {
      console.error(err);
      res.status(500).json({message: 'Error getting payments.'});
    }
  };

  public getPaymentById = async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);

      const payment = await paymentRepository.getById(id);

      if (!payment) {
        return res.status(404).json({message: 'Payment not found'});
      }

      res.status(200).json(payment);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error getting payment by ID.' });
    }
  };

  public getPaymentByMethod = async (req: Request, res: Response) => {
    try {
      const method = req.params.method;

      const payment = await paymentRepository.getByMethod(method);

      if (!payment) {
        return res.status(404).json({message: 'Payment by method not found'});
      }

      res.status(200).json(payment);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error getting payment by method.' });
    }
  };

  public getPaymentByOrderId = async (req: Request, res: Response) => {
    try {
      const orderId = parseInt(req.params.orderId);

      const payment = await paymentRepository.getByOrderId(orderId);

      if (!payment) {
        return res.status(404).json({message: 'Payment by order ID not found'});
      }

      res.status(200).json(payment);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error getting payment by order ID.' });
    }
  };

  public getPaymentByStatus = async (req: Request, res: Response) => {
    try {
      const status = req.params.status;

      const payment = await paymentRepository.getByStatus(status);

      if (!payment) {
        return res.status(404).json({message: 'Payment by status not found'});
      }

      res.status(200).json(payment);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error getting payment by status.' });
    }
  };

  public getPaymentByTransactionId = async (req: Request, res: Response) => {
    try {
      const transactionId = req.params.transactionId;

      const payment = await paymentRepository.getByTransactionId(transactionId);

      if (!payment) {
        return res.status(404).json({message: 'Payment by transaction ID not found'});
      }

      res.status(200).json(payment);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error getting payment by transaction ID.' });
    }
  };

  public getPaymentByUserId = async (req: Request, res: Response) => {
    try {
      const userId = parseInt(req.params.userId);

      const payment = await paymentRepository.getByUserId(userId);

      if (!payment) {
        return res.status(404).json({message: 'Payment by user ID not found'});
      }

      res.status(200).json(payment);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error getting payment by user ID.' });
    }
  };

  public getRevenueByMonth = async (req: Request, res: Response) => {
    try {
      const year = parseInt(req.params.year);
      const month = parseInt(req.params.month);

      const revenue = await paymentRepository.getRevenueByMonth(year, month);

      if (!revenue) {
        return res.status(404).json({message: 'Revenue by month not found'});
      }

      res.status(200).json(revenue);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error getting revenue by month.' });
    }
  };

  public getTotalAmount = async (req: Request, res: Response) => {
    try {
      const totalAmount = await paymentRepository.getTotalAmount();

      res.status(200).json({ totalAmount });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error getting total amount.' });
    }
  };

  public updatePayment = async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const { userId, orderId, transactionId, amount, transactionDate, method, status } = req.body;

      const payment = await paymentRepository.getById(id);

      if (!payment) {
        return res.status(404).json({message: 'Product not found.'});
      }

      const newPayment = new PaymentDTO(payment.id, userId || payment.userId, orderId || payment.orderId, transactionId || payment.transactionId, amount || payment.amount, transactionDate || payment.transactionDate, method || payment.method, status || payment.status);

      await paymentRepository.update(newPayment);

      res.status(200).send(`Payment modified with ID: ${id}`);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error updating payment.' });
    }
  };

  public createPayment = async (req: Request, res: Response) => {
    try {
      const { userId, orderId, transactionId, amount, transactionDate, method, status } = req.body;

      const existingPayment = await paymentRepository.getByTransactionId(transactionId);

      if (existingPayment) {
        return res.status(400).send(`Payment with transaction ID already exists.`);
      }

      const payment = new PaymentDTO(null, userId, orderId, transactionId, amount, transactionDate, method, status);
      await paymentRepository.create(payment);

      res.status(201).send(`Payment was added`);
    } catch (err) {
      console.error(err);
      res.status(500).send('Error creating payment');
    }
  };

  public deletePayment = async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);

      const payment = await paymentRepository.getById(id);

      if (!payment) {
        return res.status(404).json({ message: 'Payment not found.' });
      }

      await paymentRepository.delete(id);

      res.status(200).send(`Payment deleted with ID: ${id}`);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error deleting payment.' });
    }
  };
}

export default new paymentController();
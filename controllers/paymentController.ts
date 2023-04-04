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

  // skoro dobavlu eshe
}

export default new paymentController();
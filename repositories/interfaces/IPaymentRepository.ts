import { IRepository } from "./IRepository";
import PaymentDTO from "../../dtos/paymentDTO";

export interface IPaymentRepository extends IRepository<PaymentDTO> {
  getByUserId(userId: number): Promise<PaymentDTO[]>;

  getByTransactionId(transactionId: string): Promise<PaymentDTO | null>;

  getByOrderId(orderId: number): Promise<PaymentDTO[]>;

  getByStatus(status: string): Promise<PaymentDTO[]>;

  getByMethod(method: string): Promise<PaymentDTO[]>;

  getTotalAmount(): Promise<number>;

  getRevenueByMonth(year: number, month: number): Promise<number>;
}
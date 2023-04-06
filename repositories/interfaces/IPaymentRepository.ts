import { IRepository } from "./IRepository";
import PaymentDTO from "../../dtos/paymentDTO";

export interface IPaymentRepository extends IRepository<PaymentDTO> {

  filterByParameter(type: string, value: string | number): Promise<PaymentDTO[]>;

  getTotalAmount(): Promise<number>;

  getRevenueByMonth(year: number, month: number): Promise<number>;
}
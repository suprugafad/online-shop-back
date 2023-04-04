import { PaymentStatus } from '../enums/paymentStatusEnum';
import { PaymentMethod } from '../enums/paymentMethodEnum';

class PaymentDTO {
  private readonly _id: number | null;
  private _userId: number;
  private _orderId: number;
  private _transactionId: string;
  private _amount: number;
  private _transactionDate: Date;
  private _method: PaymentMethod;
  private _status: PaymentStatus;

  constructor(id: number | null, userId: number, orderId: number, transactionId: string, amount: number, transactionDate: Date, method: PaymentMethod, status: PaymentStatus) {
    this._id = id;
    this._userId = userId;
    this._orderId = orderId;
    this._transactionId = transactionId;
    this._amount = amount;
    this._transactionDate = transactionDate;
    this._method = method;
    this._status = status
  }

  get id(): number | null {
    return this._id;
  }

  get userId(): number {
    return this._userId;
  }

  set userId(userId: number) {
    this._userId = userId;
  }

  get orderId(): number {
    return this._orderId;
  }

  set orderId(orderId: number) {
    this._orderId = orderId;
  }

  get transactionId(): string {
    return this._transactionId;
  }

  set transactionId(transactionId: string) {
    this._transactionId = transactionId;
  }

  get amount(): number {
    return this._amount;
  }

  set amount(amount: number) {
    this._amount = amount;
  }

  get transactionDate(): Date {
    return this._transactionDate;
  }

  set transactionDate(transactionDate: Date) {
    this._transactionDate = transactionDate;
  }

  get method(): PaymentMethod {
    return this._method;
  }

  set method(method: PaymentMethod) {
    this._method = method;
  }

  get status(): PaymentStatus {
    return this._status;
  }

  set status(status: PaymentStatus) {
    this._status = status;
  }
}

export default PaymentDTO;
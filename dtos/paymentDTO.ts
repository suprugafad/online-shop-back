import { PaymentStatus } from '../enums/paymentStatusEnum';
import { PaymentMethod } from '../enums/paymentMethodEnum';

class PaymentDTO {
  private readonly _id: number | null;
  private _userId: number;
  private _orderId: number;
  private _transactionId: string | null;
  private _amount: number;
  private _transactionDate: Date | null;
  private _method: PaymentMethod;
  private _status: PaymentStatus;

  constructor(id: number | null, userId: number, orderId: number, transactionId: string | null, amount: number, transactionDate: Date | null, method: PaymentMethod, status: PaymentStatus) {
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

  get transactionId(): string | null {
    return this._transactionId;
  }

  set transactionId(transactionId: string | null) {
    this._transactionId = transactionId;
  }

  get amount(): number {
    return this._amount;
  }

  set amount(amount: number) {
    this._amount = amount;
  }

  get transactionDate(): Date | null {
    return this._transactionDate;
  }

  set transactionDate(transactionDate: Date | null) {
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
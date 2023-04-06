import ProductDTO from '../dtos/productDTO';
type DBProduct = ProductDTO;
type DBProducts = DBProduct[];
import { OrderStatus } from "../enums/orderStatusEnum";

class OrderDTO {
  private readonly _id: number | null;
  private _products: DBProducts;
  private _userId: number;
  private _status: OrderStatus;
  private _comment: string | null;
  private _totalPrice: number;
  private _addressId: number;

  constructor(id: number | null, products: DBProducts, userId: number, status: OrderStatus, comment: string | null, totalPrice: number, addressID: number) {
    this._id = id;
    this._products = products;
    this._userId = userId;
    this._status = status;
    this._comment = comment;
    this._totalPrice = totalPrice;
    this._addressId = addressID;
  }

  get id(): number | null {
    return this._id;
  }

  get products(): DBProducts {
    return this._products;
  }

  set products(products: DBProducts) {
    this._products = products;
  }

  get userId(): number {
    return this._userId;
  }

  set userId(userId: number) {
    this._userId = userId;
  }

  get status(): OrderStatus {
    return this._status;
  }

  set status(status: OrderStatus) {
    this._status = status;
  }

  get comment(): string | null {
    return this._comment;
  }

  set comment(comment: string | null) {
    this._comment = comment;
  }

  get totalPrice(): number {
    return this._totalPrice;
  }

  set totalPrice(totalPrice: number) {
    this._totalPrice = totalPrice;
  }

  get addressId(): number {
    return this._totalPrice;
  }

  set addressId(addressId: number) {
    this._addressId = addressId;
  }
}

export default OrderDTO;
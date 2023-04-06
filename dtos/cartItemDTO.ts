class CartItemDTO {
  private readonly _id: number | null;
  private _productId: number;
  private _quantity: number;
  private _cartId: number;

  constructor(id: number | null, productId: number, quantity: number, cartId: number) {
    this._id = id;
    this._productId = productId;
    this._quantity = quantity;
    this._cartId = cartId;
  }

  get id(): number | null {
    return this._id;
  }

  get productId(): number {
    return this._productId;
  }

  set productId(productId: number) {
    this._productId = productId;
  }

  get quantity(): number {
    return this._quantity;
  }

  set quantity(quantity: number) {
    this._quantity = quantity;
  }

  get cartId(): number {
    return this._cartId;
  }

  set cartId(cartId: number) {
    this._cartId = cartId;
  }
}

export default CartItemDTO;

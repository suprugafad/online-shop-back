class FavoriteItemDTO {
  private readonly _id: number | null;
  private _productId: number;
  private _userId: number;

  constructor(id: number | null, productId: number, userId: number) {
    this._id = id;
    this._productId = productId;
    this._userId = userId;
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

  get userId(): number {
    return this._userId;
  }

  set userId(userId: number) {
    this._userId = userId;
  }
}

export default FavoriteItemDTO;

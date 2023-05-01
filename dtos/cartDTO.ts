class CartDTO {
  private readonly _id: number | null;
  private _userId: number;

  constructor(id: number | null, userId: number) {
    this._id = id;
    this._userId = userId;
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
}

export default CartDTO;

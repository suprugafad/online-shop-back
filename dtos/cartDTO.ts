class CartDTO {
  private readonly _id: number | null;
  private _userId: number;
  private readonly _createdAt: Date;

  constructor(id: number | null, userId: number, createdAt: Date) {
    this._id = id;
    this._userId = userId;
    this._createdAt = createdAt;
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

  get createdAt(): Date {
    return this._createdAt;
  }
}

export default CartDTO;

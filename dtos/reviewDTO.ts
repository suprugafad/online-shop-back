class ReviewDTO {
  private readonly _id: number | null;
  private _productId: number;
  private _userId: number;
  private _rating: number;
  private _comment: string | null;
  private _createdAt: Date | null;

  constructor(id: number | null, productId: number, userId: number, rating: number, comment: string | null, createdAt: Date | null) {
    this._id = id;
    this._productId = productId;
    this._userId = userId;
    this._rating = rating;
    this._comment = comment;
    this._createdAt = createdAt;
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

  get rating(): number {
    return this._rating;
  }

  set rating(rating: number) {
    this._rating = rating;
  }

  get comment(): string | null {
    return this._comment;
  }

  set comment(comment: string | null) {
    this._comment = comment;
  }

  get createdAt(): Date | null {
    return this._createdAt;
  }

  set createdAt(createdAt: Date | null) {
    this._createdAt = createdAt;
  }
}

export default ReviewDTO;
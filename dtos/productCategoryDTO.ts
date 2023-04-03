class CategoryDTO {
  private readonly _id: number | null;
  private _categoryId: number;
  private _productId: number;

  constructor(id: number | null, productId: number, categoryId: number) {
    this._id = id;
    this._productId = productId
    this._categoryId = categoryId;
  }

  get id(): number | null {
    return this._id;
  }

  get categoryId(): number {
    return this._categoryId;
  }

  set categoryId(categoryId: number) {
    this._categoryId = categoryId;
  }

  get productId(): number {
    return this._productId;
  }

  set productId(productId: number) {
    this._productId = productId;
  }
}

export default CategoryDTO;
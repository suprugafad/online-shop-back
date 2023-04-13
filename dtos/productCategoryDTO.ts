class ProductCategoryDTO {
  private _categoryId: number;
  private _productId: number;

  constructor(productId: number, categoryId: number) {
    this._productId = productId
    this._categoryId = categoryId;
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

export default ProductCategoryDTO;
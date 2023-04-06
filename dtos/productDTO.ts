class ProductDTO {
  private readonly _id: number | null;
  private _title: string;
  private _description: string;
  private _price: number;
  private _image: string;

  constructor(id: number | null, title: string, description: string, price: number, image: string) {
    this._id = id;
    this._title = title;
    this._description = description;
    this._price = price;
    this._image = image;
  }

  get id(): number | null {
    return this._id;
  }

  get title(): string {
    return this._title;
  }

  set title(title: string) {
    this._title = title;
  }

  get description(): string {
    return this._description;
  }

  set description(description: string) {
    this._description = description;
  }

  get price(): number {
    return this._price;
  }

  set price(price: number) {
    this._price = price;
  }

  get image(): string {
    return this._image;
  }

  set image(image: string) {
    this._image = image;
  }
}

export default ProductDTO;
class ProductDTO {
  private readonly _id: number | null;
  private _title: string;
  private _manufacturer: string;
  private _description: string;
  private _price: number;
  private _amount: number
  private _mainImage: string | null;
  private _additionalImages: string[] | null;

  constructor(id: number | null, title: string, manufacturer: string, description: string, price: number, amount: number, mainImage: string | null, additionalImages: string[] | null) {
    this._id = id;
    this._title = title;
    this._manufacturer = manufacturer;
    this._description = description;
    this._price = price;
    this._amount = amount;
    this._mainImage = mainImage;
    this._additionalImages = additionalImages;
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

  get manufacturer(): string {
    return this._manufacturer;
  }

  set manufacturer(manufacturer: string) {
    this._manufacturer = manufacturer;
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

  get amount(): number {
    return this._amount;
  }

  set amount(amount: number) {
    this._amount = amount;
  }

  get mainImage(): string | null {
    return this._mainImage;
  }

  set mainImage(mainImage: string | null) {
    this._mainImage = mainImage;
  }

  get additionalImages(): string[] | null {
    return this._additionalImages;
  }

  set additionalImages(additionalImages: string[] | null) {
    this._additionalImages = additionalImages;
  }
}

export default ProductDTO;
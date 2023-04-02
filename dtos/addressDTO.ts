class AddressDTO {
  private readonly _id: number | null;
  private _country: string;
  private _city: string;
  private _street: string;
  private _house: string;
  private _apartment: string;

  constructor(id: number | null, country: string, city: string, street: string, house: string, apartment: string) {
    this._id = id;
    this._country = country;
    this._city = city;
    this._street = street;
    this._house = house;
    this._apartment = apartment;
  }

  get id(): number | null {
    return this._id;
  }

  get country(): string {
    return this._country;
  }

  set country(country: string) {
    this._country = country;
  }

  get city(): string {
    return this._city;
  }

  set city(city: string) {
    this._city = city;
  }

  get street(): string {
    return this._street;
  }

  set street(street: string) {
    this._street = street;
  }

  get house(): string {
    return this._house;
  }

  set house(house: string) {
    this._house = house;
  }

  get apartment(): string {
    return this._apartment;
  }

  set apartment(apartment: string) {
    this._apartment = apartment;
  }
}

export default AddressDTO;
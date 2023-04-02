class UserAddressDTO {
  private readonly _id: number | null;
  private _userId: number;
  private _addressId: number;

  constructor(id: number | null, userId: number, addressId: number) {
    this._id = id;
    this._userId = userId;
    this._addressId = addressId;
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

  get addressId(): number {
    return this._addressId;
  }

  set addressId(addressId: number) {
    this._addressId = addressId;
  }
}

export default UserAddressDTO;

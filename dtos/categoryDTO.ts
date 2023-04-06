class CategoryDTO {
  private readonly _id: number | null;
  private _name: string;

  constructor(id: number | null, name: string) {
    this._id = id;
    this._name = name;
  }

  get id(): number | null {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  set name(name: string) {
    this._name = name;
  }
}

export default CategoryDTO;
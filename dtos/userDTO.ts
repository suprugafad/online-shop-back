class UserDTO {
  private readonly _id: number | null;
  private _username: string;
  private _email: string;
  private _role: string;

  constructor(id: number | null, username: string, email: string, role: string) {
    this._id = id;
    this._username = username;
    this._email = email;
    this._role = role;
  }

  get id(): number | null {
    return this._id;
  }

  get username(): string {
    return this._username;
  }

  set username(username: string) {
    this._username = username;
  }

  get email(): string {
    return this._email;
  }

  set email(email: string) {
    this._email = email;
  }

  get role(): string {
    return this._role;
  }

  set role(role: string) {
    this._role = role;
  }
}

export default UserDTO;


import UserDTO from '../dtos/userDTO';
import {IRepository} from "./IRepository";

export interface IUserRepository extends IRepository<UserDTO>{

  getByIdWithPassword(id: number): Promise<{ password: any; userDTO: UserDTO } | null>;

  getUserByEmail(email: string): Promise<{ password: any; userDTO: UserDTO } | null>;

  updatePassword(id: number, newPassword: string): Promise<void>;
}
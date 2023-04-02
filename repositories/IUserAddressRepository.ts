import {IRepository} from "./IRepository";
import UserAddressDTO from "../dtos/userAddressDTO";

export interface IUserAddressRepository extends IRepository<UserAddressDTO>{

  getAddressesByUserId(userId: number): Promise<UserAddressDTO[] | null>;

  deleteByUserId(userId: number): Promise<void>;
}
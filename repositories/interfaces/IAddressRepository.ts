import {IRepository} from "./IRepository";
import AddressDTO from "../../dtos/addressDTO";

export interface IAddressRepository extends IRepository<AddressDTO>{

  filterByParameter(type: string, value: string | number): Promise<AddressDTO[]>;

  getByOrderId(orderId: number): Promise<AddressDTO | null>;
}
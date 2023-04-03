import {IRepository} from "./IRepository";
import AddressDTO from "../../dtos/addressDTO";

export interface IAddressRepository extends IRepository<AddressDTO>{

  getByCountry(country: string): Promise<AddressDTO[]>;

  getByCity(city: string): Promise<AddressDTO[]>;

  getByOrderId(orderId: number): Promise<AddressDTO | null>;
}
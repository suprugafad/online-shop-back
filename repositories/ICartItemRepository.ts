import {IRepository} from "./IRepository";
import CartItemDTO from "../dtos/cartItemDTO";

export interface ICartItemRepository extends IRepository<CartItemDTO>{
  getAllByCartId(cartId: number): Promise<CartItemDTO[]>;

  getItemCount(cartId: number): Promise<number>;
}
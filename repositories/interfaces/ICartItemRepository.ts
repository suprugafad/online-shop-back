import {IRepository} from "./IRepository";
import CartItemDTO from "../../dtos/cartItemDTO";
import cartItemDTO from "../../dtos/cartItemDTO";

export interface ICartItemRepository extends IRepository<CartItemDTO>{
  getAllByCartId(cartId: number): Promise<CartItemDTO[]>;

  getItemCount(cartId: number): Promise<number>;

  getByProductIdAndCartId(productId: number, cartId: number):Promise<cartItemDTO | null>
}
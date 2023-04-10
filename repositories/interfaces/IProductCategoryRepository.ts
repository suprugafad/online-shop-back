import {IRepository} from "./IRepository";
import ProductCategoryDTO from "../../dtos/productCategoryDTO";

export interface IProductCategoryRepository extends IRepository<ProductCategoryDTO>{

  filterByParameter(type: string, value: string | number): Promise<ProductCategoryDTO[]>;

  deleteByProductId(productId: number): Promise<void>;

  getByProductIdAndCategoryId(productId: number, categoryId: number): Promise<ProductCategoryDTO | null>
}
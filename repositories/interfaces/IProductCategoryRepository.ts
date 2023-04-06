import {IRepository} from "./IRepository";
import ProductCategoryDTO from "../../dtos/productCategoryDTO";

export interface IProductCategoryRepository extends IRepository<ProductCategoryDTO>{

  getProductsByCategoryId(categoryId: number): Promise<ProductCategoryDTO[] | null>;

  deleteByProductId(productId: number): Promise<void>;

  getByProductIdAndCategoryId(productId: number, categoryId: number): Promise<ProductCategoryDTO | null>
}
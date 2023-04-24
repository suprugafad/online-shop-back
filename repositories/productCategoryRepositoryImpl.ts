import { IProductCategoryRepository } from "./interfaces/IProductCategoryRepository";
import { query } from '../db';
import ProductCategoryDTO from '../dtos/productCategoryDTO';

export class ProductCategoryRepositoryImpl implements IProductCategoryRepository {
  async create(productCategory: ProductCategoryDTO): Promise<void> {
    const queryText = `INSERT INTO product_category (product_id, category_id) VALUES ($1, $2);`;
    const values = [productCategory.productId, productCategory.categoryId];

    try {
      await query(queryText, values);
    } catch (err) {
      throw new Error('Unable to create product_category');
    }
  };

  async getAll(): Promise<ProductCategoryDTO[]> {
    const queryText = `SELECT product_id, category_id FROM product_category ORDER BY id ASC;`;

    try {
      const result = await query(queryText);

      return result.rows.map(row => new ProductCategoryDTO(row.productId, row.categoryId));
    } catch (err) {
      throw new Error('Unable to get all product_categories');
    }
  };

  async delete(categoryId: number): Promise<void> {  //by category_id
    const queryText = 'DELETE FROM product_category WHERE category_id = $1';
    const values = [categoryId];

    try {
      await query(queryText, values);
    } catch (err) {
      throw new Error('Unable to delete product_category');
    }
  };

  async getById(productId: number): Promise<ProductCategoryDTO | null> { //by product_id (bcs of int)
    const queryText = `SELECT product_id, category_id name FROM product_category WHERE product_id = $1;`;
    const values = [productId];

    try {
      const result = await query(queryText, values);

      if (result.rows.length > 0) {
        const {productId, categoryId} = result.rows[0];

        return new ProductCategoryDTO(productId, categoryId);
      }
    } catch (err) {
      throw new Error('Unable to get product_category');
    }
    return null;
  };

  async getByProductIdAndCategoryId(productId: number, categoryId: number): Promise<ProductCategoryDTO | null> {
    const queryText = `SELECT product_id, category_id FROM product_category WHERE product_id = $1 AND category_id = $2;`;
    const values = [productId, categoryId];

    try {
      const result = await query(queryText, values);

      if (result.rows.length > 0) {
        const {productId, categoryId} = result.rows[0];

        return new ProductCategoryDTO(productId, categoryId);
      }
    } catch (err) {
      throw new Error('Unable to get product_category by product_id and category_id');
    }
    return null;
  };

  async filterByParameter(type: string, value: string | number): Promise<ProductCategoryDTO[]> { //product_id, category_id
    const queryText = `SELECT product_id, category_id FROM product_category WHERE ${type} = $1`;
    const values = [value];

    try {
      const result = await query(queryText, values);

      return result.rows.map(row => new ProductCategoryDTO(row.product_id, row.category_id));
    } catch (err) {
      throw new Error(`Unable to get products by ${type}`);
    }
  };

  async update(productCategory: ProductCategoryDTO): Promise<void> {
    const queryText = 'UPDATE product_category SET category_id = $1 WHERE product_id = $2';
    const values = [productCategory.categoryId, productCategory.productId];

    try {
      await query(queryText, values);
    } catch (err) {
      throw new Error('Unable to update product_category');
    }
  };

  async deleteByProductId(productId: number): Promise<void> {
    const queryText = `DELETE FROM product_category WHERE product_id = $1;`;
    const values = [productId];

    try {
      await query(queryText, values);
    } catch (err) {
      throw new Error('Unable to delete product_category for product ID');
    }
  };

  async deleteByProductIdAndCategoryId(productId: number, categoryId: number): Promise<void> {
    const queryText = `DELETE FROM product_category WHERE product_id = $1 AND category_id = $2;`;
    const values = [productId, categoryId];

    try {
      await query(queryText, values);
    } catch (err) {
      throw new Error('Unable to delete product_category for product ID');
    }
  }
}
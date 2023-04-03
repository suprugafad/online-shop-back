import { IProductCategoryRepository } from "./IProductCategoryRepository";
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

      return result.rows.map(row => new ProductCategoryDTO(row.id, row.productId, row.categoryId));
    } catch (err) {
      throw new Error('Unable to get all product_categories');
    }
  };

  async delete(id: number): Promise<void> {
    const queryText = 'DELETE FROM product_category WHERE id = $1';
    const values = [id];

    try {
      await query(queryText, values);
    } catch (err) {
      throw new Error('Unable to delete product_category');
    }
  };

  async getById(id: number): Promise<ProductCategoryDTO | null> {
    const queryText = `SELECT id, product_id, category_id name FROM product_category WHERE id = $1;`;
    const values = [id];

    try {
      const result = await query(queryText, values);

      if (result.rows.length > 0) {
        const {id, productId, categoryId} = result.rows[0];

        return new ProductCategoryDTO(id, productId, categoryId);
      }
    } catch (err) {
      throw new Error('Unable to get product_category');
    }
    return null;
  };

  async getByProductIdAndCategoryId(productId: number, categoryId: number): Promise<ProductCategoryDTO | null> {
    const queryText = `SELECT id, product_id, category_id name FROM product_category WHERE product_id = $1 AND category_id = $2;`;
    const values = [productId, categoryId];

    try {
      const result = await query(queryText, values);

      if (result.rows.length > 0) {
        const {id, productId, categoryId} = result.rows[0];

        return new ProductCategoryDTO(id, productId, categoryId);
      }
    } catch (err) {
      throw new Error('Unable to get product_category by product_id and category_id');
    }
    return null;
  }

  async getProductsByCategoryId(categoryId: number): Promise<ProductCategoryDTO[] | null> {
    const queryText = `SELECT id, product_id, category_id FROM product_category WHERE category_id = $1`;
    const values = [categoryId];

    try {
      const result = await query(queryText, values);

      if (result.rows.length > 0) {
        return result.rows.map(row => new ProductCategoryDTO(row.id, row.userId, row.addressId));
      }
    } catch (err) {
      throw new Error('Unable to get products by category id');
    }
    return null;
  };

  async update(productCategory: ProductCategoryDTO): Promise<void> {
    const queryText = 'UPDATE product_category SET product_id = $1, category_id = $2 WHERE id = $3';
    const values = [productCategory.productId, productCategory.categoryId, productCategory.id];

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
}

export default ProductCategoryRepositoryImpl;
import { query } from '../db';
import ProductDTO from '../dtos/productDTO';
import { IRepository } from "./interfaces/IRepository";

export class ProductRepositoryImpl implements IRepository<ProductDTO> {
  async create(product: ProductDTO): Promise<void> {
    const queryText = `INSERT INTO product (title, description, price, image) VALUES ($1, $2, $3, $4);`;
    const values = [product.title, product.description, product.price, product.image];

    try {
      await query(queryText, values);
    } catch (err) {
      throw new Error('Unable to create product');
    }
  };

  async getAll(): Promise<ProductDTO[]> {
    const queryText = `SELECT id, title, description, price, image FROM product ORDER BY id ASC;`;

    try {
      const result = await query(queryText);

      return result.rows.map(row => new ProductDTO(row.id, row.title, row.description, row.price, row.image));
    } catch (err) {
      throw new Error('Unable to get all products');
    }
  };

  async getById(id: number): Promise<ProductDTO | null> {
    const queryText = `SELECT id, title, description, price, image FROM product WHERE id = $1;`;
    const values = [id];

    try {
      const result = await query(queryText, values);

      if (result.rows.length > 0) {
        const {id, title, description, price, image} = result.rows[0];

        return new ProductDTO(id, title, description, price, image);
      }
    } catch (err) {
      throw new Error('Unable to get product');
    }
    return null;
  };

  async getByTitle(title: string): Promise<ProductDTO | null> {
    const queryText = `SELECT id, title, description, price, image FROM product WHERE title = $1;`;
    const values = [title];

    try {
      const result = await query(queryText, values);

      if (result.rows.length > 0) {
        const {id, title, description, price, image} = result.rows[0];

        return new ProductDTO(id, title, description, price, image);
      }
    } catch (err) {
      throw new Error('Unable to get product by title');
    }
    return null;
  };

  async update(product: ProductDTO): Promise<void> {
    const queryText = 'UPDATE product SET title = $1, description = $2, price = $3, image = $4 WHERE id = $5';
    const values = [product.title, product.description, product.price, product.image, product.id];

    try {
      await query(queryText, values);
    } catch (err) {
      throw new Error('Unable to update product');
    }
  }
  async delete(id: number): Promise<void> {
    const queryText = 'DELETE FROM product WHERE id = $1';
    const values = [id];

    try {
      await query(queryText, values);
    } catch (err) {
      throw new Error('Unable to delete product');
    }
  };
}

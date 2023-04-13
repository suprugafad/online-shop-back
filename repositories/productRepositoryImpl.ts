import { query } from '../db';
import ProductDTO from '../dtos/productDTO';
import { IRepository } from "./interfaces/IRepository";

export class ProductRepositoryImpl implements IRepository<ProductDTO> {
  async create(product: ProductDTO): Promise<void> {
    const queryText = `INSERT INTO product (title, description, price, amount, main_image, additional_images) VALUES ($1, $2, $3, $4, $5);`;
    const additionalImages = product.additionalImages ? product.additionalImages.join(',') : null;
    const values = [product.title, product.description, product.price, product.amount, product.mainImage, additionalImages];

    try {
      await query(queryText, values);
    } catch (err) {
      throw new Error('Unable to create product');
    }
  };

  async getAll(): Promise<ProductDTO[]> {
    const queryText = `SELECT id, title, description, price, amount, main_image, additional_images FROM product ORDER BY id ASC;`;

    try {
      const result = await query(queryText);
      let additionalImages: string[] | null = null;

      return result.rows.map(row => {
        if (row.additional_images) {
          additionalImages = row.additional_images.split(',');
        }

        return new ProductDTO(row.id, row.title, row.description, row.price, row.amount, row.main_image, additionalImages);
      });
    } catch (err) {
      throw new Error('Unable to get all products');
    }
  };

  async getById(id: number): Promise<ProductDTO | null> {
    const queryText = `SELECT id, title, description, price, amount, main_image, additional_images FROM product WHERE id = $1;`;
    const values = [id];

    try {
      const result = await query(queryText, values);

      if (result.rows.length > 0) {
        const {id, title, description, price, amount, main_image, additional_images} = result.rows[0];

        let additionalImagesArr: string[] | null = null;

        if (additional_images) {
          additionalImagesArr = additional_images.split(',');
        }

        return new ProductDTO(id, title, description, price, amount, main_image, additionalImagesArr);
      }
    } catch (err) {
      throw new Error('Unable to get product');
    }
    return null;
  };

  async getByTitle(title: string): Promise<ProductDTO | null> {
    const queryText = `SELECT id, title, description, price, amount, main_image, additional_images FROM product WHERE title = $1;`;
    const values = [title];

    try {
      const result = await query(queryText, values);

      if (result.rows.length > 0) {
        const {id, title, description, price, amount, main_image, additional_images} = result.rows[0];
        let additionalImagesArr: string[] | null = null;

        if (additional_images) {
          additionalImagesArr = additional_images.split(',');
        }

        return new ProductDTO(id, title, description, price, amount, main_image, additionalImagesArr);
      }
    } catch (err) {
      throw new Error('Unable to get product by title');
    }
    return null;
  };

  async update(product: ProductDTO): Promise<void> {
    const queryText = 'UPDATE product SET title = $1, description = $2, price = $3, amount = $4 main_image = $5, additional_images = $6 WHERE id = $7';
    const additionalImages = product.additionalImages ? product.additionalImages.join(',') : null;

    const values = [product.title, product.description, product.price, product.amount, product.mainImage, additionalImages, product.id];

    try {
      await query(queryText, values);
    } catch (err) {
      throw new Error('Unable to update product');
    }
  };

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

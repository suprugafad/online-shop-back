import { query } from '../db';
import ProductDTO from '../dtos/productDTO';
import { IRepository } from "./interfaces/IRepository";

export interface FilterOptions {
  minPrice?: number;
  maxPrice?: number;
  manufacturers?: string[];
  categories?: string[];
}

export class ProductRepositoryImpl implements IRepository<ProductDTO> {
  async create(product: ProductDTO): Promise<void> {
    const queryText = `INSERT INTO product (title, manufacturer, description, price, amount, main_image, additional_images) VALUES ($1, $2, $3, $4, $5, $6, $7);`;
    const additionalImages = product.additionalImages ? product.additionalImages.join(',') : null;
    const values = [product.title, product.manufacturer, product.description, product.price, product.amount, product.mainImage, additionalImages];

    try {
      await query(queryText, values);
    } catch (err) {
      throw new Error('Unable to create product');
    }
  };

  async countAll(): Promise<number> {
    const queryText = `SELECT COUNT(*) FROM product;`;

    try {
      const result = await query(queryText);
      return parseInt(result.rows[0].count);
    } catch (err) {
      throw new Error('Unable to count all products');
    }
  };

  async getAll(): Promise<ProductDTO[]> {
    const queryText = `SELECT id, title, manufacturer, description, price, amount, main_image, additional_images FROM product ORDER BY id ASC;`;

    try {
      const result = await query(queryText);
      let additionalImages: string[] | null = null;

      return result.rows.map(row => {
        if (row.additional_images) {
          additionalImages = row.additional_images.split(',');
        }

        return new ProductDTO(row.id, row.title, row.manufacturer, row.description, row.price, row.amount, row.main_image, additionalImages);
      });
    } catch (err) {
      throw new Error('Unable to get all products');
    }
  };

  async getNewProducts(): Promise<ProductDTO[]> {
    const queryText = `SELECT id, title, manufacturer, description, price, amount, main_image, additional_images FROM product ORDER BY created_at DESC LIMIT 6;`;

    try {
      const products = await query(queryText);
      let additionalImages: string[] | null = null;

      return products.rows.map(row => {
        if (row.additional_images) {
          additionalImages = row.additional_images.split(',');
        }

        return new ProductDTO(row.id, row.title, row.manufacturer, row.description, row.price, row.amount, row.main_image, additionalImages);
      });
    } catch (err) {
      throw new Error('Unable to get new products');
    }
  };


  async getPaginated(page: number, limit: number, sort: string): Promise<ProductDTO[]> {
    const offset = (page - 1) * limit;

    let queryText = `
    SELECT id, title, manufacturer, description, price, amount, main_image, additional_images
    FROM product `;

    switch (sort) {
      case 'no':
        queryText += ` ORDER BY id ASC `;
        break;
      case 'lowest-price':
        queryText += ` ORDER BY price ASC `;
        break;
      case 'highest-price':
        queryText += ` ORDER BY price DESC `;
        break;
      case 'newest':
        queryText += ` ORDER BY created_at DESC `;
        break;
    }

    queryText += ` LIMIT $1 OFFSET $2 `

    try {
      const result = await query(queryText, [limit, offset]);
      let additionalImages: string[] | null = null;

      return result.rows.map(row => {
        if (row.additional_images) {
          additionalImages = row.additional_images.split(',');
        }

        return new ProductDTO(row.id, row.title, row.manufacturer, row.description, row.price, row.amount, row.main_image, additionalImages);
      });
    } catch (err) {
      throw new Error('Unable to get paginated products');
    }
  };

  async filterWithPagination(filterOptions: FilterOptions, sort: string, page: number, limit: number): Promise<{ products: { product: ProductDTO, category_names: string[] }[], amount: number }> {
    let queryText = `SELECT product.id, product.title, product.manufacturer, product.description, product.price, product.amount, product.main_image, product.additional_images, 
                      ARRAY_AGG(category.name) AS category_names
                      FROM product
                      LEFT JOIN product_category ON product.id = product_category.product_id 
                      LEFT JOIN category ON product_category.category_id = category.id`;

    const values: any[] = [];
    const conditions: string[] = [];
    const offset = (page - 1) * limit;

    if (filterOptions.minPrice) {
      values.push(filterOptions.minPrice);
      conditions.push(`price >= $${values.length}`);
    }

    if (filterOptions.maxPrice) {
      values.push(filterOptions.maxPrice);
      conditions.push(`price <= $${values.length}`);
    }

    const allManufacturers: string[] = [];
    if (filterOptions.manufacturers && filterOptions.manufacturers[0]) {
      filterOptions.manufacturers.forEach((manufacturer) => {
        values.push(manufacturer);
        allManufacturers.push(`$${values.length}`);
      });

      conditions.push(`manufacturer IN (${allManufacturers.join(',')})`);
    }

    const allCategories: string[] = [];
    if (filterOptions.categories && filterOptions.categories[0]) {
      filterOptions.categories.forEach((category) => {
        values.push(category);
        allCategories.push(`$${values.length}`);
      });

      conditions.push(`category.name IN (${allCategories.join(',')})`);
    }

    if (conditions.length > 0) {
      queryText += ` WHERE ${conditions.join(' AND ')} `;
    }

    queryText += ` GROUP BY product.id `;

    switch (sort) {
      case 'no':
        queryText += ` ORDER BY product.id ASC `;
        break;
      case 'lowest-price':
        queryText += ` ORDER BY product.price ASC `;
        break;
      case 'highest-price':
        queryText += ` ORDER BY product.price DESC `;
        break;
      case 'newest':
        queryText += ` ORDER BY product.created_at DESC `;
        break;
    }

    try {
      const resultAll = await query(queryText, values);
      const amount = resultAll.rows.length;

      if (amount > 0) {
        const products: { product: ProductDTO, category_names: string[] }[] = [];
        queryText += ` LIMIT ${limit} OFFSET ${offset} `;
        const result = await query(queryText, values);

        for (const row of result.rows) {
          const { id, title, manufacturer, description, price, amount, main_image, additional_images, category_names } = row;
          let additionalImagesArr: string[] | null = null;

          if (additional_images) {
            additionalImagesArr = additional_images.split(',');
          }

          const product = new ProductDTO(id, title, manufacturer, description, price, amount, main_image, additionalImagesArr);
          products.push({ product, category_names });
        }

        return { products, amount };
      }
    } catch (err) {
      throw new Error('Unable to get products by price range');
    }

    return { products: [], amount: 0 };
  }

  async getById(id: number): Promise<ProductDTO | null> {
    const queryText = `SELECT id, title, manufacturer, description, price, amount, main_image, additional_images FROM product WHERE id = $1;`;
    const values = [id];

    try {
      const result = await query(queryText, values);

      if (result.rows.length > 0) {
        const {id, title, manufacturer, description, price, amount, main_image, additional_images} = result.rows[0];

        let additionalImagesArr: string[] | null = null;

        if (additional_images) {
          additionalImagesArr = additional_images.split(',');
        }

        return new ProductDTO(id, title, manufacturer, description, price, amount, main_image, additionalImagesArr);
      }
    } catch (err) {
      throw new Error('Unable to get product by id');
    }
    return null;
  };

  async getAllManufacturers(): Promise<string[]> {
    const queryText = `SELECT DISTINCT manufacturer FROM product;`;
    try {
      const result = await query(queryText);

      if (result.rows.length > 0) {
        const filteredRows = result.rows.filter(row => row.manufacturer !== null);

        return filteredRows.map(row => row.manufacturer);
      }
    } catch (err) {
      throw new Error('Unable to get product by id');
    }
    return [];
  }

  async getByTitle(title: string): Promise<ProductDTO | null> {
    const queryText = `SELECT id, title, manufacturer, description, price, amount, main_image, additional_images FROM product WHERE title = $1;`;
    const values = [title];

    try {
      const result = await query(queryText, values);

      if (result.rows.length > 0) {
        const {id, title, manufacturer, description, price, amount, main_image, additional_images} = result.rows[0];
        let additionalImagesArr: string[] | null = null;

        if (additional_images) {
          additionalImagesArr = additional_images.split(',');
        }

        return new ProductDTO(id, title, manufacturer, description, price, amount, main_image, additionalImagesArr);
      }
    } catch (err) {
      throw new Error('Unable to get product by title');
    }
    return null;
  };

  async sortAllByPrice(): Promise<ProductDTO[] | null> {
    const queryText = `SELECT id, title, manufacturer, description, price, amount, main_image, additional_images FROM product ORDER BY price ASC;`;

    try {
      const result = await query(queryText);

      if (result.rows.length > 0) {
        const products: ProductDTO[] = [];

        for (const row of result.rows) {
          const {id, title, manufacturer, description, price, amount, main_image, additional_images} = row;
          let additionalImagesArr: string[] | null = null;

          if (additional_images) {
            additionalImagesArr = additional_images.split(',');
          }

          const product = new ProductDTO(id, title, manufacturer, description, price, amount, main_image, additionalImagesArr);
          products.push(product);
        }

        return products;
      }
    } catch (err) {
      throw new Error('Unable to get products by price');
    }

    return null;
  }

  async update(product: ProductDTO): Promise<void> {
    const queryText = 'UPDATE product SET title = $1, manufacturer = $2, description = $3, price = $4, amount = $5, main_image = $6, additional_images = $7 WHERE id = $8';
    const additionalImages = product.additionalImages ? product.additionalImages.join(',') : null;

    const values = [product.title, product.manufacturer, product.description, product.price, product.amount, product.mainImage, additionalImages, product.id];

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

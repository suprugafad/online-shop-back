import { IRepository } from "./interfaces/IRepository";
import { query } from '../db';
import CategoryDTO from '../dtos/categoryDTO';

export class CategoryRepositoryImpl implements IRepository<CategoryDTO> {
  async create(category: CategoryDTO): Promise<void> {
    const queryText = `INSERT INTO category (name) VALUES ($1);`;
    const values = [category.name];

    try {
      await query(queryText, values);
    } catch (err) {
      throw new Error('Unable to create product');
    }
  }

  async getAll(): Promise<CategoryDTO[]> {
    const queryText = `SELECT id, name FROM category ORDER BY id ASC;`;

    try {
      const result = await query(queryText);

      return result.rows.map(row => new CategoryDTO(row.id, row.name));
    } catch (err) {
      throw new Error('Unable to get all products');
    }
  }

  async delete(id: number): Promise<void> {
    const queryText = 'DELETE FROM category WHERE id = $1';
    const values = [id];

    try {
      await query(queryText, values);
    } catch (err) {
      throw new Error('Unable to delete product');
    }
  }

  async getById(id: number): Promise<CategoryDTO | null> {
    const queryText = `SELECT id, name FROM category WHERE id = $1;`;
    const values = [id];

    try {
      const result = await query(queryText, values);

      if (result.rows.length > 0) {
        const {id, name} = result.rows[0];

        return new CategoryDTO(id, name);
      }
    } catch (err) {
      throw new Error('Unable to get product');
    }
    return null;
  }

  async update(category: CategoryDTO): Promise<void> {
    const queryText = 'UPDATE category SET name = $1 WHERE id = $2';
    const values = [category.name, category.id];

    try {
      await query(queryText, values);
    } catch (err) {
      throw new Error('Unable to update product');
    }
  }
}

export default CategoryRepositoryImpl;
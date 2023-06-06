import { query } from '../db';
import UserDTO from '../dtos/userDTO';
import { IUserRepository } from './interfaces/IUserRepository';
const bcrypt = require('bcrypt');

const saltRounds = 10;

export class UserRepositoryImpl implements IUserRepository {
  async create(user: UserDTO, password: string): Promise<void> {
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const queryText = `INSERT INTO "user" (username, email, role, password) VALUES ($1, $2, $3, $4)`;
    const values = [user.username, user.email, user.role, hashedPassword];

    try {
      await query(queryText, values);
    } catch (err) {
      throw new Error('Unable to create user');
    }
  };

  async getUserByEmail(email: string): Promise<{ password: any; userDTO: UserDTO } | null> {
    const queryText = `SELECT id, username, email, role, password FROM "user" WHERE email = $1;`;
    const values = [email];

    try {
      const result = await query(queryText, values);

      if (result.rows.length > 0) {
        const { id, username, email, role, password } = result.rows[0];

        return { userDTO: new UserDTO(id, username, email, role), password: password };
      }
    } catch (err) {
      throw new Error('Unable to get user by email');
    }
    return null;
  };

  async getByIdWithPassword(id: number): Promise<{ password: any; userDTO: UserDTO } | null> {
    const queryText = `SELECT id, username, email, role, password FROM "user" WHERE id = $1;`;
    const values = [id];

    try {
      const result = await query(queryText, values);

      if (result.rows.length > 0) {
        const {id, username, email, role, password} = result.rows[0];

        return { userDTO: new UserDTO(id, username, email, role), password: password};
      }
    } catch (err) {
      throw new Error('Unable to get user');
    }
    return null;
  };

  async updatePassword(id: number, newPassword: string): Promise<void> {
      const newHashedPassword = await bcrypt.hash(newPassword, saltRounds);

      const queryText = `UPDATE "user" SET password = $1 WHERE id = $2;`;
      const values = [newHashedPassword, id];

      try {
        await query(queryText, values);
      } catch (err) {
        throw new Error('Unable to update user password');
      }
  };

  async getAll(): Promise<UserDTO[]> {
    const queryText = `SELECT id, username, email, role FROM "user" ORDER BY id ASC`;

    try {
      const result = await query(queryText);

      return result.rows.map(row => new UserDTO(row.id, row.username, row.email, row.role));
    } catch (err) {
      throw new Error('Unable to get all users');
    }
  };

  async countAllCustomers(): Promise<number> {
    const queryText = `SELECT COUNT(*) FROM "user" WHERE role = 'customer';`;

    try {
      const result = await query(queryText);
      return parseInt(result.rows[0].count);
    } catch (err) {
      throw new Error('Unable to count all users');
    }
  };

  async update(user: UserDTO): Promise<void> {
    const queryText = 'UPDATE "user" SET username = $1, email = $2, role = $3 WHERE id = $4';
    const values = [user.username, user.email, user.role, user.id];

    try {
      await query(queryText, values);
    } catch (err) {
      throw new Error('Unable to update user');
    }
  };

  async delete(id: number): Promise<void> {
    const queryText = 'DELETE FROM "user" WHERE id = $1';
    const values = [id];

    try {
      await query(queryText, values);
    } catch (err) {
      throw new Error('Unable to delete user');
    }
  };

  async getById(id: number): Promise<UserDTO | null> {
    const queryText = `SELECT id, username, email, role, password FROM "user" WHERE id = $1;`;
    const values = [id];

    try {
      const result = await query(queryText, values);

      if (result.rows.length > 0) {
        const {id, username, email, role} = result.rows[0];

        return new UserDTO(id, username, email, role);
      }
    } catch (err) {
      throw new Error('Unable to get user');
    }
    return null;
  };
}

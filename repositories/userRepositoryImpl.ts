import { query } from '../db';
import UserDTO from '../dtos/userDTO';
import { IUserRepository } from './IUserRepository';
import userDTO from "../dtos/userDTO";
const bcrypt = require('bcrypt');

const saltRounds = 10;

export class UserRepositoryImpl implements IUserRepository {
  async create(user: userDTO, password: string): Promise<void> {
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const queryText = `INSERT INTO users (username, email, password) VALUES ($1, $2, $3)`;
    const values = [user.username, user.email, hashedPassword];

    try {
      await query(queryText, values);
    } catch (err) {
      throw new Error('Unable to create user');
    }
  }

  async getUserByEmail(email: string): Promise<{ password: any; userDTO: UserDTO } | null> {
    const queryText = `SELECT id, username, email, password FROM users WHERE email = $1;`;
    const values = [email];

    try {
      const result = await query(queryText, values);

      if (result.rows.length > 0) {
        const {id, username, email, password} = result.rows[0];

        return {userDTO: new UserDTO(id, username, email), password: password};
      }
    } catch (err) {
      throw new Error('Unable to get user');
    }
    return null;
  }

  async getByIdWithPassword(id: number): Promise<{ password: any; userDTO: UserDTO } | null> {
    const queryText = `SELECT id, username, email, password FROM users WHERE id = $1;`;
    const values = [id];

    try {
      const result = await query(queryText, values);

      if (result.rows.length > 0) {
        const {id, username, email, password} = result.rows[0];

        return { userDTO: new UserDTO(id, username, email), password: password};
      }
    } catch (err) {
      throw new Error('Unable to get user');
    }
    return null;
  }

  async updatePassword(id: number, newPassword: string): Promise<void> {
      const newHashedPassword = await bcrypt.hash(newPassword, saltRounds);

      const queryText = `UPDATE user SET password = $1 WHERE id = $2;`;
      const values = [newHashedPassword, id];

      try {
        await query(queryText, values);
      } catch (err) {
        throw new Error('Unable to update user password');
      }
  }

  async getAll(): Promise<UserDTO[]> {
    const queryText = `SELECT id, username, email FROM users ORDER BY id ASC`;

    try {
      const result = await query(queryText);

      return result.rows.map(row => new UserDTO(row.id, row.username, row.email));
    } catch (err) {
      throw new Error('Unable to get all users');
    }
  }

  async update(user: UserDTO): Promise<void> {
      const queryText = 'UPDATE user SET username = $1, email = $2 WHERE id = $3';
      const values = [user.username, user.email, user.id];

      try {
        await query(queryText, values);
      } catch (err) {
        throw new Error('Unable to update user');
      }
  }

  async delete(id: number): Promise<void> {
    const queryText = 'DELETE FROM user WHERE id = $1';
    const values = [id];

    try {
      await query(queryText, values);
    } catch (err) {
      throw new Error('Unable to delete user');
    }
  }

  async getById(id: number): Promise<UserDTO | null> {
    const queryText = `SELECT id, username, email, password FROM users WHERE id = $1;`;
    const values = [id];

    try {
      const result = await query(queryText, values);

      if (result.rows.length > 0) {
        const {id, username, email} = result.rows[0];

        return new UserDTO(id, username, email);
      }
    } catch (err) {
      throw new Error('Unable to get user');
    }
    return null;
  }
}

import UserAddressDTO from '../dtos/userAddressDTO';
import { IUserAddressRepository } from "./IUserAddressRepository";
import { query } from '../db';

export class UserAddressRepositoryImpl implements IUserAddressRepository {
  async create(userAddress: UserAddressDTO): Promise<void> {
    const queryText = `INSERT INTO user_address (user_id, address_id) VALUES ($1, $2)`;
    const values = [userAddress.userId, userAddress.addressId];

    try {
      await query(queryText, values);
    } catch (err) {
      throw new Error('Unable to create user address');
    }
  };

  async getAll(): Promise<UserAddressDTO[]> {
    const queryText = `SELECT id, user_id, address_id FROM user_addresses`;

    try {
      const result = await query(queryText);

      return result.rows.map(row => new UserAddressDTO(row.id, row.user_id, row.address_id));
    } catch (err) {
      throw new Error('Unable to get all user addresses');
    }
  };

  async getById(id: number): Promise<UserAddressDTO | null> {
    const queryText = `SELECT id, user_id, address_id FROM user_address WHERE id = $1`;
    const values = [id];

    try {
      const result = await query(queryText, values);

      if (result.rows.length > 0) {
        const { id, user_id, address_id } = result.rows[0];

        return new UserAddressDTO(id, user_id, address_id);
      }
    } catch (err) {
      throw new Error('Unable to get user address by id');
    }
    return null;
  };

  async getAddressesByUserId(userId: number): Promise<UserAddressDTO[] | null> {
    const queryText = `SELECT id, user_id, address_id FROM user_address WHERE user_id = $1`;
    const values = [userId];

    try {
      const result = await query(queryText, values);

      if (result.rows.length > 0) {
        return result.rows.map(row => new UserAddressDTO(row.id, row.user_id, row.address_id));
      }
    } catch (err) {
      throw new Error('Unable to get user addresses by user id');
    }
    return null;
  };

  async update(userAddress: UserAddressDTO): Promise<void> {
    const queryText = `UPDATE user_address SET user_id = $1, address_id = $2 WHERE id = $3`;
    const values = [userAddress.userId, userAddress.addressId, userAddress.id];

    try {
      await query(queryText, values);
    } catch (err) {
      throw new Error('Unable to update user address');
    }
  }

  async delete(id: number): Promise<void> {
    const queryText = `DELETE FROM user_address WHERE id = $1`;
    const values = [id];

    try {
      await query(queryText, values);
    } catch (err) {
      throw new Error('Unable to delete user address');
    }
  }

  async deleteByUserId(userId: number): Promise<void> {
    const queryText = `DELETE FROM user_addresses WHERE user_id = $1;`;
    const values = [userId];

    try {
      await query(queryText, values);
    } catch (err) {
      throw new Error('Unable to delete user addresses for user ID');
    }
  };
}

import { query } from '../db';
import AddressDTO from '../dtos/addressDTO';
import { IAddressRepository } from "./interfaces/IAddressRepository";

export class AddressRepositoryImpl implements IAddressRepository {
  async create(address: AddressDTO): Promise<void> {
    const queryText = `INSERT INTO address (country, city, street, house, apartment) VALUES ($1, $2, $3, $4, $5);`;
    const values = [address.country, address.city, address.street, address.house, address.apartment];

    try {
      await query(queryText, values);
    } catch (err) {
      throw new Error('Unable to create address');
    }
  };

  async getAll(): Promise<AddressDTO[]> {
    const queryText = `SELECT id, country, city, street, house, apartment FROM address ORDER BY id ASC;`;

    try {
      const result = await query(queryText);

      return result.rows.map(row => new AddressDTO(row.id, row.country, row.city, row.street, row.house, row.apartment));
    } catch (err) {
      throw new Error('Unable to get all addresses');
    }
  };

  async getById(id: number): Promise<AddressDTO | null> {
    const queryText = `SELECT id, country, city, street, house, apartment FROM address WHERE id = $1;`;
    const values = [id];

    try {
      const result = await query(queryText, values);

      if (result.rows.length > 0) {
        const {id, country, city, street, house, apartment} = result.rows[0];

        return new AddressDTO(id, country, city, street, house, apartment);
      }
    } catch (err) {
      throw new Error('Unable to get address');
    }
    return null;
  };

  async getByOrderId(orderId: number): Promise<AddressDTO | null> {
    const queryText = `SELECT id, country, city, street, house, apartment FROM address WHERE id IN (SELECT address_id FROM order WHERE id = $1);`;
    const values = [orderId];

    try {
      const result = await query(queryText, values);

      if (result.rows.length > 0) {
        const { id, country, city, street, house, apartment } = result.rows[0];

        return new AddressDTO(id, country, city, street, house, apartment);
      }
    } catch (err) {
      throw new Error('Unable to get address by order ID');
    }
    return null;
  };

  async filterByParameter(type: string, value: string | number): Promise<AddressDTO[]> {   // city, country
    const queryText = `SELECT id, country, city, street, house, apartment FROM address WHERE ${type} = $1`;
    const values = [value];

    try {
      const result = await query(queryText, values);

      return result.rows.map(row => new AddressDTO(row.id, row.country, row.city, row.street, row.house, row.apartment));
    } catch (err) {
      throw new Error(`Unable to get addresses by ${type}`);
    }
  };

  async update(address: AddressDTO): Promise<void> {
    const queryText = 'UPDATE address SET country = $1, city = $2, street = $3, house = $4, apartment = $5 WHERE id = $6';
    const values = [address.country, address.city, address.street, address.house, address.apartment, address.id];

    try {
      await query(queryText, values);
    } catch (err) {
      throw new Error('Unable to update address');
    }
  };

  async delete(id: number): Promise<void> {
    const queryText = 'DELETE FROM address WHERE id = $1';
    const values = [id];

    try {
      await query(queryText, values);
    } catch (err) {
      throw new Error('Unable to delete address');
    }
  };

  async isExist(address: AddressDTO): Promise<boolean> {
    const queryText = 'SELECT id FROM address WHERE country = $1, city = $2, street = $3, house = $4, apartment = $5';
    const values = [address.country, address.city, address.street, address.house, address.apartment];

    try {
      const result = await query(queryText, values);

      return result.rows.length !== 0;
    } catch (err) {
      throw new Error('Unable to get address by order ID');
    }
  };
}

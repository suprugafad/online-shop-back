const AddressDTO = require('../dtos/addressDTO')
import { AddressRepositoryImpl } from '../repositories/addressRepositoryImpl';

const addressRepository = new AddressRepositoryImpl();

class AddressController {
  public createAddress = async (req: any, res: any) => {
    try {
      const { country, city, street, house, apartment } = req.body;

      const newAddress = new AddressDTO(undefined, country, city, street, house, apartment);

      await addressRepository.create(newAddress);

      res.status(200).send('Address created successfully');
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error creating address.' });
    }
  };

  public getAddresses = async (req: any, res: any) => {
    try {
      const addresses = await addressRepository.getAll();

      res.status(200).json(addresses);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error getting addresses.' });
    }
  };

  public deleteAddress = async (req: any, res: any) => {
    const id = parseInt(req.params.id);

    try {
      const address = await addressRepository.getById(id);

      if (!address) {
        return res.status(404).json({ message: 'Address not found.' });
      }

      await addressRepository.delete(id);

      res.status(200).send(`Address deleted with ID: ${id}`);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error deleting address.' });
    }
  };

  public updateAddress = async (req: any, res: any) => {
    const id = parseInt(req.params.id);
    const { country, city, street, house, apartment } = req.body;

    try {
      const address = await addressRepository.getById(id);

      if (!address) {
        return res.status(404).json({ message: 'Address not found.' });
      }

      const updatedAddress = new AddressDTO(id, country || address.country, city || address.city, street || address.street, house || address.house, apartment || address.apartment);

      await addressRepository.update(updatedAddress);

      res.status(200).send(`Address modified with ID: ${id}`);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error updating address.' });
    }
  };

  public getAddressById = async (req: any, res: any) => {
    const id = parseInt(req.params.id);

    try {
      const address = await addressRepository.getById(id);

      if (!address) {
        return res.status(404).json({ message: 'Address not found.' });
      }

      res.status(200).json(address);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error getting address by ID.' });
    }
  };

  public getAddressesByCountry = async (req: any, res: any) => {
    const country = req.params.country;

    try {
      const addresses = await addressRepository.getByCountry(country);

      res.status(200).json(addresses);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error getting addresses by country.' });
    }
  };

  public getAddressesByCity = async (req: any, res: any) => {
    const city = req.params.city;

    try {
      const addresses = await addressRepository.getByCity(city);

      res.status(200).json(addresses);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error getting addresses by country.' });
    }
  };

  public getAddressByOrderId = async (req: any, res: any) => {
    const orderId = parseInt(req.params.orderId);

    try {
      const address = await addressRepository.getByOrderId(orderId);

      if (!address) {
        return res.status(404).json({ message: 'No address found for the given order ID' });
      }

      res.status(200).json(address);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error getting address by order ID' });
    }
  };
}

export default new AddressController();

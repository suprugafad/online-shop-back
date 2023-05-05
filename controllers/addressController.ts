import {Request, Response} from "express";

import AddressDTO from '../dtos/addressDTO';
import { AddressRepositoryImpl } from '../repositories/addressRepositoryImpl';

const addressRepository = new AddressRepositoryImpl();

class AddressController {
  public createAddress = async (req: Request, res: Response) => {
    try {
      const { country, city, street, house, apartment } = req.body;

      const newAddress = new AddressDTO(null, country, city, street, house, apartment);

      const address = await addressRepository.isExist(newAddress);

      if (!address.isExist) {
        const id = await addressRepository.create(newAddress);

        return res.status(200).json({ message: 'Address created successfully', addressId: id });
      } else {
        return res.status(203).json({ message: `Such address is already exist`, addressId: address.id });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error creating address.' });
    }
  };

  public getAddresses = async (req: Request, res: Response) => {
    try {
      const addresses = await addressRepository.getAll();

      res.status(200).json(addresses);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error getting addresses.' });
    }
  };

  public deleteAddress = async (req: Request, res: Response) => {
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

  public updateAddress = async (req: Request, res: Response) => {
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

  public getAddressById = async (req: Request, res: Response) => {
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

  public getAddressesByFilter = async (req: Request, res: Response) => {   // city, country
    const { filterType, filterValue } = req.params;

    try {
      const addresses = await addressRepository.filterByParameter(filterType, filterValue);

      if (!addresses) {
        return res.status(404).json({ message: `Addresses by ${filterType} not found.` });
      }

      res.status(200).json(addresses);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: `Error getting addresses by ${filterType}.` });
    }
  };

  public getAddressByOrderId = async (req: Request, res: Response) => {
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

  public getAddressesByUserId = async (req: Request, res: Response) => {
    const userId = parseInt(req.params.userId);

    try {
      const addresses = await addressRepository.getByUserId(userId);

      if (!addresses) {
        return res.status(404).json({ message: 'No address found for the given user ID' });
      }

      res.status(200).json(addresses);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error getting address by order ID' });
    }
  };
}

export default new AddressController();

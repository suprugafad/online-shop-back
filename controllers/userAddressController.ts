import UserAddressDTO from '../dtos/userAddressDTO';
import { UserAddressRepositoryImpl } from '../repositories/userAddressRepositoryImpl';
import {Request, Response} from "express";

const UserAddressRepository = new UserAddressRepositoryImpl();

export class UserAddressController {
  public getAllUserAddress = async (req: Request, res: Response) => {
    try {
      const userAddresses = UserAddressRepository.getAll();

      if (!userAddresses) {
        return res.status(404).json({message: 'User_addresses not found'});
      }

      res.status(200).json(userAddresses);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error getting user_addresses.' });
    }
  };

  public getUserAddressById = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id);

      const userAddress = await UserAddressRepository.getById(id);

      if (!userAddress) {
        res.status(404).json({message: 'User_address not found'});
      }

      res.status(200).json(userAddress);
    } catch (err) {
      console.error(err);
      res.status(500).json({message: 'Error getting user_address by id.'});
    }
  };

  public getUserAddressByUserId = async (req: Request, res: Response): Promise<void> => {
    try {
      const userId = parseInt(req.params.userId);

      const userAddress = await UserAddressRepository.getAddressesByUserId(userId);

      if (!userAddress) {
        res.status(404).json({message: 'User_address not found'});
      }

      res.status(200).json(userAddress);
    } catch (err) {
      console.error(err);
      res.status(500).json({message: 'Error getting user_addresses by userId.'});
    }
  };

  public createUserAddress = async (req: Request, res: Response): Promise<void> => {
    const {userId, addressId} = req.body;

    const existingUserAddress = await UserAddressRepository.getByUserIdAndAddressId(userId, addressId);

    if (existingUserAddress) {
      res.status(400).json({ message: 'Product is already associated with the category' });
    }

    try {
      const userAddress = new UserAddressDTO(null, userId, addressId);
      await UserAddressRepository.create(userAddress);

      res.status(201).json(userAddress);
    } catch (err) {
      console.error(err);
      res.status(500).json({message: 'Error creating user_address'});
    }
  };

  public deleteUserAddress = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id);

      const userAddress = await UserAddressRepository.getById(id);

      if (!userAddress) {
        res.status(404).json({message: 'User_address not found'});
      }

      await UserAddressRepository.delete(id);

      res.status(200).send(`User_address deleted with ID: ${id}`);
    } catch (err) {
      console.error(err);
      res.status(500).json({message: 'Error deleting user_address'});
    }
  };

  public deleteUserAddressByUserId = async (req: Request, res: Response): Promise<void> => {
    try {
      const userId = parseInt(req.params.userId);

      const userAddresses = await UserAddressRepository.getAddressesByUserId(userId);

      if (!userAddresses) {
        res.status(404).json({message: 'user_addresses not found for this user'});
      }

      await UserAddressRepository.deleteByUserId(userId);

      res.status(200).send(`user_address deleted with UserID: ${userId}`);
    } catch (err) {
      console.error(err);
      res.status(500).json({message: 'Error deleting user_addresses'});
    }
  };

  public updateUserAddress = async (req: any, res: any): Promise<void> => {
    try {
      const id = parseInt(req.params.id);

      const userAddress = await UserAddressRepository.getById(id);

      if (!userAddress) {
        return res.status(404).json({message: 'user_address not found'});
      }

      const {userId, addressId} = req.body;
      const updatedUserAddress = new UserAddressDTO(id, userId, addressId);

      await UserAddressRepository.update(updatedUserAddress);

      res.status(200).json(updatedUserAddress);
    } catch (err) {
      console.error(err);
      res.status(500).json({message: 'Error updating user_address'});
    }
  };
}

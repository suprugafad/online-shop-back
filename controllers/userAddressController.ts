import UserAddressDTO from '../dtos/userAddressDTO';
import { UserAddressRepositoryImpl } from '../repositories/userAddressRepositoryImpl';

const UserAddressRepository = new UserAddressRepositoryImpl();

export class UserAddressController {
  public getAllUserAddress = async (req: any, res: any) => {
    try {
      const users = UserAddressRepository.getAll();

      res.status(200).json(users);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error getting user_addresses.' });
    }
  };

  public getUserAddressById = async (req: any, res: any): Promise<void> => {
    try {
      const id = parseInt(req.params.id);

      const userAddress = await UserAddressRepository.getById(id);

      if (!userAddress) {
        return res.status(404).json({message: 'User_address not found'});
      }

      res.status(200).json(userAddress);
    } catch (err) {
      console.error(err);
      res.status(500).json({message: 'Error getting user_address by id.'});
    }
  };

  public getUserAddressByUserId = async (req: any, res: any): Promise<void> => {
    try {
      const userId = parseInt(req.params.userId);

      const userAddress = await UserAddressRepository.getAddressesByUserId(userId);

      if (!userAddress) {
        return res.status(404).json({message: 'User address not found'});
      }

      res.status(200).json(userAddress);
    } catch (err) {
      console.error(err);
      res.status(500).json({message: 'Error getting user_addresses by userId.'});
    }
  };

  public createUserAddress = async (req: any, res: any): Promise<void> => {
    const {userId, addressId} = req.body;

    try {
      const userAddress = new UserAddressDTO(null, userId, addressId);
      await UserAddressRepository.create(userAddress);

      res.status(201).json(userAddress);
    } catch (err) {
      console.error(err);
      res.status(500).json({message: 'Error creating user address'});
    }
  };

  public deleteUserAddress = async (req: any, res: any): Promise<void> => {
    try {
      const id = parseInt(req.params.id);

      const userAddress = await UserAddressRepository.getById(id);

      if (!userAddress) {
        return res.status(404).json({message: 'User_address not found'});
      }

      await UserAddressRepository.delete(id);

      res.status(200).send(`User_address deleted with ID: ${id}`);
    } catch (err) {
      console.error(err);
      res.status(500).json({message: 'Error deleting user_address'});
    }
  };

  public deleteUserAddressByUserId = async (req: any, res: any): Promise<void> => {
    try {
      const userId = parseInt(req.params.userId);

      const userAddresses = await UserAddressRepository.getAddressesByUserId(userId);

      if (!userAddresses) {
        return res.status(404).json({message: 'User addresses not found for this user'});
      }

      await UserAddressRepository.deleteByUserId(userId);

      res.status(200).send(`User_address deleted with UserID: ${userId}`);
    } catch (err) {
      console.error(err);
      res.status(500).json({message: 'Error deleting user addresses'});
    }
  };

  public updateUserAddress = async (req: any, res: any): Promise<void> => {
    try {
      const id = parseInt(req.params.id);

      const userAddress = await UserAddressRepository.getById(id);

      if (!userAddress) {
        return res.status(404).json({message: 'User_address not found'});
      }

      const {userId, addressId} = req.body;
      const updatedUserAddress = new UserAddressDTO(id, userId, addressId);

      await UserAddressRepository.update(updatedUserAddress);

      res.status(200).json(updatedUserAddress);
    } catch (err) {
      console.error(err);
      res.status(500).json({message: 'Error updating user address'});
    }
  };
}

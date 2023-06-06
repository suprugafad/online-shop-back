import { Request, Response } from "express";
import UserDTO from '../dtos/userDTO';
import { UserRepositoryImpl } from '../repositories/userRepositoryImpl';

const userRepository = new UserRepositoryImpl();

class userController {
  public getUsers = async (req: Request, res: Response) => {
    try {
      const users = await userRepository.getAll();

      if (!users) {
        return res.status(404).json({message: 'Users not found'});
      }

      res.status(200).json(users);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error getting users.' });
    }
  };

  public getUserById = async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);

      const user = await userRepository.getByIdWithPassword(id);

      if (!user) {
        return res.status(404).json({message: 'User not found'});
      }

      res.status(200).json(user.userDTO);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error getting user by ID.' });
    }
  };

  public getUserByEmail = async (req: Request, res: Response) => {
    try {
      const email = req.params.email;

      const user = await userRepository.getUserByEmail(email);

      if (!user) {
        return res.status(404).json({message: 'User not found'});
      }

      res.status(200).json(user.userDTO);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error getting user by ID.' });
    }
  };

  public getAmountOfCustomers = async (req: Request, res: Response) => {
    try {
      const amount = await userRepository.countAllCustomers();

      res.status(200).json(amount);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error getting user by ID.' });
    }
  };

  public updateUser = async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const { username, email, role } = req.body;

      const user = await userRepository.getByIdWithPassword(id);

      if (!user) {
        return res.status(404).json({message: 'User not found.'});
      }

      console.log(user.userDTO.id, username || user.userDTO.username, email || user.userDTO.email, role || user.userDTO.role)

      const newUser = new UserDTO(user.userDTO.id, username || user.userDTO.username, email || user.userDTO.email, role || user.userDTO.role);

      await userRepository.update(newUser);

      res.status(200).send(`User modified with ID: ${id}`);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error updating user.' });
    }
  };

  public deleteUser = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    
    try {
      const user = await userRepository.getByIdWithPassword(id);

      if (!user) {
        return res.status(404).json({ message: 'User not found.' });
      }

      await userRepository.delete(id);

      res.status(200).send(`User deleted with ID: ${id}`);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error deleting user.' });
    }
  };
}

export default new userController();


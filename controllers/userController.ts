const UserDTO = require('../dtos/userDTO')
import { UserRepositoryImpl } from '../repositories/userRepositoryImpl';

const userRepository = new UserRepositoryImpl();

class userController {
  public getUsers = async (req: any, res: any) => {
    try {
      const users = userRepository.getAll();

      res.status(200).json(users);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error getting users.' });
    }
  };

  public getUserById = async (req: any, res: any) => {
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

  public updateUser = async (req: any, res: any) => {
    try {
      const id = parseInt(req.params.id);
      const { username, email } = req.body;

      const user = await userRepository.getByIdWithPassword(id);

      if (!user) {
        return res.status(404).json({message: 'User not found.'});
      }

      const newUser = new UserDTO(user.userDTO.id, username || user.userDTO.username, email || user.userDTO.email);

      await userRepository.update(newUser);

      res.status(200).send(`User modified with ID: ${id}`);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error updating user.' });
    }
  };

  public deleteUser = async (req: any, res: any) => {
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


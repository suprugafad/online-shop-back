import { secret } from '../config/secrets';
import UserDTO from '../dtos/userDTO';
import { UserRepositoryImpl } from '../repositories/userRepositoryImpl';
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userRepository = new UserRepositoryImpl();

class AuthController {
  public regUser = async (req: any, res: any) => {
    try {
      const {username, email, password} = req.body;

      const users = await userRepository.getUserByEmail(email);

      if (users) {
        return res.status(409).send('User with this email already exists');
      }

      const user = new UserDTO(null, username, email);
      await userRepository.create(user, password);
      res.status(201).send('User was created successfully');
    } catch (err) {
      console.error(err);
      res.status(500).send('Error creating user');
    }
  };

  public logUser = async (req: any, res: any) => {
    try {
      const { email, password } = req.body;

      const user = await userRepository.getUserByEmail(email);

      if (!user) {
        return res.status(401).send('Invalid credentials');
      }

      const validPassword = await bcrypt.compare(password, user.password);

      if (!validPassword) {
        return res.status(401).send('Invalid credentials');
      }

      const token = jwt.sign({ id: user.userDTO.id }, secret, { expiresIn: '1d' });
      res.cookie('token', token, { httpOnly: true });

      res.status(200).send({
        message: 'User logged in',
        user: {
          id: user.userDTO.id,
          email: user.userDTO.email,
          username: user.userDTO.username,
        },
      });
    } catch (err) {
      console.error(err);
      res.status(500).send('Error creating user');
    }
  };

  public changePassword = async (req: any, res: any) => {
    try {
      const { userId, currentPassword, newPassword } = req.body;

      const user = await userRepository.getByIdWithPassword(userId);

      if (!user) {
        return res.status(401).send('Invalid credentials');
      }

      const validPassword = await bcrypt.compare(currentPassword, user.password);

      if (!validPassword) {
        return res.status(401).send('Invalid credentials');
      }

      await userRepository.updatePassword(userId, newPassword);
      res.send('Password was changed successfully');
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error getting user by ID.' });
    }
  };
}

export default new AuthController();


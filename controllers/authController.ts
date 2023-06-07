import { secret } from '../config/secrets';
import UserDTO from '../dtos/userDTO';
import { UserRepositoryImpl } from '../repositories/userRepositoryImpl';
import { Request, Response } from "express";
import { sendResetPasswordEmail } from "../services/emailService";
import { checkResetToken, deleteResetToken, saveResetToken } from "../repositories/resetTokenController";
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const uuid = require('uuid');
const userRepository = new UserRepositoryImpl();

class AuthController {
  public regUser = async (req: Request, res: Response) => {
    try {
      const { username, email, password } = req.body;

      const users = await userRepository.getUserByEmail(email);

      if (users) {
        return res.status(409).send('User with this email already exists');
      }

      const user = new UserDTO(null, username, email, 'customer');
      await userRepository.create(user, password);

      res.status(201).send('User was created successfully');
    } catch (err) {
      console.error(err);
      res.status(500).send('Error creating user');
    }
  };

  public logUser = async (req: Request, res: Response) => {
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

      const token = jwt.sign({ id: user.userDTO.id, role: user.userDTO.role }, secret, { expiresIn: '1h' });

      res.cookie('token', token, { httpOnly: true, sameSite: 'lax' });

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
      res.status(500).send('Error login user');
    }
  };

  public getUserIdFromToken = async (req: Request, res: Response) => {
    try {
      const token = req.cookies.token;

      if (!token) {
        return res.status(200).json({ isAuthenticated: false });
      }

      const data = jwt.verify(token, secret);
      res.status(200).send({ userId: data.id });
    } catch (err) {
      console.error(err);
      res.status(500).send('Error getting user_id');
    }
  }

  public logout = async (req: Request, res: Response) => {
    try {
      res.clearCookie('token', { httpOnly: true, sameSite: 'lax' });
      res.status(200).send('User logged out');
    } catch (err) {
      console.error(err);
      res.status(500).send('Error logging out user');
    }
  };

  public check = async (req: Request, res: Response) => {
    try {
      const token = req.cookies.token;

      if (!token) {
        return res.status(200).json({ isAuthenticated: false });
      }

      const { role } = jwt.verify(token, secret);

      return res.status(200).json({ isAuthenticated: true, role });
    } catch (e) {
      return res.status(200).json({ isAuthenticated: false });
    }
  };

  public checkResetToken = async (req: Request, res: Response) => {
    try {
      const resetToken = req.params.resetToken;
      const id = parseInt(req.params.id);

      const isValidToken = await checkResetToken(id, resetToken);

      if (!isValidToken) {
        return res.status(401).json({ message: 'Недействительный токен сброса пароля', isValidToken });
      }

      return res.status(200).json({ isValidToken });

    } catch (err) {
      console.error(err);
      res.status(500).json({message: 'Error getting token.'});
    }
  };

  public changePassword = async (req: Request, res: Response) => {
    try {
      const { newPassword } = req.body;
      const id = parseInt(req.params.id);
      const resetToken = req.params.resetToken;

      const isValidToken = await checkResetToken(id, resetToken);
      if (!isValidToken) {
        return res.status(401).send('Недействительный токен сброса пароля');
      }

      await userRepository.updatePassword(id, newPassword);
      await deleteResetToken(id);
      res.send('Password was changed successfully');
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error getting user by ID.' });
    }
  };

  public forgotPassword = async (req: Request , res: Response) => {
    try {
      const { email } = req.body;

      const user = await userRepository.getUserByEmail(email);
      if (!user) {
        return res.status(404).json({ message: 'User with is email not found' });
      }

      const resetToken = uuid.v4();

      if (!user.userDTO.id) {
        return res.status(404).json({ message: 'Id is null' });
      }

      await saveResetToken(user.userDTO.id, resetToken);

      const resetPasswordLink = `http://localhost:3000/resetPassword/${user.userDTO.id}/${resetToken}`;

      await sendResetPasswordEmail(email, resetPasswordLink);

      res.status(200).json({ message: 'Ссылка для сброса пароля отправлена на указанный email' });
    } catch (error) {
      console.error('Ошибка при сбросе пароля:', error);
      res.status(500).json({ message: 'Ошибка при сбросе пароля' });
    }
  };
}

export default new AuthController();


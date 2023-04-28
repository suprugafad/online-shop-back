import authenticationMiddleware from "../middleware/authenticationMiddleware";

const express = require('express');
import authController from '../controllers/authController';
import { Response } from 'express';
const cors = require("cors");

const router = express.Router();

router.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));

router.post('/register', authController.regUser);
router.post('/login', authController.logUser);
router.post('/logout', authController.logout);
router.get('/protected', authenticationMiddleware, (req: any, res: Response) => {
  res.status(200).json({ message: 'This route is protected and requires authentication', user: req.user });
});
router.post('/change_password', authController.changePassword);

export default router;

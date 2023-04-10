const express = require('express');
import authController from '../controllers/authController';
import authMiddleware from "../middleware/authMW";
const cors = require("cors");

const router = express.Router();

router.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));

router.post('/register', authController.regUser);
router.post('/login', authMiddleware, authController.logUser);
router.post('/change_password', authController.changePassword);

export default router;

import { UserRole } from "../enums/userRoleEnum";
import authController from '../controllers/authController';
import authorizationMiddleware from "../middleware/authorizationMiddleware";

const express = require('express');
const cors = require("cors");

const router = express.Router();

router.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));

router.post('/register', authController.regUser);
router.post('/login', authController.logUser);
router.post('/logout', authController.logout);
router.get('/protected', authorizationMiddleware([ UserRole.ADMIN, UserRole.CUSTOMER ]), authController.check);
router.get('/admin', authorizationMiddleware([ UserRole.ADMIN ]), authController.check);
router.post('/change_password', authController.changePassword);
router.get('/userId', authController.getUserIdFromToken);

export default router;
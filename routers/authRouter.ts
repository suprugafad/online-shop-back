import express from 'express';
import AuthController from '../controllers/authController';

const router = express.Router();

router.post('/register', AuthController.regUser);
router.post('/login', AuthController.logUser);
router.post('/change_password', AuthController.changePassword);

export default router;

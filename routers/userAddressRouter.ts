import { Router } from "express";
import userAddressController from "../controllers/userAddressController";

const router = Router();

router.get('/', userAddressController.getAllUserAddress);
router.get('/:id', userAddressController.getUserAddressById);
router.get('/user/:userId', userAddressController.getUserAddressByUserId);
router.post('/', userAddressController.createUserAddress);
router.delete('/:id', userAddressController.deleteUserAddress);
router.delete('/user/:userId', userAddressController.deleteUserAddressByUserId);
router.put('/:id', userAddressController.updateUserAddress);

export default router;

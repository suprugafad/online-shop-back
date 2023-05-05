import { Router } from 'express';
import addressController from '../controllers/addressController';

const router = Router();

router.post('/', addressController.createAddress);
router.get('/', addressController.getAddresses);
router.delete('/:id', addressController.deleteAddress);
router.put('/:id', addressController.updateAddress);
router.get('/:id', addressController.getAddressById);
router.get('/order/:orderId', addressController.getAddressByOrderId);
router.get('/user/:userId', addressController.getAddressesByUserId);
router.get('/:filterType/:filterValue', addressController.getAddressesByFilter);

export default router;
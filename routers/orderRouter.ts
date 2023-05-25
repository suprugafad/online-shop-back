import { Router } from 'express';
import orderController from "../controllers/orderController";

const router = Router();

router.get("/", orderController.getOrders);
router.get("/full_info", orderController.getOrdersFullInfo);
router.get("/:id", orderController.getOrderById);
router.get('/:filterType/:filterValue', orderController.getOrdersByFilter);
router.post("/", orderController.createOrder);
router.put("/:id", orderController.updateOrder);
router.delete("/:id", orderController.deleteOrder);

export default router;
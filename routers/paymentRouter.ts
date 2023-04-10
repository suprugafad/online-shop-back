const express = require('express');
import paymentController from "../controllers/paymentController";

const router = express.Router();

router.get("/", paymentController.getPayments);
router.get("/:id", paymentController.getPaymentById);
router.put("/:id", paymentController.updatePayment);
router.post("/", paymentController.createPayment);
router.post('/:filterType/:filterValue', paymentController.getPaymentsByFilter);
router.get('/revenue/:year/:month', paymentController.getRevenueByMonth);
router.get('/payments/totalAmount', paymentController.getTotalAmount);
router.delete('/:id', paymentController.deletePayment);

export default router;

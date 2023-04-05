import express from "express";
import paymentController from "../controllers/paymentController";

const router = express.Router();

router.get("/", paymentController.getPayments);
router.get("/:id", paymentController.getPaymentById);
router.put("/:id", paymentController.updatePayment);
router.post("/", paymentController.createPayment);
router.post('/method/:method', paymentController.getPaymentByMethod);
router.post('/orderId/:orderId', paymentController.getPaymentByOrderId);
router.post('/status/:status', paymentController.getPaymentByStatus);
router.post('/transactionId/:transactionId', paymentController.getPaymentByTransactionId);
router.post('/userId/:userId', paymentController.getPaymentByUserId);
router.get('/revenue/:year/:month', paymentController.getRevenueByMonth);
router.get('/payments/totalAmount', paymentController.getTotalAmount);
router.delete('/:id', paymentController.deletePayment);

export default router;

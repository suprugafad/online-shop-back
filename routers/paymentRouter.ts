import express from "express";
import paymentController from "../controllers/paymentController";

const router = express.Router();

router.get("/", paymentController.getPayments);
router.get("/:id", paymentController.getPaymentById);
router.put("/:id", paymentController.updatePayment);
router.post("/", paymentController.createPayment);

export default router;

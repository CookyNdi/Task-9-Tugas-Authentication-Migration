import express from "express";
import { payment, getTransactionByTicketId, confPayment } from "../controllers/Transaction.js";

const router = express.Router();

router.post("/payment", payment);
router.get("/payment/details", getTransactionByTicketId);
router.patch("/payment/:id", confPayment);

export default router;

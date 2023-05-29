import express from "express";
import { seatOrderList } from "../controllers/Seats.js";

const router = express.Router();

router.get("/seatorder", seatOrderList);

export default router;

import express from "express";
import { getBus, getBusById, createBus, updateBus, deleteBus } from "../controllers/Bus.js";

const router = express.Router();

router.get("/bus", getBus);
router.get("/bus/:id", getBusById);
router.post("/bus", createBus);
router.patch("/bus/:id", updateBus);
router.delete("/bus/:id", deleteBus);

export default router;

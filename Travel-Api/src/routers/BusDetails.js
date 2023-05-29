import express from "express";
import {
  getBusDetails,
  getBusDetailById,
  searchBusDetails,
  createBusDetail,
  updateBusDetail,
  deleteBusDetail,
} from "../controllers/BusDetails.js";

const router = express.Router();

router.get("/busdetails", getBusDetails);
router.get("/busdetails/filter", searchBusDetails);
router.get("/busdetails/:id", getBusDetailById);
router.post("/busdetails", createBusDetail);
router.patch("/busdetails/:id", updateBusDetail);
router.delete("/busdetails/:id", deleteBusDetail);

export default router;

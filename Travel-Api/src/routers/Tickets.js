import express from "express";
import { createTicket, getTicketById, getTicketHistoryUser } from "../controllers/Tickets.js";
import { authentication } from "../middlewares/AuthUser.js";

const router = express.Router();

router.get("/tickets", authentication, getTicketHistoryUser);
router.get("/ticket/:id", authentication, getTicketById);
router.post("/ticket", authentication, createTicket);

export default router;

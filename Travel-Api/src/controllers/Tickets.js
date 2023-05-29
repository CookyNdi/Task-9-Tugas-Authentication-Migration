import BusDetails from "../models/BusDetails.js";
import Seats from "../models/Seats.js";
import Tickets from "../models/Tickets.js";
import { Op } from "sequelize";

export const getTicketHistoryUser = async (req, res) => {
  try {
    const response = await Tickets.findAll({
      attributes: ["id", "busDetailId", "userId", "name_traveler", "total_amount"],
      where: {
        userId: req.userId,
      },
    });
    if (!response) return res.status(404).json({ msg: "Ticket Tidak Di Temukan" });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getTicketById = async (req, res) => {
  try {
    const response = await Tickets.findOne({
      attributes: ["id", "busDetailId", "userId", "name_traveler", "total_amount"],
      where: {
        [Op.and]: [{ id: req.params.id }, { userId: req.userId }],
      },
    });
    if (!response) return res.status(404).json({ msg: "Ticket Tidak Di Temukan" });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const createTicket = async (req, res) => {
  const { busDetailId, name, seat_order } = req.body;
  const userId = req.userId;
  const getPrice = await BusDetails.findOne({
    where: {
      id: busDetailId,
    },
  });
  const price = getPrice.price;
  try {
    await Tickets.create({
      busDetailId: busDetailId,
      userId: userId,
      name_traveler: name,
      total_amount: price,
    });
    const getTicketId = await Tickets.findAll();
    const idArray = getTicketId.map((obj) => obj.id);
    const ticketId = Math.max(...idArray);
    await Seats.update(
      {
        ticketId: ticketId,
      },
      {
        where: {
          [Op.and]: [{ busDetailId: busDetailId }, { seat_order: seat_order }],
        },
      }
    );
    res.status(201).json({ msg: "Ticket Telah Berhasil Dibuat" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

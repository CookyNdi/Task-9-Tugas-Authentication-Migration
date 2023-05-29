import Seats from "../models/Seats.js";

export const seatOrderNumber = async (busDetailId, total_seats) => {
  try {
    for (let i = 1; i <= total_seats; i++) {
      let seat_order = `A${i}`;
      await Seats.create({
        busDetailId: busDetailId,
        ticketId: null,
        seat_order: seat_order,
      });
    }
  } catch (error) {
    res.status(500).json("{ msg: error.message }");
  }
};

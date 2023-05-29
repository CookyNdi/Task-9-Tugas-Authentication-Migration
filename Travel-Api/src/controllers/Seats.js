import Seats from "../models/Seats.js";

export const seatOrderList = async (req, res) => {
  const respone = await Seats.findAll({
    where: {
      busDetailId: req.body.busDetailId,
    },
  });
  res.status(200).json(respone);
};

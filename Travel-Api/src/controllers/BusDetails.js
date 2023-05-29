import BusDetails from "../models/BusDetails.js";
import { seatOrderNumber } from "../utils/SeatOrder.js";
import { Op } from "sequelize";
// import moment from "moment";
// import "moment-timezone";

export const getBusDetails = async (req, res) => {
  try {
    const response = await BusDetails.findAll({
      attributes: ["id", "busId", "departure_point", "destination_point", "departure_time", "total_seats", "price"],
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const searchBusDetails = async (req,res) => {
  const page = parseInt(req.query.page) || 0;
  const limit = parseInt(req.query.limit) || 10;
  const search = req.query.search || "";
  const offset = limit * page;
  const totalRows = await BusDetails.count({
    where: {
      [Op.or]: [
        {
          departure_point: {
            [Op.like]: "%" + search + "%",
          },
        },
        {
          destination_point: {
            [Op.like]: "%" + search + "%",
          },
        },
        {
          departure_time: {
            [Op.like]: "%" + search + "%",
          },
        },
      ],
    },
  });
  const totalPage = Math.ceil(totalRows / limit);
  const result = await BusDetails.findAll({
    where: {
      [Op.or]: [
        {
          departure_point: {
            [Op.like]: "%" + search + "%",
          },
        },
        {
          destination_point: {
            [Op.like]: "%" + search + "%",
          },
        },
        {
          departure_time: {
            [Op.like]: "%" + search + "%",
          },
        },
      ],
    },
    offset: offset,
    limit: limit,
    order: [["id", "DESC"]],
  });
  res.json({
    result: result,
    page: page,
    limit: limit,
    totalRows: totalRows,
    totalPage: totalPage,
  });
};

export const getBusDetailById = async (req, res) => {
  try {
    const response = await BusDetails.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (!response) return res.status(404).json({ msg: "Bus Detail Tidak Di Temukan" });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const createBusDetail = async (req, res) => {
  const { busId, departure_point, destination_point, departure_time, total_seats, price } = req.body;

  try {
    await BusDetails.create({
      busId: busId,
      departure_point: departure_point,
      destination_point: destination_point,
      departure_time: departure_time,
      total_seats: total_seats,
      price: price,
    });

    const getBusDetailsId = await BusDetails.findAll();
    let busDetailsId;
    if (!getBusDetailsId) {
      busDetailsId = 1;
      await seatOrderNumber(busDetailsId, total_seats);
    } else {
      const idArray = getBusDetailsId.map((obj) => obj.id);
      busDetailsId = Math.max(...idArray);
      await seatOrderNumber(busDetailsId, total_seats);
    }

    res.status(201).json({ msg: "Bus Details Added" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const updateBusDetail = async (req, res) => {
  try {
    const bus = await BusDetails.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (!bus) return res.status(404).json({ msg: "Data Tidak Ditemukan" });
    const { busId, departure_point, destination_point, departure_time, total_seats, price } = req.body;

    // // const timeZone = "Asia/Jakarta";
    // // const dateTimeWithTimeZone = moment.tz(departure_time, timeZone);
    // // const formattedDateTime = dateTimeWithTimeZone.format("YYYY-MM-DD HH:mm:ss");

    // const formattedDateTime = moment.utc(departure_time).format("YYYY-MM-DD HH:mm:ss");
    // console.log(formattedDateTime);

    await BusDetails.update(
      {
        busId: busId,
        departure_point: departure_point,
        destination_point: destination_point,
        departure_time: departure_time,
        total_seats: total_seats,
        price: price,
      },
      {
        where: {
          id: bus.id,
        },
      }
    );
    res.status(200).json({ msg: "Bus Details Updated Succesfully" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const deleteBusDetail = async (req, res) => {
  try {
    const bus = await BusDetails.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (!bus) return res.status(404).json({ msg: "Data Tidak Ditemukan" });
    await BusDetails.destroy({
      where: {
        id: bus.id,
      },
    });
    res.status(200).json({ msg: "Bus Details Delete Succesfully" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

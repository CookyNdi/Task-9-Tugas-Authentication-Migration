import Bus from "../models/Bus.js";

export const getBus = async (req, res) => {
  try {
    const response = await Bus.findAll({
      attributes: ["id", "name", "brand"],
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getBusById = async (req, res) => {
  try {
    const response = await Bus.findOne({
      attributes: ["id", "name", "brand"],
      where: {
        id: req.params.id,
      },
    });
    if (!response) return res.status(404).json({ msg: "Bus Tidak Di Temukan" });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const createBus = async (req, res) => {
  const { name, brand } = req.body;
  try {
    await Bus.create({
      name: name,
      brand: brand,
    });
    res.status(201).json({ msg: "Bus Created Succesfully" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const updateBus = async (req, res) => {
  try {
    const bus = await Bus.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (!bus) return res.status(404).json({ msg: "Data Tidak Ditemukan" });
    const { name, brand } = req.body;
    await Bus.update(
      { name, brand },
      {
        where: {
          id: bus.id,
        },
      }
    );
    res.status(200).json({ msg: "Bus Updated Succesfully" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const deleteBus = async (req, res) => {
  try {
    const bus = await Bus.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (!bus) return res.status(404).json({ msg: "Data Tidak Ditemukan" });
    await Bus.destroy({
      where: {
        id: bus.id,
      },
    });
    res.status(200).json({ msg: "Bus Delete Succesfully" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

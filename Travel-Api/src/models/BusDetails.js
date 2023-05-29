import { Sequelize } from "sequelize";
import db from "../configs/db.js";
import Bus from "./Bus.js";

const { DataTypes } = Sequelize;

const BusDetails = db.define(
  "bus_details",
  {
    busId: {
      type: DataTypes.INTEGER,
      allowNullL: false,
      validate: {
        notEmpty: true,
      },
    },
    departure_point: {
      type: DataTypes.STRING(20),
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    destination_point: {
      type: DataTypes.STRING(20),
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    departure_time: {
      type: DataTypes.STRING(20),
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    total_seats: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  },
  {
    freezeTableName: true,
  }
);

Bus.hasMany(BusDetails);
BusDetails.belongsTo(Bus, { foreignKey: "busId" });

export default BusDetails;

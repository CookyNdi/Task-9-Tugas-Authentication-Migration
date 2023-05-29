import { Sequelize } from "sequelize";
import db from "../configs/db.js";
import BusDetails from "./BusDetails.js";
import Tickets from "./Tickets.js";

const { DataTypes } = Sequelize;

const Seats = db.define(
  "seats",
  {
    busDetailId: {
      type: DataTypes.INTEGER,
      allowNullL: false,
      validate: {
        notEmpty: true,
      },
    },
    ticketId: {
      type: DataTypes.INTEGER,
      allowNullL: false,
      validate: {
        notEmpty: true,
      },
    },
    seat_order: {
      type: DataTypes.STRING(4),
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

BusDetails.hasMany(Seats);
Seats.belongsTo(BusDetails, { foreignKey: "busDetailId" });
Tickets.hasMany(Seats);
Seats.belongsTo(Tickets, { foreignKey: "ticketId" });

export default Seats;

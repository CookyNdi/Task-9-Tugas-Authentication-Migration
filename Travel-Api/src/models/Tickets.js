import { Sequelize } from "sequelize";
import db from "../configs/db.js";
import BusDetails from "./BusDetails.js";
import Users from "./Users.js";

const { DataTypes } = Sequelize;

const Tickets = db.define(
  "tickets",
  {
    uuid: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    busDetailId: {
      type: DataTypes.INTEGER,
      allowNullL: false,
      validate: {
        notEmpty: true,
      },
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    name_traveler: {
      type: DataTypes.STRING(100),
      allowNullL: false,
      validate: {
        notEmpty: true,
        len: [3, 100],
      },
    },
    total_amount: {
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

BusDetails.hasMany(Tickets);
Tickets.belongsTo(BusDetails, { foreignKey: "busDetailId" });
Users.hasMany(Tickets);
Tickets.belongsTo(Users, { foreignKey: "userId" });

export default Tickets;

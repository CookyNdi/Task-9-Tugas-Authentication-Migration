import { Sequelize } from "sequelize";
import db from "../configs/db.js";
import Tickets from "./Tickets.js";

const { DataTypes } = Sequelize;

const Transactions = db.define(
  "transactions",
  {
    no_order: {
      type: DataTypes.STRING(20),
      allowNull: false,
      primaryKey: true,
      autoIncrement: false,
      validate: {
        notEmpty: true,
      },
    },
    ticketId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    status: {
      type: DataTypes.STRING(10),
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    payment_method: {
      type: DataTypes.STRING(20),
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

Tickets.hasMany(Transactions);
Transactions.belongsTo(Tickets, { foreignKey: "ticketId" });

export default Transactions;

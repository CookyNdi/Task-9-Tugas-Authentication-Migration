import { Sequelize } from "sequelize";
import db from "../configs/db.js";

const { DataTypes } = Sequelize;

const Bus = db.define(
  "bus",
  {
    name: {
      type: DataTypes.STRING(20),
      allowNullL: false,
      validate: {
        notEmpty: true,
      },
    },
    brand: {
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

export default Bus;

import { Sequelize } from "sequelize";
import db from "../configs/db.js";

const { DataTypes } = Sequelize;

const Users = db.define(
  "users",
  {
    name: {
      type: DataTypes.STRING(100),
      allowNullL: false,
      validate: {
        notEmpty: true,
        len: [3, 100],
      },
    },
    email: {
      type: DataTypes.STRING(100),
      allowNullL: false,
      unique: true,
      validate: {
        notEmpty: true,
        isEmail: true,
      },
    },
    gender: {
      type: DataTypes.STRING(6),
      allowNullL: false,
      validate: {
        notEmpty: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    phone_number: {
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

export default Users;

import { Sequelize } from "sequelize";

const db = new Sequelize("travel_db", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

export default db;

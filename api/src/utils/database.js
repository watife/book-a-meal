import Sequelize from "sequelize";
import { config } from "dotenv";

config();

const sequelize = new Sequelize(
  process.env.DATABASE_URL,
  process.env.DATABASE_USER,
  "",
  {
    dialect: "postgres",
    logging: false
  }
);

export default sequelize;

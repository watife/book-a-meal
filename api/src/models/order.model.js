import Sequelize from "sequelize";
import sequelize from "../utils/database";

const OrderMeal = sequelize.define("orders", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  total: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  deliveryStatus: {
    type: Sequelize.STRING,
    defaultValue: "pending"
  },
  billingAddress: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  createdAt: Sequelize.DATEONLY,
  updatedAt: Sequelize.DATEONLY
});

export default OrderMeal;

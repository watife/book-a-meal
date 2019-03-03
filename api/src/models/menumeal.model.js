import Sequelize from "sequelize";
import sequelize from "../utils/database";

const MenuMeal = sequelize.define("menu_meals", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  mealId: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  menuId: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  createdAt: Sequelize.DATEONLY,
  updatedAt: Sequelize.DATEONLY
});

export default MenuMeal;

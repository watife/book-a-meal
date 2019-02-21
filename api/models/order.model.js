export default (sequelize, DataTypes) => {
  const Order = sequelize.define(
    "Order",
    {
      meal_id: DataTypes.INTEGER,
      customer_id: DataTypes.INTEGER,
      menu_id: DataTypes.INTEGER,
      date: DataTypes.DATE
    },
    {}
  );
  Order.associate = models => {
    // associations can be defined here
    Order.belongTo(models.Meal, {
      foreignKey: "meal_id"
    });

    Order.belongTo(models.Customer, {
      foreignKey: "customer_id"
    });

    Order.belongTo(models.Menu, {
      foreignKey: "menu_id"
    });
  };
  return Order;
};

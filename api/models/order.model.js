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
    Order.belongsTo(models.Meal, {
      foreignKey: "meal_id"
    });

    Order.belongsTo(models.Customer, {
      foreignKey: "customer_id"
    });

    Order.belongsTo(models.Menu, {
      foreignKey: "menu_id"
    });
  };
  return Order;
};

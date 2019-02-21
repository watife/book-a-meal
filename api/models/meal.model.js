export default (sequelize, DataTypes) => {
  const Meal = sequelize.define(
    "Meal",
    {
      name: DataTypes.STRING,
      size: DataTypes.STRING,
      price: DataTypes.INTEGER
    },
    {}
  );
  Meal.associate = models => {
    // associations can be defined here

    Meal.hasMany(models.Category, {
      foreignKey: "meal_id"
    });

    Meal.hasMany(models.Menu, {
      foreignKey: "meal_id"
    });

    Meal.hasMany(models.Order, {
      foreignKey: "meal_id"
    });
  };
  return Meal;
};

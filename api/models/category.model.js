export default (sequelize, DataTypes) => {
  const Category = sequelize.define(
    "Category",
    {
      name: DataTypes.STRING,
      meal_id: DataTypes.INTEGER,
      date: DataTypes.DATE
    },
    {}
  );
  Category.associate = models => {
    // associations can be defined here
    Category.belongTo(models.Meal, {
      foreignKey: "meal_id"
    });
  };
  return Category;
};

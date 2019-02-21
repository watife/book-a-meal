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
    Category.belongsTo(models.Meal, {
      foreignKey: "meal_id"
    });
  };
  return Category;
};

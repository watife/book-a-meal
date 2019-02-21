export default (sequelize, DataTypes) => {
  const Menu = sequelize.define(
    "Menu",
    {
      meal_id: DataTypes.INTEGER,
      admin_id: DataTypes.INTEGER,
      date: DataTypes.DATE,
      name: DataTypes.STRING
    },
    {}
  );
  Menu.associate = models => {
    // associations can be defined here

    Menu.hasMany(models.Admin, {
      foreignKey: "admin_id"
    });

    Menu.belongTo(models.Meal, {
      foreignKey: "meal_id"
    });

    Menu.hasMany(models.Order, {
      foreignKey: "menu_id"
    });
  };
  return Menu;
};

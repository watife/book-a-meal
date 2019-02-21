export default (sequelize, DataTypes) => {
  const Admin = sequelize.define(
    "Admin",
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING
    },
    {}
  );
  Admin.associate = models => {
    // associations can be defined here
    Admin.belongTo(models.Menu, {
      foreignKey: "admin_id"
    });
  };
  return Admin;
};

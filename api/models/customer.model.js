export default (sequelize, DataTypes) => {
  const Customer = sequelize.define(
    "Customer",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: {
          args: false,
          msg: "Please enter your name"
        }
      },
      email: {
        type: DataTypes.STRING,
        allowNull: {
          args: false,
          msg: "Please enter your email address"
        },
        unique: {
          args: true,
          msg: "Email already exists"
        },
        validate: {
          isEmail: {
            args: true,
            msg: "Please enter a valid email address"
          }
        }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: {
          args: false,
          msg: "Please enter a password"
        },
        validate: {
          isNotShort: value => {
            if (value.length < 8) {
              throw new Error("Password should be at least 8 characters");
            }
          }
        }
      }
    },
    {}
  );
  Customer.associate = models => {
    // associations can be defined here
    Customer.hasMany(models.Order, {
      foreignKey: "customer_id"
    });
  };
  return Customer;
};

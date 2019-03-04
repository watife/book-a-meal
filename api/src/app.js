import "@babel/polyfill";
import http from "http";
import express from "express";
import logger from "morgan";
import bodyParser from "body-parser";
import bcrypt from "bcrypt";
import { config } from "dotenv";
import sequelize from "./utils/database";

// import models
import Customer from "./models/customer.model";
import Caterer from "./models/caterer.model";
import Meal from "./models/meal.model";
import Menu from "./models/menu.model";
import Order from "./models/order.model";
import Category from "./models/category.model";

// import seeds
// import seeds from "./seeds/seed";

/*
 *
 * ROUTES FOR THE APPLICATION
 *
 */

import mealRoutes from "./routes/meal.routes";
import menuRoutes from "./routes/menu.routes";
import ordersRoutes from "./routes/order.routes";
import catererRoutes from "./routes/caterer.routes";
import customerRoutes from "./routes/customer.routes";
import categoryRoutes from "./routes/category.routes";

config();
const port = process.env.PORT || 8000;
const app = express(); // setup express application
const server = http.createServer(app);

app.use(logger("dev")); // log requests to the console

// Parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) =>
  res.status(200).send({
    message: "Welcome to the default API route"
  })
);

/*
 *
 * MODELS ASSOCIATION
 *
 */
Order.belongsTo(Customer);
Customer.hasMany(Order);
Meal.belongsTo(Caterer, { constraints: true, onDelete: "CASCADE" });
Menu.belongsTo(Caterer, { constraints: true, onDelete: "CASCADE" });
Category.hasMany(Meal, { constraints: true, onDelete: "CASCADE" });
Meal.belongsTo(Category);
Category.belongsTo(Caterer);
Caterer.hasMany(Category);
Caterer.hasMany(Menu);
Menu.belongsToMany(Meal, { through: "menu_meals" });
Order.belongsToMany(Meal, { through: "order_meals" });

const Seeds = async () => {
  try {
    const hash = await bcrypt.hash(process.env.CATERER_PASSWORD, 10);
    return Promise.all([
      Caterer.create({
        name: "boluwatife",
        email: process.env.CATERER_EMAIL,
        password: hash,
        phone: "08089333186"
      }),

      Category.create({
        name: "spagetti"
      })
    ]).then(([spagetti, boluwatife]) => {
      // return Promise.all([spagetti.setCategories(boluwatife)]);
      return spagetti.setCategories([boluwatife]);
    });
  } catch (error) {
    return console.log(error);
  }
};

sequelize
  .sync()
  .then(() => {
    console.log("DB Connection has been established");
    Caterer.findOne({ where: { id: 1 } }).then(caterer => {
      if (!caterer) {
        Seeds();
        console.log("Seeds added");
      }
    });

    server.listen(port, () => {
      console.log(`Server running at PORT: ${port}`);
    });
  })
  .catch(err => {
    console.error("Unable to connect to the database:", err);
  });

/*
 *
 * Meals Routes
 *
 */
app.use("/api/v1/meals/", mealRoutes);

/*
 *
 * Menu Routes
 *
 */
app.use("/api/v1/menu/", menuRoutes);

/*
 *
 * Orders Routes
 *
 */
app.use("/api/v1/orders/", ordersRoutes);

/*
 *
 * Admin Routes
 *
 */
app.use("/api/v1/caterer/", catererRoutes);

/*
 *
 * Customer Routes
 *
 */
app.use("/api/v1/auth/", customerRoutes);

/*
 *
 * Category Routes
 *
 */
app.use("/api/v1/category/", categoryRoutes);

export default app;

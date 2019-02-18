import http from "http";
import express from "express";
import logger from "morgan";
import bodyParser from "body-parser";

/*
 *
 * ROUTES FOR THE APPLICATION
 *
 */

import mealRoutes from "./routes/meal.routes";
import menuRoutes from "./routes/menu.routes";

const hostname = "127.0.0.1";
const port = 8000;
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

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

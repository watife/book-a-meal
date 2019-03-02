"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("@babel/polyfill");

var _http = _interopRequireDefault(require("http"));

var _express = _interopRequireDefault(require("express"));

var _morgan = _interopRequireDefault(require("morgan"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _database = _interopRequireDefault(require("./utils/database"));

var _customer = _interopRequireDefault(require("./models/customer.model"));

var _caterer = _interopRequireDefault(require("./models/caterer.model"));

var _meal = _interopRequireDefault(require("./models/meal.model"));

var _menu = _interopRequireDefault(require("./models/menu.model"));

var _order = _interopRequireDefault(require("./models/order.model"));

var _orderMeal = _interopRequireDefault(require("./models/orderMeal.model"));

var _category = _interopRequireDefault(require("./models/category.model"));

var _meal2 = _interopRequireDefault(require("./routes/meal.routes"));

var _menu2 = _interopRequireDefault(require("./routes/menu.routes"));

var _order2 = _interopRequireDefault(require("./routes/order.routes"));

var _caterer2 = _interopRequireDefault(require("./routes/caterer.routes"));

var _customer2 = _interopRequireDefault(require("./routes/customer.routes"));

var _category2 = _interopRequireDefault(require("./routes/category.routes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import models

/*
 *
 * ROUTES FOR THE APPLICATION
 *
 */
var hostname = "127.0.0.1";
var port = process.env.PORT || 8000;
var app = (0, _express.default)(); // setup express application

var server = _http.default.createServer(app);

app.use((0, _morgan.default)("dev")); // log requests to the console
// Parse incoming requests data

app.use(_bodyParser.default.json());
app.use(_bodyParser.default.urlencoded({
  extended: false
}));
app.get("/", function (req, res) {
  return res.status(200).send({
    message: "Welcome to the default API route"
  });
});
/*
 *
 * MODELS ASSOCIATION
 *
 */

_customer.default.hasMany(_order.default, {
  constraints: true,
  onDelete: "CASCADE"
});

_customer.default.hasMany(_orderMeal.default, {
  constraints: true,
  onDelete: "CASCADE"
});

_order.default.belongsTo(_caterer.default, {
  constraints: true,
  onDelete: "CASCADE"
});

_meal.default.belongsTo(_caterer.default, {
  constraints: true,
  onDelete: "CASCADE"
});

_menu.default.belongsTo(_caterer.default, {
  constraints: true,
  onDelete: "CASCADE"
});

_orderMeal.default.belongsTo(_meal.default, {
  constraints: true,
  onDelete: "CASCADE"
});

_category.default.hasMany(_meal.default, {
  constraints: true,
  onDelete: "CASCADE"
});

_meal.default.belongsTo(_category.default);

_caterer.default.hasMany(_order.default);

_caterer.default.hasMany(_menu.default);

_database.default.sync().then(function () {
  console.log("DB Connection has been established");
  server.listen(port, hostname, function () {
    console.log("Server running at http://".concat(hostname, ":").concat(port, "/"));
  });
}).catch(function (err) {
  console.error("Unable to connect to the database:", err);
});
/*
 *
 * Meals Routes
 *
 */


app.use("/api/v1/meals/", _meal2.default);
/*
 *
 * Menu Routes
 *
 */

app.use("/api/v1/menu/", _menu2.default);
/*
 *
 * Orders Routes
 *
 */

app.use("/api/v1/orders/", _order2.default);
/*
 *
 * Admin Routes
 *
 */

app.use("/api/v1/caterer/", _caterer2.default);
/*
 *
 * Customer Routes
 *
 */

app.use("/api/v1/customer/", _customer2.default);
/*
 *
 * Category Routes
 *
 */

app.use("/api/v1/category/", _category2.default);
var _default = app;
exports.default = _default;
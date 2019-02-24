"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _http = _interopRequireDefault(require("http"));

var _express = _interopRequireDefault(require("express"));

var _morgan = _interopRequireDefault(require("morgan"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _meal = _interopRequireDefault(require("./routes/meal.routes"));

var _menu = _interopRequireDefault(require("./routes/menu.routes"));

var _order = _interopRequireDefault(require("./routes/order.routes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 *
 * ROUTES FOR THE APPLICATION
 *
 */
var app = (0, _express.default)(); // setup express application

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
 * Meals Routes
 *
 */

app.use("/api/v1/meals/", _meal.default);
/*
 *
 * Menu Routes
 *
 */

app.use("/api/v1/menu/", _menu.default);
/*
 *
 * Orders Routes
 *
 */

app.use("/api/v1/orders/", _order.default);
var port = process.env.PORT || 5000;
app.listen(port, function () {
  console.log("Server running at ".concat(port));
});
var _default = app;
exports.default = _default;
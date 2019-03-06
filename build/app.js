"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("@babel/polyfill");

var _express = _interopRequireDefault(require("express"));

var _morgan = _interopRequireDefault(require("morgan"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _cors = _interopRequireDefault(require("cors"));

var _swaggerUiExpress = _interopRequireDefault(require("swagger-ui-express"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _dotenv = require("dotenv");

var _database = _interopRequireDefault(require("./utils/database"));

var _customer = _interopRequireDefault(require("./models/customer.model"));

var _caterer = _interopRequireDefault(require("./models/caterer.model"));

var _meal = _interopRequireDefault(require("./models/meal.model"));

var _menu = _interopRequireDefault(require("./models/menu.model"));

var _order = _interopRequireDefault(require("./models/order.model"));

var _category = _interopRequireDefault(require("./models/category.model"));

var _meal2 = _interopRequireDefault(require("./routes/meal.routes"));

var _menu2 = _interopRequireDefault(require("./routes/menu.routes"));

var _order2 = _interopRequireDefault(require("./routes/order.routes"));

var _caterer2 = _interopRequireDefault(require("./routes/caterer.routes"));

var _customer2 = _interopRequireDefault(require("./routes/customer.routes"));

var _category2 = _interopRequireDefault(require("./routes/category.routes"));

var _swagger = _interopRequireDefault(require("./swagger.json"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

(0, _dotenv.config)();
var port = process.env.PORT || 5432;
var app = (0, _express.default)(); // setup express application

app.use((0, _cors.default)());
app.use((0, _morgan.default)("dev")); // log requests to the console

app.use("/api-docs", _swaggerUiExpress.default.serve, _swaggerUiExpress.default.setup(_swagger.default)); // Parse incoming requests data

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

_order.default.belongsTo(_customer.default);

_customer.default.hasMany(_order.default);

_meal.default.belongsTo(_caterer.default, {
  constraints: true,
  onDelete: "CASCADE"
});

_menu.default.belongsTo(_caterer.default, {
  constraints: true,
  onDelete: "CASCADE"
});

_category.default.hasMany(_meal.default, {
  constraints: true,
  onDelete: "CASCADE"
});

_meal.default.belongsTo(_category.default);

_category.default.belongsTo(_caterer.default);

_caterer.default.hasMany(_category.default);

_caterer.default.hasMany(_menu.default);

_menu.default.belongsToMany(_meal.default, {
  through: "menu_meals"
});

_order.default.belongsToMany(_meal.default, {
  through: "order_meals"
});

var Seeds =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee() {
    var hash;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _bcrypt.default.hash(process.env.CATERER_PASSWORD, 10);

          case 3:
            hash = _context.sent;
            return _context.abrupt("return", Promise.all([_caterer.default.create({
              name: "boluwatife",
              email: process.env.CATERER_EMAIL,
              password: hash,
              phone: "08089333186"
            }), _category.default.create({
              name: "spagetti"
            })]).then(function (_ref2) {
              var _ref3 = _slicedToArray(_ref2, 2),
                  spagetti = _ref3[0],
                  boluwatife = _ref3[1];

              // return Promise.all([spagetti.setCategories(boluwatife)]);
              return spagetti.setCategories([boluwatife]);
            }));

          case 7:
            _context.prev = 7;
            _context.t0 = _context["catch"](0);
            return _context.abrupt("return", console.log(_context.t0));

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this, [[0, 7]]);
  }));

  return function Seeds() {
    return _ref.apply(this, arguments);
  };
}();

_database.default.sync().then(function () {
  console.log("DB Connection has been established on port ".concat(port));
  app.listen(port, null, null, function () {
    app.emit("dbConnected");

    _caterer.default.findOne({
      where: {
        id: 1
      }
    }).then(function (caterer) {
      if (!caterer) {
        Seeds();
        console.log("Seeds added");
      }
    });
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

app.use("/api/v1/auth/", _customer2.default);
/*
 *
 * Category Routes
 *
 */

app.use("/api/v1/category/", _category2.default);
var _default = app;
exports.default = _default;
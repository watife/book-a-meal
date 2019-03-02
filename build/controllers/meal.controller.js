"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _meal = _interopRequireDefault(require("../models/meal.model"));

var _category = _interopRequireDefault(require("../models/category.model"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var MealController =
/*#__PURE__*/
function () {
  function MealController() {
    _classCallCheck(this, MealController);
  }

  _createClass(MealController, null, [{
    key: "fetchAllMeals",

    /*
     *
     * controller to get all Meals
     * required: none
     *
     */
    value: function () {
      var _fetchAllMeals = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(req, res) {
        var meals;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return _meal.default.findAll();

              case 3:
                meals = _context.sent;

                if (meals[0]) {
                  _context.next = 6;
                  break;
                }

                throw new Error("No Meal was found");

              case 6:
                return _context.abrupt("return", res.status(200).json({
                  status: "success",
                  Meals: meals
                }));

              case 9:
                _context.prev = 9;
                _context.t0 = _context["catch"](0);
                return _context.abrupt("return", res.status(400).json({
                  status: "error",
                  message: _context.t0.message
                }));

              case 12:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[0, 9]]);
      }));

      function fetchAllMeals(_x, _x2) {
        return _fetchAllMeals.apply(this, arguments);
      }

      return fetchAllMeals;
    }()
    /*
     *
     * controller to add a single Meal
     * required: name, price, quantity, imageUrl
     *
     */

  }, {
    key: "addAMeal",
    value: function () {
      var _addAMeal = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(req, res) {
        var _req$body, name, price, quantity, imageUrl, categoryId, category, meal;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                _req$body = req.body, name = _req$body.name, price = _req$body.price, quantity = _req$body.quantity, imageUrl = _req$body.imageUrl, categoryId = _req$body.categoryId;
                _context2.next = 4;
                return _category.default.findById(categoryId);

              case 4:
                category = _context2.sent;

                if (category) {
                  _context2.next = 7;
                  break;
                }

                throw new Error("the selected category not found");

              case 7:
                _context2.next = 9;
                return _meal.default.create({
                  name: name,
                  price: price,
                  imageUrl: imageUrl,
                  quantity: quantity,
                  categoryId: categoryId,
                  catererId: req.caterer.id
                });

              case 9:
                meal = _context2.sent;
                return _context2.abrupt("return", res.status(201).json({
                  status: "success",
                  message: "Meal Added successfully",
                  data: {
                    id: meal.id,
                    name: meal.name,
                    price: meal.price,
                    quantity: meal.quantity,
                    imageUrl: meal.imageUrl
                  }
                }));

              case 13:
                _context2.prev = 13;
                _context2.t0 = _context2["catch"](0);
                return _context2.abrupt("return", res.status(400).json({
                  status: "error",
                  message: _context2.t0.message
                }));

              case 16:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this, [[0, 13]]);
      }));

      function addAMeal(_x3, _x4) {
        return _addAMeal.apply(this, arguments);
      }

      return addAMeal;
    }()
    /*
     *
     * controller to get a single Meal
     * required: mealId
     *
     */

  }, {
    key: "getSingleMeal",
    value: function () {
      var _getSingleMeal = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(req, res) {
        var id, meal;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                id = req.params.id;
                _context3.next = 4;
                return _meal.default.findById(id);

              case 4:
                meal = _context3.sent;

                if (meal) {
                  _context3.next = 7;
                  break;
                }

                throw new Error("Meal specified not found");

              case 7:
                return _context3.abrupt("return", res.status(200).json({
                  status: "success",
                  message: "Meal retrieved successfully",
                  data: {
                    meal: meal
                  }
                }));

              case 10:
                _context3.prev = 10;
                _context3.t0 = _context3["catch"](0);
                return _context3.abrupt("return", res.status(400).json({
                  status: "error",
                  meal: _context3.t0.message
                }));

              case 13:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this, [[0, 10]]);
      }));

      function getSingleMeal(_x5, _x6) {
        return _getSingleMeal.apply(this, arguments);
      }

      return getSingleMeal;
    }()
    /*
     *
     * controller to get a single Meal
     * required: mealId
     *
     */

  }, {
    key: "modifyMeal",
    value: function () {
      var _modifyMeal = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4(req, res) {
        var id, body, meal, mealUpdateData, name, price, quantity, imageUrl;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.prev = 0;
                id = req.params.id;
                body = req.body.body;
                _context4.next = 5;
                return _meal.default.findById(id);

              case 5:
                meal = _context4.sent;
                mealUpdateData = {
                  name: body.name ? body.name : meal.name,
                  price: body.price ? body.price : meal.price,
                  quantity: body.quantity ? body.quantity : meal.quantity,
                  categoryId: body.categoryId ? body.categoryId : meal.categoryId,
                  imageUrl: body.imageUrl ? body.imageUrl : meal.imageUrl
                };
                name = mealUpdateData.name, price = mealUpdateData.price, quantity = mealUpdateData.quantity, imageUrl = mealUpdateData.imageUrl;
                _context4.next = 10;
                return _meal.default.update({
                  name: name,
                  price: price,
                  quantity: quantity,
                  imageUrl: imageUrl
                }, {
                  where: {
                    id: id
                  }
                });

              case 10:
                return _context4.abrupt("return", res.status(200).json({
                  status: "success",
                  message: "Meal successfully Updated"
                }));

              case 13:
                _context4.prev = 13;
                _context4.t0 = _context4["catch"](0);
                return _context4.abrupt("return", res.status(400).json({
                  status: "error",
                  meal: _context4.t0.message
                }));

              case 16:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this, [[0, 13]]);
      }));

      function modifyMeal(_x7, _x8) {
        return _modifyMeal.apply(this, arguments);
      }

      return modifyMeal;
    }()
    /*
     *
     * controller to delete a single Meal
     * required: mealId
     *
     */

  }, {
    key: "deleteSingleMeal",
    value: function () {
      var _deleteSingleMeal = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee5(req, res) {
        var id, meal;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.prev = 0;
                id = req.params.id;
                _context5.next = 4;
                return _meal.default.destroy({
                  where: {
                    id: id
                  }
                });

              case 4:
                meal = _context5.sent;

                if (meal) {
                  _context5.next = 7;
                  break;
                }

                throw new Error("could not delete the specified meal");

              case 7:
                return _context5.abrupt("return", res.status(200).json({
                  status: "success",
                  meal: "meal deleted successfully"
                }));

              case 10:
                _context5.prev = 10;
                _context5.t0 = _context5["catch"](0);
                return _context5.abrupt("return", res.status(400).json({
                  status: "error",
                  message: _context5.t0.message
                }));

              case 13:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this, [[0, 10]]);
      }));

      function deleteSingleMeal(_x9, _x10) {
        return _deleteSingleMeal.apply(this, arguments);
      }

      return deleteSingleMeal;
    }()
  }]);

  return MealController;
}();

var _default = MealController;
exports.default = _default;
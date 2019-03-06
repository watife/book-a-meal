"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _order = _interopRequireDefault(require("../models/order.model"));

var _meal = _interopRequireDefault(require("../models/meal.model"));

var _orderMeal = _interopRequireDefault(require("../models/orderMeal.model"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var OrderController =
/*#__PURE__*/
function () {
  function OrderController() {
    _classCallCheck(this, OrderController);
  }

  _createClass(OrderController, null, [{
    key: "fetchAllOrders",

    /*
     *
     * controller to get all Order history
     * required: none
     *
     */
    value: function () {
      var _fetchAllOrders = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(req, res) {
        var orders;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return _order.default.findAll();

              case 3:
                orders = _context.sent;

                if (orders[0]) {
                  _context.next = 6;
                  break;
                }

                throw new Error("No Order was found");

              case 6:
                return _context.abrupt("return", res.status(200).json({
                  status: "success",
                  orders: orders
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

      function fetchAllOrders(_x, _x2) {
        return _fetchAllOrders.apply(this, arguments);
      }

      return fetchAllOrders;
    }()
    /*
     *
     * controller to add a single Order
     * required: mealId, quantity, billingAddress
     *
     */

  }, {
    key: "addOrder",
    value: function () {
      var _addOrder = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(req, res) {
        var _req$body, mealId, quantity, billingAddress, orderCheck, findMeal, total, order;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                _req$body = req.body, mealId = _req$body.mealId, quantity = _req$body.quantity, billingAddress = _req$body.billingAddress; // make sure the order doesn't exist already

                _context2.next = 4;
                return _orderMeal.default.findOne({
                  where: {
                    mealId: mealId,
                    customerId: req.customer.id
                  }
                });

              case 4:
                orderCheck = _context2.sent;

                if (!orderCheck) {
                  _context2.next = 7;
                  break;
                }

                throw new Error("This order have already been placed and is on it's way");

              case 7:
                _context2.next = 9;
                return _meal.default.findOne({
                  where: {
                    id: mealId
                  }
                });

              case 9:
                findMeal = _context2.sent;

                if (findMeal) {
                  _context2.next = 12;
                  break;
                }

                throw new Error("the selected was meal not found");

              case 12:
                // create the total for the Order
                total = findMeal.price * parseInt(quantity, 10);
                _context2.next = 15;
                return _order.default.create({
                  quantity: quantity,
                  total: total,
                  billingAddress: billingAddress,
                  customerId: req.customer.id
                });

              case 15:
                order = _context2.sent;
                _context2.next = 18;
                return _orderMeal.default.create({
                  mealId: mealId,
                  orderId: order.id,
                  customerId: req.customer.id
                });

              case 18:
                return _context2.abrupt("return", res.status(201).json({
                  status: "success",
                  message: "Order successfully placed."
                }));

              case 21:
                _context2.prev = 21;
                _context2.t0 = _context2["catch"](0);
                return _context2.abrupt("return", res.status(400).json({
                  status: "error",
                  message: _context2.t0.message
                }));

              case 24:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this, [[0, 21]]);
      }));

      function addOrder(_x3, _x4) {
        return _addOrder.apply(this, arguments);
      }

      return addOrder;
    }()
    /*
     *
     * controller to get a single Order
     * required: orderId, customerId
     *
     */

  }, {
    key: "fetchUserOrders",
    value: function () {
      var _fetchUserOrders = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(req, res) {
        var id, order, orderData;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                id = req.params.id;
                _context3.next = 4;
                return _order.default.findOne({
                  where: {
                    id: id
                  }
                });

              case 4:
                order = _context3.sent;

                if (order) {
                  _context3.next = 7;
                  break;
                }

                throw new Error("Order specified not found");

              case 7:
                _context3.next = 9;
                return _order.default.find({
                  include: [{
                    model: _meal.default,
                    as: "meals",
                    required: true
                  }],
                  where: {
                    id: id
                  }
                });

              case 9:
                orderData = _context3.sent;
                return _context3.abrupt("return", res.status(200).json({
                  status: "success",
                  message: "Order retrieved successfully",
                  order: orderData
                }));

              case 13:
                _context3.prev = 13;
                _context3.t0 = _context3["catch"](0);
                return _context3.abrupt("return", res.status(400).json({
                  status: "error",
                  meal: _context3.t0.message
                }));

              case 16:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this, [[0, 13]]);
      }));

      function fetchUserOrders(_x5, _x6) {
        return _fetchUserOrders.apply(this, arguments);
      }

      return fetchUserOrders;
    }()
    /*
     *
     * controller to UPDATE a single Order
     * required: orderId, update params
     *
     */

  }, {
    key: "modifyOrder",
    value: function () {
      var _modifyOrder = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4(req, res) {
        var id, body, order, orderMeal, meal, orderUpdateData, newTotal, quantity, billingAddress, total, newMealId;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.prev = 0;
                id = req.params.id;
                body = _objectSpread({}, req.body);
                _context4.next = 5;
                return _order.default.findByPk(id);

              case 5:
                order = _context4.sent;
                _context4.next = 8;
                return _orderMeal.default.findOne({
                  where: {
                    orderId: id,
                    customerId: req.customer.id
                  }
                });

              case 8:
                orderMeal = _context4.sent;
                _context4.next = 11;
                return _meal.default.findOne({
                  where: {
                    id: body.mealId
                  }
                });

              case 11:
                meal = _context4.sent;

                if (!(!order && !orderMeal)) {
                  _context4.next = 14;
                  break;
                }

                throw new Error("the specified order was not found");

              case 14:
                orderUpdateData = {
                  quantity: body.quantity ? body.quantity : order.quantity,
                  billingAddress: body.billingAddress ? body.billingAddress : order.billingAddress,
                  total: order.total
                };

                if (orderUpdateData.quantity !== order.quantity) {
                  newTotal = orderUpdateData.quantity * meal.price;
                  orderUpdateData.total = newTotal;
                }

                quantity = orderUpdateData.quantity, billingAddress = orderUpdateData.billingAddress, total = orderUpdateData.total;
                _context4.next = 19;
                return _order.default.update({
                  quantity: quantity,
                  billingAddress: billingAddress,
                  total: total
                }, {
                  where: {
                    id: id
                  }
                });

              case 19:
                // change the mealId if is it available
                newMealId = body.mealId !== orderMeal.mealId ? body.mealId : orderMeal.mealId;
                _context4.next = 22;
                return _orderMeal.default.update({
                  mealId: newMealId
                }, {
                  where: {
                    orderId: id,
                    customerId: req.customer.id
                  }
                });

              case 22:
                return _context4.abrupt("return", res.status(200).json({
                  status: "success",
                  message: "Order successfully Updated"
                }));

              case 25:
                _context4.prev = 25;
                _context4.t0 = _context4["catch"](0);
                return _context4.abrupt("return", res.status(400).json({
                  status: "error",
                  meal: _context4.t0.message
                }));

              case 28:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this, [[0, 25]]);
      }));

      function modifyOrder(_x7, _x8) {
        return _modifyOrder.apply(this, arguments);
      }

      return modifyOrder;
    }()
    /*
     * controller to UPDATE a single Order delivery status by ADMIN
     * required: orderId,  delivery status
     *
     */

  }, {
    key: "updateStatus",
    value: function () {
      var _updateStatus = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee5(req, res) {
        var id, deliveryStatus;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.prev = 0;
                id = req.params.id;
                deliveryStatus = req.body.deliveryStatus; // modify the deliveryStatus with the new one

                _context5.next = 5;
                return _order.default.update({
                  deliveryStatus: deliveryStatus
                }, {
                  where: {
                    id: id
                  }
                });

              case 5:
                return _context5.abrupt("return", res.status(200).json({
                  status: "success",
                  message: "Order status successfully Updated"
                }));

              case 8:
                _context5.prev = 8;
                _context5.t0 = _context5["catch"](0);
                return _context5.abrupt("return", res.status(400).json({
                  status: "error",
                  message: _context5.t0.message
                }));

              case 11:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this, [[0, 8]]);
      }));

      function updateStatus(_x9, _x10) {
        return _updateStatus.apply(this, arguments);
      }

      return updateStatus;
    }()
    /*
     *
     * controller to cancel a single Order
     * required: mealId
     *
     */

  }]);

  return OrderController;
}();

var _default = OrderController;
exports.default = _default;
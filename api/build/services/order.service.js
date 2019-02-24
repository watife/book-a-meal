"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _dummyData = _interopRequireDefault(require("../utils/dummyData"));

var _order = _interopRequireDefault(require("../models/order.model"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var OrderService = {
  getUserOrders: function getUserOrders(id) {
    /*
     * required: userid.
     */
    var userOrders = _dummyData.default.order.filter(function (order) {
      return order.userId.toString() === id;
    });

    return userOrders;
  },
  getAllOrders: function getAllOrders() {
    /*
     * required: none.
     */
    var orders = _dummyData.default.order.map(function (order) {
      var newOrder = new _order.default();
      newOrder.id = order.id;
      newOrder.day = order.day;
      newOrder.userId = order.userId;
      newOrder.meals = order.meals;
      return newOrder;
    });

    return orders;
  },
  modifyOrder: function modifyOrder(id, data) {
    /*
     * required: order id and data.
     */
    var order = _dummyData.default.order;
    var foundOrder = order.find(function (eachOrder) {
      return eachOrder.id.toString() === id;
    });
    foundOrder.meals = data.meals;
    return foundOrder;
  },
  addOrder: function addOrder(order) {
    /*
     * required: meal and User.
     */
    var orderData = _objectSpread({}, order);

    var orderLength = _dummyData.default.order.length;
    var lastId = _dummyData.default.order[orderLength - 1].id;
    var newId = lastId + 1; // const checkedUserOrders = dummyData.order.find(
    //   eachOrder => eachOrder.userId === orderData.userId
    // );

    orderData.id = newId;
    orderData.date = Date.now();

    _dummyData.default.order.push(orderData);

    return orderData;
  }
};
var _default = OrderService;
exports.default = _default;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _order = _interopRequireDefault(require("../services/order.service"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var OrderController = {
  fetchUserOrders: function fetchUserOrders(req, res) {
    var params = _objectSpread({}, req.params);

    var userOrders = _order.default.getUserOrders(params.id);

    res.status(200).json({
      status: "success",
      data: userOrders
    });
  },
  fetchAllOrders: function fetchAllOrders(req, res) {
    var allOrders = _order.default.getAllOrders();

    res.status(200).json({
      status: "success",
      data: allOrders
    });
  },
  addOrder: function addOrder(req, res) {
    var body = _objectSpread({}, req.body);

    var addedOrder = _order.default.addOrder(body);

    res.status(201).json({
      status: "success",
      data: addedOrder
    });
  },
  modifyOrder: function modifyOrder(req, res) {
    var body = _objectSpread({}, req.body);

    var params = _objectSpread({}, req.params);

    var modifiedOrder = _order.default.modifyOrder(params.id, body);

    res.status(200).json({
      status: "success",
      data: modifiedOrder
    });
  }
};
var _default = OrderController;
exports.default = _default;
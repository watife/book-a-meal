"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _order = _interopRequireDefault(require("../controllers/order.controller"));

var _authentication = _interopRequireDefault(require("../middlewares/authentication"));

var _order2 = _interopRequireDefault(require("../middlewares/order.middleware"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// controllers
// import AuthController from "../middlewares/authentication";
var router = (0, _express.Router)();
router.get("/:id", _authentication.default.verifyUserToken, _order.default.fetchUserOrders);
router.get("/", _order.default.fetchAllOrders);
router.post("/", _order2.default.validateOrder, _authentication.default.verifyUserToken, _order.default.addOrder);
router.put("/:id", _order2.default.validateOrderUpdate, _authentication.default.verifyUserToken, _order.default.modifyOrder);
router.put("/status/:id", _authentication.default.verifyAdminToken, _order.default.updateStatus); // AuthController.verifyAdminToken

var _default = router;
exports.default = _default;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _customer = _interopRequireDefault(require("../controllers/customer.controller"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// controllers
var router = (0, _express.Router)();
router.post("/signup", _customer.default.customerRegister);
router.post("/login", _customer.default.customerLogin);
router.get("/:id", _customer.default.getCustomer); // router.get("/", CustomerController.getAllCaterer);
// router.put("/:id", CustomerController.modifyCaterer);
// router.delete("/:id", CustomerController.deleteCaterer);

var _default = router;
exports.default = _default;
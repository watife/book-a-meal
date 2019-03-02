"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _menu = _interopRequireDefault(require("../controllers/menu.controller"));

var _authentication = _interopRequireDefault(require("../middlewares/authentication"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// controllers
console.log(_menu.default);
console.log(_authentication.default);
var router = (0, _express.Router)();
router.get("/", _authentication.default.verifyDoubleToken, _menu.default.getTodayMenu);
router.get("/history", _authentication.default.verifyAdminToken, _menu.default.fetchAllMenu);
router.post("/", _authentication.default.verifyAdminToken, _menu.default.addTodayMenu); // router.put("/", AuthController.verifyAdminToken, MenuController.modifyMenu);

var _default = router;
exports.default = _default;
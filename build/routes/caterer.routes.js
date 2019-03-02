"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _caterer = _interopRequireDefault(require("../controllers/caterer.controller"));

var _authvalidate = _interopRequireDefault(require("../middlewares/authvalidate.middleware"));

var _authentication = _interopRequireDefault(require("../middlewares/authentication"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// controllers
// import validations
var router = (0, _express.Router)();
router.post("/", _authvalidate.default.validateRegister, //   AuthController.verifyAdminToken,
_caterer.default.catererRegister);
router.post("/login", _authvalidate.default.validateLogin, _caterer.default.catererLogin);
router.get("/:id", _authentication.default.verifyAdminToken, _caterer.default.getCaterer);
router.get("/", _authentication.default.verifyAdminToken, _caterer.default.getAllCaterer);
router.put("/:id", _authentication.default.verifyAdminToken, _caterer.default.modifyCaterer);
router.delete("/:id", _authentication.default.verifyAdminToken, _caterer.default.deleteCaterer);
var _default = router;
exports.default = _default;
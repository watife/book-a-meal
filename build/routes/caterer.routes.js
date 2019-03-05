"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _caterer = _interopRequireDefault(require("../controllers/caterer.controller"));

var _authvalidate = _interopRequireDefault(require("../middlewares/authvalidate.middleware"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// controllers
// import validations
// import AuthController from "../middlewares/authentication";
var router = (0, _express.Router)();
router.post("/", _authvalidate.default.validateRegister, //   AuthController.verifyAdminToken,
_caterer.default.catererRegister);
router.post("/login", _authvalidate.default.validateLogin, _caterer.default.catererLogin); // router.get(
//   "/:id",
//   AuthController.verifyAdminToken,
//   CatererController.getCaterer
// );
// router.get(
//   "/",
//   AuthController.verifyAdminToken,
//   CatererController.getAllCaterer
// );
// router.put(
//   "/:id",
//   AuthController.verifyAdminToken,
//   CatererController.modifyCaterer
// );
// router.delete(
//   "/:id",
//   AuthController.verifyAdminToken,
//   CatererController.deleteCaterer
// );

var _default = router;
exports.default = _default;
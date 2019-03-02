"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _meal = _interopRequireDefault(require("../controllers/meal.controller"));

var _authentication = _interopRequireDefault(require("../middlewares/authentication"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// controllers
var router = (0, _express.Router)();
router.get("/", _authentication.default.verifyAdminToken, _meal.default.fetchAllMeals);
router.get("/:id", _authentication.default.verifyAdminToken, _meal.default.getSingleMeal);
router.post("/", _authentication.default.verifyAdminToken, _meal.default.addAMeal);
router.put("/:id", _authentication.default.verifyAdminToken, _meal.default.modifyMeal);
router.delete("/:id", _authentication.default.verifyAdminToken, _meal.default.deleteSingleMeal);
var _default = router;
exports.default = _default;
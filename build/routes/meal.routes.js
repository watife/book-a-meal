"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _meal = _interopRequireDefault(require("../controllers/meal.controller"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// controllers
var router = (0, _express.Router)();
router.get("/", _meal.default.fetchAllMeals);
router.get("/:id", _meal.default.getSingleMeal);
router.post("/", _meal.default.addAMeal);
router.put("/:id", _meal.default.modifySingleMeal);
router.delete("/:id", _meal.default.deleteSingleMeal);
var _default = router;
exports.default = _default;
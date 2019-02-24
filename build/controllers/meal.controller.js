"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _meals = _interopRequireDefault(require("../services/meals.service"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var MealController = {
  fetchAllMeals: function fetchAllMeals(req, res) {
    var allMeals = _meals.default.fetchAllMeals();

    return res.status(200).json({
      status: "success",
      data: allMeals
    });
  },
  addAMeal: function addAMeal(req, res) {
    /*
        Expect json of the format
        {
            name: "name of food",
            size: "size of food",
            price: "price of food"
        }
    */
    var newMeal = req.body;

    var createdMeal = _meals.default.addMeal(newMeal);

    return res.status(201).json({
      status: "success",
      data: createdMeal
    });
  },
  getSingleMeal: function getSingleMeal(req, res) {
    var params = _objectSpread({}, req.params);

    var foundMeal = _meals.default.getAMeal(params.id);

    return res.status(200).json({
      status: "success",
      data: foundMeal
    });
  },
  modifySingleMeal: function modifySingleMeal(req, res) {
    var params = _objectSpread({}, req.params);

    var data = req.body;

    var modifiedMeal = _meals.default.modifyMeal(params.id, data);

    return res.status(200).json({
      status: "success",
      data: modifiedMeal
    });
  },
  deleteSingleMeal: function deleteSingleMeal(req, res) {
    var params = _objectSpread({}, req.params);

    _meals.default.deleteMeal(params.id);

    return res.status(200).json({
      status: "success"
    });
  }
};
var _default = MealController;
exports.default = _default;
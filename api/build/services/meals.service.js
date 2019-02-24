"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _dummyData = _interopRequireDefault(require("../utils/dummyData"));

var _meal = _interopRequireDefault(require("../models/meal.model"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var MealService = {
  fetchAllMeals: function fetchAllMeals() {
    var validMeals = _dummyData.default.meals.map(function (meal) {
      var newMeal = new _meal.default();
      newMeal.id = meal.id;
      newMeal.name = meal.name;
      newMeal.size = meal.size;
      newMeal.price = meal.price;
      return newMeal;
    });

    return validMeals;
  },
  addMeal: function addMeal(meal) {
    var mealLength = _dummyData.default.meals.length;
    var lastId = _dummyData.default.meals[mealLength - 1].id;
    var newId = lastId + 1;

    var mealData = _objectSpread({}, meal);

    mealData.id = newId;

    _dummyData.default.meals.push(mealData);

    return mealData;
  },
  getAMeal: function getAMeal(id) {
    var foundMeal = _dummyData.default.meals.find(function (meal) {
      return meal.id.toString() === id;
    });

    return foundMeal;
  },
  modifyMeal: function modifyMeal(id, data) {
    var meals = _dummyData.default.meals;
    var foundMeal = meals.find(function (meal) {
      return meal.id.toString() === id;
    });
    var newId = foundMeal.id;
    var newName = data.name ? data.name : foundMeal.name;
    var newSize = data.size ? data.size : foundMeal.size;
    var newPrice = data.price ? data.price : foundMeal.price;
    var menuData = {
      id: newId,
      name: newName,
      size: newSize,
      price: newPrice
    };
    return menuData;
  },
  deleteMeal: function deleteMeal(id) {
    var index = _dummyData.default.meals.findIndex(function (meal) {
      return meal.id.toString() === id;
    }); // Replace the item by index.


    _dummyData.default.meals.splice(index, 1);
  }
};
var _default = MealService;
exports.default = _default;
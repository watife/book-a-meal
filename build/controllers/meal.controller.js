"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _path = _interopRequireDefault(require("path"));

var _fs = _interopRequireDefault(require("fs"));

var _meal = _interopRequireDefault(require("../models/meal.model"));

var _category = _interopRequireDefault(require("../models/category.model"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var MealController =
/*#__PURE__*/
function () {
  function MealController() {
    _classCallCheck(this, MealController);
  }

  _createClass(MealController, null, [{
    key: "fetchAllMeals",

    /*
     *
     * controller to get all Meals
     * required: none
     *
     */
    value: function () {
      var _fetchAllMeals = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(req, res) {
        var meals, fileDir, mealsData;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return _meal.default.findAll();

              case 3:
                meals = _context.sent;

                if (meals[0]) {
                  _context.next = 6;
                  break;
                }

                throw new Error("No Meal was found");

              case 6:
                // 1. get the default path to the public directory
                fileDir = _path.default.join(__dirname, "../public/photos/"); // fetch the images associated to each meal

                mealsData = meals.map(function (meal) {
                  var buff = _fs.default.readFileSync(fileDir + meal.imageUrl);

                  var mealImg = buff.toString("base64");
                  var data = {
                    id: meal.id,
                    name: meal.name,
                    price: meal.price,
                    imageUrl: mealImg
                  };
                  return data;
                });
                return _context.abrupt("return", res.status(200).json({
                  status: "success",
                  meals: mealsData
                }));

              case 11:
                _context.prev = 11;
                _context.t0 = _context["catch"](0);
                return _context.abrupt("return", res.status(400).json({
                  status: "error",
                  message: _context.t0.message
                }));

              case 14:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[0, 11]]);
      }));

      function fetchAllMeals(_x, _x2) {
        return _fetchAllMeals.apply(this, arguments);
      }

      return fetchAllMeals;
    }()
    /*
     *
     * controller to add a single Meal
     * required: name, price, imageUrl
     *
     */

  }, {
    key: "addAMeal",
    value: function () {
      var _addAMeal = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(req, res) {
        var _req$body, name, price, imageUrl, categoryId, category, mealCheck, imageCheck, fileDir, fileObj, fileName, data, buf, meal;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                _req$body = req.body, name = _req$body.name, price = _req$body.price, imageUrl = _req$body.imageUrl, categoryId = _req$body.categoryId;
                console.log("this is image url".concat(imageUrl.name));
                _context2.next = 5;
                return _category.default.findByPk(categoryId);

              case 5:
                category = _context2.sent;

                if (category) {
                  _context2.next = 8;
                  break;
                }

                throw new Error("the selected category not found");

              case 8:
                _context2.next = 10;
                return _meal.default.findOne({
                  where: {
                    name: name
                  }
                });

              case 10:
                mealCheck = _context2.sent;

                if (!mealCheck) {
                  _context2.next = 13;
                  break;
                }

                throw new Error("the meal already exists");

              case 13:
                _context2.next = 15;
                return _meal.default.findOne({
                  where: {
                    imageUrl: imageUrl.name
                  }
                });

              case 15:
                imageCheck = _context2.sent;

                if (!imageCheck) {
                  _context2.next = 18;
                  break;
                }

                throw new Error("Image have to be unique to each meal");

              case 18:
                // save the image in the photos folder
                // 1. get the default path to the public directory
                fileDir = _path.default.join(__dirname, "../public/photos/");
                fileObj = _typeof(imageUrl) === "object" ? imageUrl : false;
                fileName = fileObj.name;

                if (fileObj) {
                  _context2.next = 23;
                  break;
                }

                throw new Error("meal image is required");

              case 23:
                // strip off the data: url prefix to get just the base64-encoded bytes
                data = imageUrl.data.replace(/^data:image\/\w+;base64,/, "");
                buf = Buffer.from(data, "base64");

                _fs.default.writeFile(fileDir + fileName, buf, function (err) {
                  if (err) {
                    throw new Error(err);
                  }
                });

                _context2.next = 28;
                return _meal.default.create({
                  name: name,
                  price: price,
                  categoryId: categoryId,
                  imageUrl: fileName,
                  catererId: req.caterer.id
                });

              case 28:
                meal = _context2.sent;
                return _context2.abrupt("return", res.status(201).json({
                  status: "success",
                  message: "Meal Added successfully",
                  data: {
                    id: meal.id,
                    name: meal.name,
                    price: meal.price,
                    imageUrl: meal.imageUrl
                  }
                }));

              case 32:
                _context2.prev = 32;
                _context2.t0 = _context2["catch"](0);
                return _context2.abrupt("return", res.status(400).json({
                  status: "error",
                  message: _context2.t0.message
                }));

              case 35:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this, [[0, 32]]);
      }));

      function addAMeal(_x3, _x4) {
        return _addAMeal.apply(this, arguments);
      }

      return addAMeal;
    }()
    /*
     *
     * controller to get a single Meal
     * required: mealId
     *
     */

  }, {
    key: "getSingleMeal",
    value: function () {
      var _getSingleMeal = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(req, res) {
        var id, meal, fileDir, buff, mealImg, data;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                id = req.params.id;
                _context3.next = 4;
                return _meal.default.findByPk(id);

              case 4:
                meal = _context3.sent;

                if (meal) {
                  _context3.next = 7;
                  break;
                }

                throw new Error("Meal specified not found");

              case 7:
                fileDir = _path.default.join(__dirname, "../public/photos/");
                buff = _fs.default.readFileSync(fileDir + meal.imageUrl);
                mealImg = buff.toString("base64");
                data = {
                  id: meal.id,
                  name: meal.name,
                  price: meal.price,
                  imageUrl: mealImg
                };
                return _context3.abrupt("return", res.status(200).json({
                  status: "success",
                  message: "Meal retrieved successfully",
                  meal: data
                }));

              case 14:
                _context3.prev = 14;
                _context3.t0 = _context3["catch"](0);
                return _context3.abrupt("return", res.status(400).json({
                  status: "error",
                  meal: _context3.t0.message
                }));

              case 17:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this, [[0, 14]]);
      }));

      function getSingleMeal(_x5, _x6) {
        return _getSingleMeal.apply(this, arguments);
      }

      return getSingleMeal;
    }()
    /*
     *
     * controller to get a single Meal
     * required: mealId
     *
     */

  }, {
    key: "modifyMeal",
    value: function () {
      var _modifyMeal = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4(req, res) {
        var id, body, meal, mealUpdateData, name, price, imageUrl, fileDir;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.prev = 0;
                id = req.params.id;
                body = _objectSpread({}, req.body);
                _context4.next = 5;
                return _meal.default.findByPk(id);

              case 5:
                meal = _context4.sent;

                if (meal) {
                  _context4.next = 8;
                  break;
                }

                throw new Error("the specified meal not found");

              case 8:
                mealUpdateData = {
                  name: body.name ? body.name : meal.name,
                  price: body.price ? body.price : meal.price,
                  categoryId: body.categoryId ? body.categoryId : meal.categoryId,
                  imageUrl: body.imageUrl ? body.imageUrl.name : meal.imageUrl
                };
                name = mealUpdateData.name, price = mealUpdateData.price, imageUrl = mealUpdateData.imageUrl;
                console.log(meal.imageUrl.name); // change the image url data to contain the new data

                if (body.imageUrl) {
                  // delete image from the photos directory
                  // read the file to be deleted
                  // 1. get the default path to the public directory
                  fileDir = _path.default.join(__dirname, "../public/photos/");

                  _fs.default.unlink(fileDir + meal.imageUrl, function (err) {
                    if (err) {
                      throw new Error("image couldn't be updated");
                    }

                    var fileObj = _typeof(body.imageUrl) === "object" ? body.imageUrl : false;
                    var fileName = fileObj.name;

                    if (!fileObj) {
                      throw new Error("meal image could not be updated"); // Grab the extension to resolve any image error
                      // var ext = file.data.split(';')[0].match(/jpeg|png|gif/)[0];
                    } // strip off the data: url prefix to get just the base64-encoded bytes


                    var data = body.imageUrl.data.replace(/^data:image\/\w+;base64,/, "");
                    var buf = Buffer.from(data, "base64");

                    _fs.default.writeFile(fileDir + fileName, buf, function (error) {
                      if (error) {
                        throw new Error("could not save meal image");
                      }
                    });
                  });
                }

                _context4.next = 14;
                return _meal.default.update({
                  name: name,
                  price: price,
                  imageUrl: imageUrl
                }, {
                  where: {
                    id: id
                  }
                });

              case 14:
                return _context4.abrupt("return", res.status(200).json({
                  status: "success",
                  message: "Meal successfully Updated"
                }));

              case 17:
                _context4.prev = 17;
                _context4.t0 = _context4["catch"](0);
                return _context4.abrupt("return", res.status(400).json({
                  status: "error",
                  meal: _context4.t0.message
                }));

              case 20:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this, [[0, 17]]);
      }));

      function modifyMeal(_x7, _x8) {
        return _modifyMeal.apply(this, arguments);
      }

      return modifyMeal;
    }()
    /*
     *
     * controller to delete a single Meal
     * required: mealId
     *
     */

  }, {
    key: "deleteSingleMeal",
    value: function () {
      var _deleteSingleMeal = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee5(req, res) {
        var id, foundMeal, fileDir, meal;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.prev = 0;
                id = req.params.id;
                console.log(id);
                _context5.next = 5;
                return _meal.default.findByPk(id);

              case 5:
                foundMeal = _context5.sent;

                if (foundMeal) {
                  _context5.next = 8;
                  break;
                }

                throw new Error("could not find the specified meal");

              case 8:
                // unlink the image from the photo directory
                // 1. get the default path to the public directory
                fileDir = _path.default.join(__dirname, "../public/photos/");

                _fs.default.unlink(fileDir + foundMeal.imageUrl, function (err) {
                  if (err) {
                    throw new Error("Could not delete the specified Meal");
                  }
                });

                _context5.next = 12;
                return _meal.default.destroy({
                  where: {
                    id: id
                  }
                });

              case 12:
                meal = _context5.sent;

                if (meal) {
                  _context5.next = 15;
                  break;
                }

                throw new Error("could not delete the specified meal");

              case 15:
                return _context5.abrupt("return", res.status(200).json({
                  status: "success",
                  meal: "meal deleted successfully"
                }));

              case 18:
                _context5.prev = 18;
                _context5.t0 = _context5["catch"](0);
                return _context5.abrupt("return", res.status(500).json({
                  status: "error",
                  message: _context5.t0.message
                }));

              case 21:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this, [[0, 18]]);
      }));

      function deleteSingleMeal(_x9, _x10) {
        return _deleteSingleMeal.apply(this, arguments);
      }

      return deleteSingleMeal;
    }()
  }]);

  return MealController;
}();

var _default = MealController;
exports.default = _default;
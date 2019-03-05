"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _meal = _interopRequireDefault(require("../models/meal.model"));

var _category = _interopRequireDefault(require("../models/category.model"));

var _caterer = _interopRequireDefault(require("../models/caterer.model"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var CategroyController =
/*#__PURE__*/
function () {
  function CategroyController() {
    _classCallCheck(this, CategroyController);
  }

  _createClass(CategroyController, null, [{
    key: "fetchAllCategories",

    /*
     *
     * controller to get all Categories
     * required: none
     *
     */
    value: function () {
      var _fetchAllCategories = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(req, res) {
        var categories;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return _category.default.findAll();

              case 3:
                categories = _context.sent;

                if (categories[0]) {
                  _context.next = 6;
                  break;
                }

                throw new Error("No Category was found");

              case 6:
                return _context.abrupt("return", res.status(200).json({
                  status: "success",
                  data: categories
                }));

              case 9:
                _context.prev = 9;
                _context.t0 = _context["catch"](0);
                return _context.abrupt("return", res.status(400).json({
                  status: "error",
                  message: _context.t0.message
                }));

              case 12:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[0, 9]]);
      }));

      function fetchAllCategories(_x, _x2) {
        return _fetchAllCategories.apply(this, arguments);
      }

      return fetchAllCategories;
    }()
    /*
     *
     * controller to add a single Category
     * required: name, catererId
     *
     */

  }, {
    key: "addACategory",
    value: function () {
      var _addACategory = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(req, res) {
        var name, category;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                name = req.body.name;
                _context2.next = 4;
                return _category.default.create({
                  name: name,
                  catererId: req.caterer.id
                });

              case 4:
                category = _context2.sent;
                return _context2.abrupt("return", res.status(201).json({
                  status: "success",
                  message: "Category Created successfully",
                  data: {
                    id: category.id,
                    name: category.name
                  }
                }));

              case 8:
                _context2.prev = 8;
                _context2.t0 = _context2["catch"](0);
                return _context2.abrupt("return", res.status(400).json({
                  status: "error",
                  message: _context2.t0.message
                }));

              case 11:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this, [[0, 8]]);
      }));

      function addACategory(_x3, _x4) {
        return _addACategory.apply(this, arguments);
      }

      return addACategory;
    }()
    /*
     *
     * controller to get a single Category
     * required: mealId
     *
     */

  }, {
    key: "getSingleCategory",
    value: function () {
      var _getSingleCategory = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(req, res) {
        var id, category, caterer, returnData;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                id = req.params.id;
                _context3.next = 4;
                return _category.default.findById(id);

              case 4:
                category = _context3.sent;

                if (category) {
                  _context3.next = 7;
                  break;
                }

                throw new Error("Category specified not found");

              case 7:
                _context3.next = 9;
                return _caterer.default.findByPk(category.catererId);

              case 9:
                caterer = _context3.sent;
                returnData = {
                  id: category.id,
                  name: category.name,
                  caterer: caterer
                };
                return _context3.abrupt("return", res.status(200).json({
                  status: "success",
                  message: "Category retrieved successfully",
                  data: {
                    category: returnData
                  }
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

      function getSingleCategory(_x5, _x6) {
        return _getSingleCategory.apply(this, arguments);
      }

      return getSingleCategory;
    }()
    /*
     *
     * controller to get a single Category
     * required: categoryId
     *
     */

  }, {
    key: "modifyCategory",
    value: function () {
      var _modifyCategory = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4(req, res) {
        var id, body, category, mealUpdateData, name;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.prev = 0;
                id = req.params.id;
                body = req.body;
                _context4.next = 5;
                return _category.default.findByPk(id);

              case 5:
                category = _context4.sent;

                if (category) {
                  _context4.next = 8;
                  break;
                }

                throw new Error("Category cannot be found");

              case 8:
                mealUpdateData = {
                  name: body.name ? body.name : category.name
                };
                name = mealUpdateData.name;
                _context4.next = 12;
                return _category.default.update({
                  name: name
                }, {
                  where: {
                    id: id
                  }
                });

              case 12:
                return _context4.abrupt("return", res.status(200).json({
                  status: "success",
                  message: "Category successfully Updated"
                }));

              case 15:
                _context4.prev = 15;
                _context4.t0 = _context4["catch"](0);
                return _context4.abrupt("return", res.status(400).json({
                  status: "error",
                  meal: _context4.t0.message
                }));

              case 18:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this, [[0, 15]]);
      }));

      function modifyCategory(_x7, _x8) {
        return _modifyCategory.apply(this, arguments);
      }

      return modifyCategory;
    }()
    /*
     *
     * controller to delete a single Category
     * required: mealId
     *
     */

  }, {
    key: "deleteSingleCategory",
    value: function () {
      var _deleteSingleCategory = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee5(req, res) {
        var id, category;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.prev = 0;
                id = req.params.id;
                _context5.next = 4;
                return _category.default.destroy({
                  where: {
                    id: id
                  }
                });

              case 4:
                category = _context5.sent;

                if (category) {
                  _context5.next = 7;
                  break;
                }

                throw new Error("could not delete the specified category");

              case 7:
                return _context5.abrupt("return", res.status(200).json({
                  status: "success",
                  meal: "category deleted successfully"
                }));

              case 10:
                _context5.prev = 10;
                _context5.t0 = _context5["catch"](0);
                return _context5.abrupt("return", res.status(400).json({
                  status: "error",
                  message: _context5.t0.message
                }));

              case 13:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this, [[0, 10]]);
      }));

      function deleteSingleCategory(_x9, _x10) {
        return _deleteSingleCategory.apply(this, arguments);
      }

      return deleteSingleCategory;
    }()
  }]);

  return CategroyController;
}();

var _default = CategroyController;
exports.default = _default;
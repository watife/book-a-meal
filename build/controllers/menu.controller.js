"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _menu = _interopRequireDefault(require("../models/menu.model"));

var _meal = _interopRequireDefault(require("../models/meal.model"));

var _date = _interopRequireDefault(require("../utils/date"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var MenuContoller =
/*#__PURE__*/
function () {
  function MenuContoller() {
    _classCallCheck(this, MenuContoller);
  }

  _createClass(MenuContoller, null, [{
    key: "fetchAllMenu",

    /*
     *
     * controller to get all Menu
     * required: none
     *
     */
    value: function () {
      var _fetchAllMenu = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(req, res) {
        var menus;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return _menu.default.findAll();

              case 3:
                menus = _context.sent;

                if (menus[0]) {
                  _context.next = 6;
                  break;
                }

                throw new Error("No Menu was found");

              case 6:
                return _context.abrupt("return", res.status(200).json({
                  status: "success",
                  menus: menus
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

      function fetchAllMenu(_x, _x2) {
        return _fetchAllMenu.apply(this, arguments);
      }

      return fetchAllMenu;
    }()
    /*
     *
     * controller to add menu for Today
     * required: name, price, quantity, imageUrl
     *
     */

  }, {
    key: "addTodayMenu",
    value: function () {
      var _addTodayMenu = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(req, res) {
        var _req$body, name, quantity, mealId, meal, today, activeMenu, menu;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                _req$body = req.body, name = _req$body.name, quantity = _req$body.quantity, mealId = _req$body.mealId;
                _context2.next = 4;
                return _meal.default.findById(mealId);

              case 4:
                meal = _context2.sent;

                if (meal) {
                  _context2.next = 7;
                  break;
                }

                throw new Error("the selected meal cannot found");

              case 7:
                today = (0, _date.default)();
                _context2.next = 10;
                return _menu.default.findOne({
                  where: {
                    createdAt: today
                  }
                });

              case 10:
                activeMenu = _context2.sent;

                if (!activeMenu) {
                  _context2.next = 13;
                  break;
                }

                throw new Error("There is a menu specified for today");

              case 13:
                _context2.next = 15;
                return _menu.default.create({
                  name: name,
                  quantity: quantity,
                  mealId: mealId,
                  catererId: req.caterer.id
                });

              case 15:
                menu = _context2.sent;
                return _context2.abrupt("return", res.status(201).json({
                  status: "success",
                  message: "Meal Added successfully",
                  menu: menu
                }));

              case 19:
                _context2.prev = 19;
                _context2.t0 = _context2["catch"](0);
                return _context2.abrupt("return", res.status(400).json({
                  status: "error",
                  message: _context2.t0.message
                }));

              case 22:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this, [[0, 19]]);
      }));

      function addTodayMenu(_x3, _x4) {
        return _addTodayMenu.apply(this, arguments);
      }

      return addTodayMenu;
    }()
    /*
     *
     * controller to get menu for Today
     * required: name, price, quantity, imageUrl
     *
     */

  }, {
    key: "getTodayMenu",
    value: function () {
      var _getTodayMenu = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(req, res) {
        var today, menu;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                today = (0, _date.default)();
                _context3.next = 4;
                return _menu.default.findOne({
                  where: {
                    createdAt: today
                  }
                });

              case 4:
                menu = _context3.sent;

                if (menu) {
                  _context3.next = 7;
                  break;
                }

                throw new Error("No current active Menu, try again Later");

              case 7:
                return _context3.abrupt("return", res.status(200).json({
                  status: "success",
                  message: "Menu retrieved successfully",
                  data: {
                    menu: menu
                  }
                }));

              case 10:
                _context3.prev = 10;
                _context3.t0 = _context3["catch"](0);
                return _context3.abrupt("return", res.status(400).json({
                  status: "error",
                  meal: _context3.t0.message
                }));

              case 13:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this, [[0, 10]]);
      }));

      function getTodayMenu(_x5, _x6) {
        return _getTodayMenu.apply(this, arguments);
      }

      return getTodayMenu;
    }() // static async  (req, res) => {
    //   const allMenu = MenuService.getAllMenu();
    //   return res.status(200).json({
    //     status: "success",
    //     data: allMenu
    //   });
    // },
    // modifyMenu: (req, res) => {
    //   const data = req.body;
    //   const modifiedMenu = MenuService.modifyMenu(data);
    //   return res.status(201).json({
    //     status: "success",
    //     data: modifiedMenu
    //   });
    // }

  }]);

  return MenuContoller;
}();

var _default = MenuContoller;
exports.default = _default;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _dummyData = _interopRequireDefault(require("../utils/dummyData"));

var _menu = _interopRequireDefault(require("../models/menu.model"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var MenuService = {
  getTodayMenu: function getTodayMenu() {
    var todayMenu = _dummyData.default.menu[_dummyData.default.menu.length - 1];
    return todayMenu;
  },
  addMenu: function addMenu(menu) {
    var menuLength = _dummyData.default.menu.length;
    var lastId = _dummyData.default.menu[menuLength - 1].id;
    var newId = lastId + 1;

    var menuData = _objectSpread({}, menu);

    menuData.id = newId;
    menuData.day = Date.now();

    _dummyData.default.menu.push(menuData);

    return menuData;
  },
  getAllMenu: function getAllMenu() {
    /*
     *
     * for menu history
     *
     */
    var menus = _dummyData.default.menu.map(function (menu) {
      var newMenu = new _menu.default();
      newMenu.id = menu.id;
      newMenu.day = menu.day;
      newMenu.menu = menu.menu;
      return newMenu;
    });

    return menus;
  },
  modifyMenu: function modifyMenu(data) {
    /*
     *
     * modification of the current menu for today
     * can't modify history
     *
     */
    var menuToModify = _dummyData.default.menu[_dummyData.default.menu.length - 1];

    if (data.menu) {
      menuToModify.menu = data.menu;
    }

    return menuToModify;
  }
};
var _default = MenuService;
exports.default = _default;
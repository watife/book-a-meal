"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _menu = _interopRequireDefault(require("../services/menu.service"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MenuContoller = {
  fetchTodayMenu: function fetchTodayMenu(req, res) {
    var todayMenu = _menu.default.getTodayMenu();

    return res.status(200).json({
      status: "success",
      data: todayMenu
    });
  },
  addTodayMenu: function addTodayMenu(req, res) {
    /*
        Expect json of the format
        {
            menu: "an array of meals"
        }
    */
    var newMenu = req.body;

    var createdMenu = _menu.default.addMenu(newMenu);

    return res.status(201).json({
      status: "success",
      data: createdMenu
    });
  },
  fetchAllMenu: function fetchAllMenu(req, res) {
    var allMenu = _menu.default.getAllMenu();

    return res.status(200).json({
      status: "success",
      data: allMenu
    });
  },
  modifyMenu: function modifyMenu(req, res) {
    var data = req.body;

    var modifiedMenu = _menu.default.modifyMenu(data);

    return res.status(200).json({
      status: "success",
      data: modifiedMenu
    });
  }
};
var _default = MenuContoller;
exports.default = _default;
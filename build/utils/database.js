"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _sequelize = _interopRequireDefault(require("sequelize"));

var _dotenv = require("dotenv");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _dotenv.config)();
var sequelize = new _sequelize.default("book_a_meal", "user1", "", {
  dialect: "postgres",
  logging: false
});
var _default = sequelize;
exports.default = _default;
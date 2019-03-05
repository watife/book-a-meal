"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _sequelize = _interopRequireDefault(require("sequelize"));

var _database = _interopRequireDefault(require("../utils/database"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Meal = _database.default.define("meal", {
  id: {
    type: _sequelize.default.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  name: {
    type: _sequelize.default.STRING,
    allowNull: false
  },
  price: {
    type: _sequelize.default.INTEGER,
    allowNull: false
  },
  imageUrl: {
    type: _sequelize.default.STRING,
    allowNull: false
  },
  categoryId: {
    type: _sequelize.default.INTEGER,
    allowNull: false
  },
  catererId: {
    type: _sequelize.default.INTEGER,
    allowNull: false
  },
  createdAt: _sequelize.default.DATEONLY,
  updatedAt: _sequelize.default.DATEONLY
});

var _default = Meal;
exports.default = _default;
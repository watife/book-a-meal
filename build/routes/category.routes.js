"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _category = _interopRequireDefault(require("../controllers/category.controller"));

var _authentication = _interopRequireDefault(require("../middlewares/authentication"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// controllers
var router = (0, _express.Router)();
router.get("/", _authentication.default.verifyAdminToken, _category.default.fetchAllCategories);
router.get("/:id", _authentication.default.verifyAdminToken, _category.default.getSingleCategory);
router.post("/", _authentication.default.verifyAdminToken, _category.default.addACategory);
router.put("/:id", _authentication.default.verifyAdminToken, _category.default.modifyCategory);
router.delete("/:id", _authentication.default.verifyAdminToken, _category.default.deleteSingleCategory);
var _default = router;
exports.default = _default;
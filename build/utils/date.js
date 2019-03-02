"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var dateActive = function dateActive() {
  var date = new Date();
  var month = "".concat(date.getMonth() + 1);
  var today = "".concat(date.getFullYear(), "-").concat(month.padStart(2, "0"), "-").concat(date.getDate());
  return today;
};

var _default = dateActive;
exports.default = _default;
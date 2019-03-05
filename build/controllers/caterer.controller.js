"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _jwt = _interopRequireDefault(require("../utils/jwt"));

var _caterer = _interopRequireDefault(require("../models/caterer.model"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var CatererController =
/*#__PURE__*/
function () {
  function CatererController() {
    _classCallCheck(this, CatererController);
  }

  _createClass(CatererController, null, [{
    key: "catererRegister",

    /*
     *
     * controller to signup a caterer
     * required: name, email, password
     *
     */
    value: function () {
      var _catererRegister = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(req, res) {
        var _req$body, name, email, password, phone, hash, emailCheck, newCaterer, catererToSave, jwtToken;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _req$body = req.body, name = _req$body.name, email = _req$body.email, password = _req$body.password, phone = _req$body.phone;
                _context.next = 4;
                return _bcrypt.default.hash(password, 10);

              case 4:
                hash = _context.sent;
                _context.next = 7;
                return _caterer.default.findOne({
                  where: {
                    email: email
                  }
                });

              case 7:
                emailCheck = _context.sent;

                if (!emailCheck) {
                  _context.next = 10;
                  break;
                }

                throw new Error("Caterer with this email already exists");

              case 10:
                _context.next = 12;
                return _caterer.default.create({
                  name: name,
                  email: email,
                  phone: phone,
                  password: hash
                });

              case 12:
                newCaterer = _context.sent;
                // get the new user to be saved for jwt
                catererToSave = {
                  id: newCaterer.id,
                  name: newCaterer.name,
                  email: newCaterer.email,
                  phone: newCaterer.phone
                };
                jwtToken = _jsonwebtoken.default.sign({
                  caterer: catererToSave,
                  isCaterer: true
                }, _jwt.default, {
                  expiresIn: 86400
                });
                return _context.abrupt("return", res.status(201).json({
                  status: "success",
                  message: "Caterer Registered",
                  token: "Bearer ".concat(jwtToken),
                  caterer: catererToSave
                }));

              case 18:
                _context.prev = 18;
                _context.t0 = _context["catch"](0);
                return _context.abrupt("return", res.status(500).json({
                  status: "error",
                  message: _context.t0.message
                }));

              case 21:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[0, 18]]);
      }));

      function catererRegister(_x, _x2) {
        return _catererRegister.apply(this, arguments);
      }

      return catererRegister;
    }()
    /*
     *
     * controller to log caterer in
     * required: caterer id
     *
     */

  }, {
    key: "catererLogin",
    value: function () {
      var _catererLogin = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(req, res) {
        var _req$body2, email, password, caterer, Comparehash, catererToSave, jwtToken;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                _req$body2 = req.body, email = _req$body2.email, password = _req$body2.password;
                _context2.next = 4;
                return _caterer.default.findOne({
                  where: {
                    email: email
                  }
                });

              case 4:
                caterer = _context2.sent;

                if (caterer) {
                  _context2.next = 7;
                  break;
                }

                throw new Error("Invalid email or password");

              case 7:
                _context2.next = 9;
                return _bcrypt.default.compare(password, caterer.password);

              case 9:
                Comparehash = _context2.sent;

                if (Comparehash) {
                  _context2.next = 12;
                  break;
                }

                throw new Error("Invalid email or password");

              case 12:
                catererToSave = {
                  id: caterer.id,
                  name: caterer.name,
                  email: caterer.email,
                  phone: caterer.phone
                };
                jwtToken = _jsonwebtoken.default.sign({
                  caterer: catererToSave,
                  isCaterer: true
                }, _jwt.default, {
                  expiresIn: 86400
                });
                return _context2.abrupt("return", res.status(200).json({
                  status: "success",
                  message: "Caterer Logged In",
                  token: "Bearer ".concat(jwtToken),
                  caterer: catererToSave
                }));

              case 17:
                _context2.prev = 17;
                _context2.t0 = _context2["catch"](0);
                return _context2.abrupt("return", res.status(400).json({
                  status: "error",
                  message: _context2.t0.message
                }));

              case 20:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this, [[0, 17]]);
      }));

      function catererLogin(_x3, _x4) {
        return _catererLogin.apply(this, arguments);
      }

      return catererLogin;
    }()
    /*
     *
     * controller to get a single caterer
     * required: caterer id
     *
     */
    // static async getCaterer(req, res) {
    //   try {
    //     const { id } = req.params;
    //     const caterer = await Caterer.findById(id);
    //     if (!caterer) {
    //       throw new Error("Caterer specified does not exist");
    //     }
    //     const safeCaterer = {
    //       id: caterer.id,
    //       name: caterer.name,
    //       email: caterer.email,
    //       phone: caterer.phone
    //     };
    //     return res.status(200).json({
    //       status: "success",
    //       caterer: safeCaterer
    //     });
    //   } catch (error) {
    //     return res.status(400).json({
    //       status: "error",
    //       message: error.message
    //     });
    //   }
    // }
    // /*
    //  *
    //  * controller to get all caterers
    //  * required: none
    //  *
    //  */
    // static async getAllCaterer(req, res) {
    //   try {
    //     const caterers = await Caterer.findAll();
    //     if (!caterers[0]) {
    //       throw new Error("No caterer was found");
    //     }
    //     // create new admin and remove the password fields
    //     const newAdmins = caterers.map(admin => {
    //       return {
    //         id: admin.id,
    //         name: admin.name,
    //         email: admin.email,
    //         phone: admin.phone
    //       };
    //     });
    //     return res.status(200).json({
    //       status: "success",
    //       caterers: newAdmins
    //     });
    //   } catch (error) {
    //     return res.status(400).json({
    //       status: "error",
    //       message: error.message
    //     });
    //   }
    // }
    // /*
    //  *
    //  * controller to modify a specific caterer
    //  * required: admin id, new name
    //  *
    //  */
    // static async modifyCaterer(req, res) {
    //   try {
    //     const { id } = req.params;
    //     const { name } = req.body;
    //     const caterer = await Caterer.update({ name }, { where: { id } });
    //     if (!caterer[0]) {
    //       throw new Error(`Caterer specified could not be updated`);
    //     }
    //     return res.status(200).json({
    //       status: "success",
    //       caterer: "caterer successfully modified"
    //     });
    //   } catch (error) {
    //     return res.status(400).json({
    //       status: "error",
    //       message: error.message
    //     });
    //   }
    // }
    // /*
    //  *
    //  * controller to delete a specific caterer
    //  * required: admin id
    //  *
    //  */
    // static async deleteCaterer(req, res) {
    //   try {
    //     const { id } = req.params;
    //     const caterer = await Caterer.destroy({ where: { id } });
    //     if (!caterer) {
    //       throw new Error("could not delete the specified caterer");
    //     }
    //     return res.status(200).json({
    //       status: "success",
    //       caterer: "Caterer successfully deleted"
    //     });
    //   } catch (error) {
    //     return res.status(400).json({
    //       status: "error",
    //       message: error.message
    //     });
    //   }
    // }

  }]);

  return CatererController;
}();

var _default = CatererController;
exports.default = _default;
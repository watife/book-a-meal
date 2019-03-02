"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _jwt = _interopRequireDefault(require("../utils/jwt"));

var _customer = _interopRequireDefault(require("../models/customer.model"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var CustomerController =
/*#__PURE__*/
function () {
  function CustomerController() {
    _classCallCheck(this, CustomerController);
  }

  _createClass(CustomerController, null, [{
    key: "customerRegister",

    /*
     *
     * controller to signup a customer
     * required: name, email, password
     *
     */
    value: function () {
      var _customerRegister = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(req, res) {
        var _req$body, name, email, password, phone, hash, emailCheck, newCustomer, customerToSave, jwtToken;

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
                return _customer.default.findOne({
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

                throw new Error("User with this email already exists");

              case 10:
                _context.next = 12;
                return _customer.default.create({
                  name: name,
                  email: email,
                  phone: phone,
                  password: hash
                });

              case 12:
                newCustomer = _context.sent;

                if (newCustomer) {
                  _context.next = 15;
                  break;
                }

                throw new Error("Could not signup, try some other time");

              case 15:
                // get the new user to be saved for jwt
                customerToSave = {
                  id: newCustomer.id,
                  name: newCustomer.name,
                  email: newCustomer.email,
                  phone: newCustomer.phone
                };
                jwtToken = _jsonwebtoken.default.sign({
                  customer: customerToSave,
                  isCustomer: true
                }, _jwt.default, {
                  expiresIn: 86400
                });
                return _context.abrupt("return", res.status(201).json({
                  status: "success",
                  message: "Caterer Registered",
                  token: "Bearer ".concat(jwtToken),
                  caterer: customerToSave
                }));

              case 20:
                _context.prev = 20;
                _context.t0 = _context["catch"](0);
                return _context.abrupt("return", res.status(400).json({
                  status: "error",
                  message: _context.t0.message
                }));

              case 23:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[0, 20]]);
      }));

      function customerRegister(_x, _x2) {
        return _customerRegister.apply(this, arguments);
      }

      return customerRegister;
    }()
    /*
     *
     * controller to log customer in
     * required: caterer id
     *
     */

  }, {
    key: "customerLogin",
    value: function () {
      var _customerLogin = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(req, res) {
        var _req$body2, email, password, customer, Comparehash, customerToSave, jwtToken;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                _req$body2 = req.body, email = _req$body2.email, password = _req$body2.password;
                _context2.next = 4;
                return _customer.default.findOne({
                  where: {
                    email: email
                  }
                });

              case 4:
                customer = _context2.sent;

                if (customer) {
                  _context2.next = 7;
                  break;
                }

                throw new Error("Invalid email or password");

              case 7:
                _context2.next = 9;
                return _bcrypt.default.compare(password, customer.password);

              case 9:
                Comparehash = _context2.sent;

                if (Comparehash) {
                  _context2.next = 12;
                  break;
                }

                throw new Error("Invalid email or password");

              case 12:
                customerToSave = {
                  id: customer.id,
                  name: customer.name,
                  email: customer.email,
                  phone: customer.phone
                };
                jwtToken = _jsonwebtoken.default.sign({
                  customer: customerToSave,
                  isCustomer: true
                }, _jwt.default, {
                  expiresIn: 86400
                });
                return _context2.abrupt("return", res.status(200).json({
                  status: "success",
                  message: "Caterer Logged In",
                  token: "Bearer ".concat(jwtToken),
                  caterer: customerToSave
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

      function customerLogin(_x3, _x4) {
        return _customerLogin.apply(this, arguments);
      }

      return customerLogin;
    }()
    /*
     *
     * controller to get a single customer
     * required: customer id
     *
     */

  }, {
    key: "getCustomer",
    value: function () {
      var _getCustomer = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(req, res) {
        var id, customer, safeCustomer;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                id = req.params.id;
                _context3.next = 4;
                return _customer.default.findById(id);

              case 4:
                customer = _context3.sent;

                if (customer) {
                  _context3.next = 7;
                  break;
                }

                throw new Error("Customer specified does not exist");

              case 7:
                safeCustomer = {
                  id: customer.id,
                  name: customer.name,
                  email: customer.email,
                  phone: customer.phone
                };
                return _context3.abrupt("return", res.status(200).json({
                  status: "success",
                  caterer: safeCustomer
                }));

              case 11:
                _context3.prev = 11;
                _context3.t0 = _context3["catch"](0);
                return _context3.abrupt("return", res.status(400).json({
                  status: "error",
                  message: _context3.t0.message
                }));

              case 14:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this, [[0, 11]]);
      }));

      function getCustomer(_x5, _x6) {
        return _getCustomer.apply(this, arguments);
      }

      return getCustomer;
    }()
    /*
     *
     * controller to get all caterers
     * required: none
     *
    //    */
    //   static async getAllCaterer(req, res) {
    //     try {
    //       const caterers = await Caterer.findAll();
    //       if (!caterers) {
    //         throw new Error(`No caterer was found`);
    //       }
    //       // create new admin and remove the password fields
    //       const newAdmins = caterers.map(admin => {
    //         return {
    //           id: admin.id,
    //           name: admin.name,
    //           email: admin.email,
    //           phone: admin.phone
    //         };
    //       });
    //       return res.status(200).json({
    //         status: "success",
    //         caterers: newAdmins
    //       });
    //     } catch (error) {
    //       return res.status(400).json({
    //         status: "error",
    //         caterer: error.message
    //       });
    //     }
    //   }
    //   /*
    //    *
    //    * controller to modify a specific caterer
    //    * required: admin id, new name
    //    *
    //    */
    //   static async modifyCaterer(req, res) {
    //     try {
    //       const { id } = req.params;
    //       const { name } = req.body;
    //       const caterer = await Caterer.update({ name }, { where: { id } });
    //       if (!caterer[0]) {
    //         throw new Error(`Caterer specified could not be updated`);
    //       }
    //       return res.status(200).json({
    //         status: "success",
    //         caterer
    //       });
    //     } catch (error) {
    //       return res.status(400).json({
    //         status: "error",
    //         caterer: error.message
    //       });
    //     }
    //   }
    //   /*
    //    *
    //    * controller to delete a specific caterer
    //    * required: admin id
    //    *
    //    */
    //   static async deleteCaterer(req, res) {
    //     try {
    //       const { id } = req.params;
    //       const caterer = await Caterer.destroy({ where: { id } });
    //       if (!caterer) {
    //         throw new Error("could not delete the specified caterer");
    //       }
    //       return res.status(200).json({
    //         status: "success",
    //         caterer
    //       });
    //     } catch (error) {
    //       return res.status(400).json({
    //         status: "error",
    //         caterer: error.message
    //       });
    //     }
    //   }

  }]);

  return CustomerController;
}();

var _default = CustomerController;
exports.default = _default;
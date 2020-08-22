"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validatePassword = exports.checkIfUserExists = exports.createUser = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _models = require("../models");

var createUser = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(_ref) {
    var email, name, password, encryptedPassword, currentTime;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            email = _ref.email, name = _ref.name, password = _ref.password;
            _context.next = 3;
            return _bcrypt["default"].hash(password, 8);

          case 3:
            encryptedPassword = _context.sent;
            currentTime = new Date();
            return _context.abrupt("return", {
              name: name,
              email: email,
              password: encryptedPassword,
              createdAt: currentTime,
              updatedAt: currentTime
            });

          case 6:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function createUser(_x) {
    return _ref2.apply(this, arguments);
  };
}();

exports.createUser = createUser;

var checkIfUserExists = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(param, value) {
    var user;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _models.Users.findOne((0, _defineProperty2["default"])({}, param, value));

          case 2:
            user = _context2.sent;

            if (!user) {
              _context2.next = 7;
              break;
            }

            return _context2.abrupt("return", user);

          case 7:
            throw "User does not exist";

          case 8:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function checkIfUserExists(_x2, _x3) {
    return _ref3.apply(this, arguments);
  };
}();

exports.checkIfUserExists = checkIfUserExists;

var validatePassword = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(password, user) {
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return _bcrypt["default"].compare(password, user.password);

          case 2:
            return _context3.abrupt("return", _context3.sent);

          case 3:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function validatePassword(_x4, _x5) {
    return _ref4.apply(this, arguments);
  };
}();

exports.validatePassword = validatePassword;
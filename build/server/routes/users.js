"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _models = require("../models");

var _user = require("../helpers/user.helper");

var _express = _interopRequireDefault(require("express"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _utils = require("../utils");

var router = _express["default"].Router();

router.post('/login', (0, _utils.asyncHandler)( /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var _req$body, email, password, user, isValid;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _req$body = req.body, email = _req$body.email, password = _req$body.password;

            if (!(!email || !password)) {
              _context.next = 5;
              break;
            }

            throw "Please send Proper email & Password";

          case 5:
            _context.next = 7;
            return (0, _user.checkIfUserExists)('email', email);

          case 7:
            user = _context.sent;
            _context.next = 10;
            return (0, _user.validatePassword)(password, user);

          case 10:
            isValid = _context.sent;

            if (!isValid) {
              _context.next = 15;
              break;
            }

            res.send({
              message: "Authorisation Successful"
            });
            _context.next = 16;
            break;

          case 15:
            throw "Please Try with a Valid Password";

          case 16:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}()));
router.post('/register', /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var newUser, result;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return (0, _user.createUser)(req.body);

          case 2:
            newUser = _context2.sent;
            _context2.next = 5;
            return _models.Users.create(newUser);

          case 5:
            result = _context2.sent;
            res.send({
              message: "User created successfully",
              id: result._id
            });

          case 7:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}());
router.put('/reset-password', /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var _req$body2, email, newPassword, currentPassword, user, isNewPasswordEqualsCurrent, isValid;

    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _req$body2 = req.body, email = _req$body2.email, newPassword = _req$body2.newPassword, currentPassword = _req$body2.currentPassword;

            if (!(!email || !newPassword || !currentPassword)) {
              _context3.next = 5;
              break;
            }

            throw "Please send Proper email & Password";

          case 5:
            _context3.next = 7;
            return (0, _user.checkIfUserExists)('email', email);

          case 7:
            user = _context3.sent;
            _context3.next = 10;
            return (0, _user.validatePassword)(newPassword, user);

          case 10:
            isNewPasswordEqualsCurrent = _context3.sent;
            _context3.next = 13;
            return (0, _user.validatePassword)(currentPassword, user);

          case 13:
            isValid = _context3.sent;

            if (!(isValid && !isNewPasswordEqualsCurrent)) {
              _context3.next = 24;
              break;
            }

            _context3.next = 17;
            return _bcrypt["default"].hash(newPassword, 8);

          case 17:
            user.password = _context3.sent;
            user.updatedAt = new Date();
            _context3.next = 21;
            return user.save();

          case 21:
            res.send({
              message: 'password updated succesfully'
            });
            _context3.next = 29;
            break;

          case 24:
            if (isValid) {
              _context3.next = 28;
              break;
            }

            throw "Current Password is not Valid";

          case 28:
            throw "Current password equals new password";

          case 29:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}());
router.put('/:userId/mark-favorite/:companyId', /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var _req$params, userId, companyId, user;

    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _req$params = req.params, userId = _req$params.userId, companyId = _req$params.companyId;
            _context4.next = 3;
            return (0, _user.checkIfUserExists)('_id', userId);

          case 3:
            user = _context4.sent;

            if (!(user.favoriteCompanies.indexOf(companyId) > -1)) {
              _context4.next = 8;
              break;
            }

            res.send({
              message: "Already marked as favorite"
            });
            _context4.next = 13;
            break;

          case 8:
            user.favoriteCompanies = [].concat((0, _toConsumableArray2["default"])(user.favoriteCompanies), [companyId]);
            user.updatedAt = new Date();
            _context4.next = 12;
            return user.save();

          case 12:
            res.send({
              message: "Company marked as favorite",
              data: user.favoriteCompanies
            });

          case 13:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function (_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}());
router.put('/:userId/unmark-favorite/:companyId', /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
    var _req$params2, userId, companyId, user, favIndex;

    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _req$params2 = req.params, userId = _req$params2.userId, companyId = _req$params2.companyId;
            _context5.next = 3;
            return (0, _user.checkIfUserExists)('_id', userId);

          case 3:
            user = _context5.sent;
            favIndex = user.favoriteCompanies.indexOf(companyId) > -1;

            if (!(favIndex > -1)) {
              _context5.next = 13;
              break;
            }

            user.favoriteCompanies = (0, _toConsumableArray2["default"])(user.favoriteCompanies.splice(favIndex, 1));
            user.updatedAt = new Date();
            _context5.next = 10;
            return user.save();

          case 10:
            res.send({
              message: "Company removed from favorite",
              data: user.favoriteCompanies
            });
            _context5.next = 14;
            break;

          case 13:
            res.send({
              message: "Company is not favorite for the user"
            });

          case 14:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function (_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}());
router.get('/:userId/favorites', /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res) {
    var userId, user, favoriteCompanies;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            userId = req.params.userId;
            _context6.next = 3;
            return (0, _user.checkIfUserExists)('_id', userId);

          case 3:
            user = _context6.sent;
            _context6.next = 6;
            return _models.Companies.find().where('_id')["in"](user.favoriteCompanies).exec();

          case 6:
            favoriteCompanies = _context6.sent;
            res.send({
              data: favoriteCompanies
            });

          case 8:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));

  return function (_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}());
var _default = router;
exports["default"] = _default;
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.findCompaniesWithName = exports.createCompany = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _models = require("../models");

var createCompany = function createCompany(_ref) {
  var name = _ref.name,
      permalink = _ref.permalink,
      phone = _ref.phone,
      address = _ref.address;
  var currentTime = new Date();
  return {
    name: name,
    permalink: permalink,
    phone: phone,
    address: address,
    createdAt: currentTime,
    updatedAt: currentTime
  };
};

exports.createCompany = createCompany;

var findCompaniesWithName = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(search) {
    var searchRegex, companies;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            searchRegex = new RegExp(search, 'i');
            _context.next = 3;
            return _models.Companies.find({
              name: searchRegex
            });

          case 3:
            companies = _context.sent;
            return _context.abrupt("return", companies);

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function findCompaniesWithName(_x) {
    return _ref2.apply(this, arguments);
  };
}();

exports.findCompaniesWithName = findCompaniesWithName;
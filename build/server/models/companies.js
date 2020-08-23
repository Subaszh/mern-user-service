"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Companies = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _mongooseUniqueValidator = _interopRequireDefault(require("mongoose-unique-validator"));

var companySchema = _mongoose["default"].Schema({
  name: {
    type: String,
    required: true,
    index: true
  },
  permalink: {
    type: String,
    unique: true,
    required: true
  },
  phone: String,
  address: String,
  createdAt: Date,
  updatedAt: Date
});

companySchema.plugin(_mongooseUniqueValidator["default"], {
  message: 'Company with {PATH} - {VALUE} exists already'
});

var Companies = _mongoose["default"].model('Company', companySchema);

exports.Companies = Companies;
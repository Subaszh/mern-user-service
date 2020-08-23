"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Users = void 0;

var _mongoose = _interopRequireWildcard(require("mongoose"));

var _mongooseUniqueValidator = _interopRequireDefault(require("mongoose-unique-validator"));

var userSchema = (0, _mongoose.Schema)({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  favoriteCompanies: [_mongoose.Schema.Types.ObjectId],
  createdAt: Date,
  updatedAt: Date
});
userSchema.plugin(_mongooseUniqueValidator["default"], {
  message: '{PATH} already being used'
});

var Users = _mongoose["default"].model('User', userSchema);

exports.Users = Users;
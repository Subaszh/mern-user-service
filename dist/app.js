"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _morgan = _interopRequireDefault(require("morgan"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _index = _interopRequireDefault(require("./routes/index"));

var _users = _interopRequireDefault(require("./routes/users"));

var _companies = _interopRequireDefault(require("./routes/companies"));

var _errorHandler = _interopRequireDefault(require("./error-handler"));

var app = (0, _express["default"])();
app.use((0, _morgan["default"])('dev'));
app.use(_express["default"].json());
app.use(_express["default"].urlencoded({
  extended: false
}));

_mongoose["default"].connect('mongodb+srv://admin:subash-chandran@cluster0.mhy8m.mongodb.net/favorites-companies-db?retryWrites=true&w=majority', {
  useUnifiedTopology: true,
  useNewUrlParser: true
});

app.use('/', _index["default"]);
app.use('/users', _users["default"]);
app.use('/companies', _companies["default"]);
app.use(_errorHandler["default"]);
var _default = app;
exports["default"] = _default;
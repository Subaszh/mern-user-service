"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _morgan = _interopRequireDefault(require("morgan"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _users = _interopRequireDefault(require("./routes/users"));

var _companies = _interopRequireDefault(require("./routes/companies"));

var _errorHandler = _interopRequireDefault(require("./error-handler"));

var _path = _interopRequireDefault(require("path"));

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

app.use('/users', _users["default"]);
app.use('/companies', _companies["default"]);
app.use(_errorHandler["default"]);
app.use(_express["default"]["static"](_path["default"].join(__dirname, '../client')));
app.get('/*', function (req, res) {
  res.sendFile(_path["default"].join(__dirname, '../client/index.html'), function (err) {
    if (err) {
      res.status(500).send(err);
    }
  });
});
var _default = app;
exports["default"] = _default;
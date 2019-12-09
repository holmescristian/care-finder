const mongoose = require('mongoose');
var createError = require('http-errors');
var express = require('express');
var logger = require('morgan');

// load the configuration
require('dotenv').config();

// connect to the database
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true })

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// api routes
app.use('/api', require('./src/routes/index'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({'error': err.message, 'status': err.status});
});

/**
 * Middleware for parsing the request body
 * https://www.npmjs.com/package/body-parser
 */

// const bodyParser = require('body-parser')
// app.use(bodyParser());

// app.js
var AuthController = require('./src/auth/AuthController');
app.use('/api/auth', AuthController);

module.exports = app;

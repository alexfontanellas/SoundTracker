/*jshint esversion : 6 */
const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose     = require("mongoose");
const session    = require("express-session");
const MongoStore = require("connect-mongo")(session);
const expressLayouts = require('express-ejs-layouts');

mongoose.connect('mongodb://localhost:27017/sound-tracker');

const users = require('./routes/users');
const spotifyCalls = require('./routes/spotifyCalls');
//ss
const app = express();

// view engine setup
app.use(expressLayouts);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
//set main layout
app.set('layout', 'layouts/shared');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/bower_components',  express.static(__dirname + '/bower_components'));


app.use('/users', users);
app.use('/', spotifyCalls);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

var createError = require('http-errors');
import express from 'express';
import bodyParser from 'body-parser'
const mongoose = require('mongoose');
var cors = require('cors')

//var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
var transactionRoutes = require('./routes/transactions');

var app = express();

app.use(cors())

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/images',express.static(path.join(__dirname, 'public/images')));


app.use('/', indexRouter);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//mongodb://127.0.0.1:27017/port?compressors=disabled&gssapiServiceName=mongodb

mongoose.connect("mongodb://127.0.0.1:27017/node-angular",{useNewUrlParser: true}).then(() => {
  console.log('heyyyyyyyyyyyyyyyyyyyyyy');
}).catch(() => {
  console.log('connection failed');
});


app.use('/api/transactions/', transactionRoutes);

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
  res.render('error');
});

module.exports = app;

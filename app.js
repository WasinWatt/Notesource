var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');//HTTP request logger middleware
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('client-sessions');//session management
var config  =require('./config');
var knox = require('knox');//AWS API

var routes = require('./routes/index');//index.js
var users = require('./routes/users').router;//users.js

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/bower_components',  express.static(__dirname + '/bower_components'));
app.use('/node_modules',  express.static(__dirname + '/node_modules'));


//Sessions
app.use(session({
  cookieName: 'session_notesource',
  secret: 'XXXXXXXXXXXXXX',
  duration: 30 * 60 * 1000
}));,//millisec
  activeDuration: 5 * 60 * 1000
app.use(function(req, res, next) {
  if (req.session_notesource.seenyou) {
    res.setHeader('X-Seen-You', 'true');
  } else {
    // setting a property will automatically cause a Set-Cookie response
    // to be sent
    req.session_notesource.seenyou = true;
    res.setHeader('X-Seen-You', 'false');
  }
  next();
});


//API
app.use('/', routes);
app.use('/users', users);

//AWS
var knoxClient = knox.createClient({
  key:config.S3AccessKey,
  secret:config.S3Secret,
  bucket:config.S3Bucket
});
exports.knoxClient = knoxClient;

//Download part (test)
app.use('/download/test',function(req,res,next){
  res.download('./note_assets/cu/gened/PhilosLogic/Heray.pdf');
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.sendFile('error.html',{"root":'views'});
  //res.redirect('/');
});

module.exports = app;

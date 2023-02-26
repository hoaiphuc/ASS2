var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var FileStore = require('session-file-store')(session);

const mongoose = require('mongoose');

const url = 'mongodb://127.0.0.1:27017/worldcup2022';
const connect = mongoose.connect(url);


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var playerRouter = require('./routes/playerRouter');
var nationRouter = require('./routes/nationRouter');
const players = require('./models/player');

connect.then((db) => {
  console.log("Connected correctly to server");
}, (err) => { console.log(err); });

var app = express();

//session 
app.use(session({
  name: 'session-id',
  secret: '12345-67890-09876-54321',
  saveUninitialized: false,
  resave: false,
  store: new FileStore()
}));

function auth (req, res, next) {
  console.log(req.session);

  if (!req.session.user) {
      var authHeader = req.headers.authorization;
      if (!authHeader) {
          var err = new Error('You are not authenticated!');
          res.setHeader('WWW-Authenticate', 'Basic');                        
          err.status = 401;
          next(err);
          return;
      }
      var auth = new Buffer.from(authHeader.split(' ')[1], 'base64').toString().split(':');
      var user = auth[0];
      var pass = auth[1];
      if (user == 'admin' && pass == 'password') {
          req.session.user = 'admin';
          next(); // authorized
      } else {
          var err = new Error('You are not authenticated!');
          res.setHeader('WWW-Authenticate', 'Basic');
          err.status = 401;
          next(err);
      }
  }
  else {
      if (req.session.user === 'admin') {
          console.log('req.session: ',req.session);
          next();
      }
      else {
          var err = new Error('You are not authenticated!');
          err.status = 401;
          next(err);
      }
  }
}

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/players', playerRouter);
app.use('/nations', nationRouter);

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

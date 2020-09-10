var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

const { enableDebug } = require('./config');

var { indexRouter } = require('./routes/index');
var { usersRouter } = require('./routes/users');
var { coursesRouter } = require('./routes/courses');
var { debugRouter } = require('./routes/debug');


const bodyParser = require('body-parser');

const { apiName } = require('./config');

process.env.PORT = 3001; // port for api
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// routes setup
app.use('/' + apiName + '/', indexRouter);
app.use('/' + apiName + '/courses/', coursesRouter);
app.use('/' + apiName + '/users/', usersRouter);

if (enableDebug) {
  app.use('/' + apiName + '/debug/', debugRouter);
}

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
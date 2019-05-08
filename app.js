var createError = require('http-errors');
var express = require('express');

var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
let bodyParser = require('body-parser');
const mongoose = require('mongoose');
const hbs = require('hbs');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/user.route');
const authRouter = require('./routes/auth.route');
const videosRouter = require('./routes/videos.route');

let dev_db_url = require('./mongooseConfig').url;
let mongoDB = dev_db_url;
mongoose.connect(mongoDB, {useNewUrlParser: true}).catch((reason) => {
  console.log('Unable to connect to the mongodb instance. Error: ', reason);
});
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

hbs.registerPartials(__dirname + '/views/partials');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', indexRouter);
app.use('/', authRouter);
app.use('/videos', videosRouter);
app.use('/users', usersRouter);

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

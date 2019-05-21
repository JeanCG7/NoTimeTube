const createError = require('http-errors');
const express = require('express');

const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const hbs = require('hbs');
const Grid = require('gridfs-stream');
const methodOverride = require('method-override');

require('dotenv-safe').load();

const passport = require('passport');
const session = require('express-session');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/user.route');
const authRouter = require('./routes/auth.route');
const videosRouter = require('./routes/videos.route');

const dev_db_url = require('./mongooseConfig').url;
const mongoDB = dev_db_url;
const conn = mongoose.createConnection(mongoDB, {useNewUrlParser: true});

let gfs;

mongoose.connect(mongoDB, {useNewUrlParser: true}).catch((reason) => {
  console.log('Unable to connect to the mongodb instance. Error: ', reason);
});


// Inicializando a stream de upload
gfs = Grid(mongoose.connection, mongoose.mongo);
gfs.collection('files');


const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

hbs.registerPartials(__dirname + '/views/partials');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

// Passport config
require('./config/passport');
app.use(passport.initialize());
app.use(session({secret: process.env.SECRET, cookie: {maxAge: 60000}, resave: false, saveUninitialized: false}));

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

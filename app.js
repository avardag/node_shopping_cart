var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressHbs = require('express-handlebars');
var logger = require('morgan');
var mongoose = require("mongoose");
let session = require('express-session');
let passport = require("passport");
let flash = require("connect-flash");
let validator = require('express-validator');

var indexRouter = require('./routes/index');
var userRouter = require('./routes/user_routes');

var app = express();
//Mongoose setup
mongoose.connect("mongodb://localhost:27017/shopping_node", {useNewUrlParser: true});
//load passport local strategy
require("./config/passport_strategy")

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine(".hbs", expressHbs({defaultLayout: 'layout', extname: ".hbs"}))
app.set('view engine', '.hbs');

app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());
//validator should come after bodyParser
app.use(validator());
app.use(cookieParser());
//sesssion MWare
app.use(session({
  secret: 'supersecretword',
  resave: false,
  saveUninitialized: true
}))
//flash messages MW (has to come after sessions)
app.use(flash());
//passport middleware (has to come after sessions)
app.use(passport.initialize());
app.use(passport.session())
//Static files
app.use(express.static(path.join(__dirname, 'public')));

//ROUTES custom middleware
app.use((req, res, next)=>{
  //create custom global var userIsLoggedIn for all routes & views 2b used
  res.locals.userIsLoggedIn = req.isAuthenticated();
  next();
})
//ROUTES (order matters)
app.use('/user', userRouter);
app.use('/', indexRouter);

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

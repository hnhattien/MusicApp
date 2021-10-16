var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
let searchRouter = require("./routes/search")
let musicRouter = require("./routes/song");
let artistRouter = require("./routes/artist");
let albumRouter = require("./routes/album");
let adminRouter = require("./routes/admins/admin");
let categoryRouter = require("./routes/category");
let authRouter = require('./routes/auth/auth.js');
let notificationRouter = require('./routes/admins/notifications.js');

var passport = require('passport')
let flash = require('express-flash');
let bodyParser = require("body-parser");
var app = express();
const expressSession = require('express-session');
app.use(flash());
const session = {
  secret: `secretcode`,
  cookie: {path: '/', originalMaxAge: 50000000},
  resave: false,
  saveUninitialized: false
};
app.use(expressSession(session));
app.use(cookieParser("secretcode"));
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}))
app.use(passport.initialize());
app.use(passport.session());

const initPassport = require('./authenticate/PassportInit');



initPassport(passport);
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// app.use(logger('dev'));
app.use(bodyParser.json({limit: '50000mb'}));
app.use(express.urlencoded({ extended: false , limit: "50000mb"}));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/search',searchRouter);
app.use("/song",musicRouter);
app.use("/admin",adminRouter)
app.use("/artist",artistRouter)
app.use("/auth", authRouter);
app.use("/category",categoryRouter);
app.use('/album',albumRouter);
app.use("/notifications",notificationRouter);
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

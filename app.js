// var createError = require('http-errors')
var express = require('express');
var path = require('path');
var logger = require('morgan');
// var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
// var session = require('express-session');
// var FileStore = require('session-file-store')(session);
var passport = require('passport')
// var authenticate = require('./authenticate');
var usersRouter = require('./routes/users');
var indexRouter = require('./routes/index');
var config = require('./config');

const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

// Connection URL
const url = config.mongoUrl;
const connect = mongoose.connect(url, {
    useMongoClient: true,
    /* other options */
  });

connect.then((db) => {
    console.log("Connected correctly to server");
}, (err) => { console.log(err); });

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('views', path.join(__dirname));
app.set('view engine', 'html');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/node_modules'));
app.use(express.static(__dirname + '/'));

// Secure traffic only
// app.all('*', (req, res, next) => {
//   if (req.secure) {
//     return next();
//   }
//   else {
//     res.redirect(307, 'https://' + req.hostname + ':' + app.get('secPort') + req.url);
//   }
// });

app.use(passport.initialize());

app.use('/',indexRouter);
app.use('/users',usersRouter);

app.use(express.static(path.join(__dirname+'../public')));
// app.use('/dishes',dishRouter);
// app.use('/promotions',promoRouter);
// app.use('/leaders',leaderRouter);
// app.use('/imageUpload',uploadRouter);
// app.use('/favorites', favoriteRouter);
var server = app.listen(8081, function () {
  var host = server.address().address
  var port = server.address().port
  
  console.log("Example app listening at http://"+host+":"+port);
})
// console.log("Express server running");
module.exports = app;
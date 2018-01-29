var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var ejs = require('ejs');
var mongoose = require('mongoose')

var index = require('./routes/index');
var home = require('./routes/home');
var users = require('./routes/users');
var nav = require('./routes/nav');
var commodity = require('./routes/commodity');
var accessories = require('./routes/accessories');
var thisweek = require('./routes/thisweek');
var hotsearch = require('./routes/hotSearch');
var search = require('./routes/search');
var commodityItem = require('./routes/commodity_item');

var app = express();
// 视图引擎设置
app.set('views', path.join(__dirname, 'views'));
app.engine('.html', ejs.__express)
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// 连接MongoDB数据库
mongoose.connect('mongodb://127.0.0.1:27017/vue')  // 不加密
// mongoose.connect('mongodb://root:123456@127.0.0.1:27017/dumall')    //加密

mongoose.connection.on('connected', function () {
    console.log("mongoDB 连接成功")
})

mongoose.connection.on('error', function () {
    console.log("mongoDB 连接失败")
})

mongoose.connection.on("disconnected", function() {
    console.log("mongoDB 断开")
})

app.use('/', index);
app.use('/home', home);
app.use('/users', users);
app.use('/navlist', nav);
app.use('/commodity', commodity);
app.use('/accessories', accessories);
app.use('/thisweek', thisweek);
app.use('/hotsearch', hotsearch);
app.use('/search', search);
app.use('/commodityItem', commodityItem);

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

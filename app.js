var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var fs = require('fs')
var FileStreamRotator = require('file-stream-rotator')
var env = process.env.NODE_ENV || 'development'

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var photosRouter = require('./routes/photos');
var pmRouter = require('./routes/pm25');

var app = express();

if ('production' == env) {

}

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//日志
app.use(logger('dev'));
var logPath = path.join(__dirname, 'logs')
fs.existsSync(logPath) || fs.mkdirSync(logPath)

var accessLogStream = FileStreamRotator.getStream({
    filename: logPath + '/%DATE%.log',
    frequency: 'daily',
    verbose: false
})
app.use(logger('combined', {stream: accessLogStream}))


app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//app.use ： 用来给path注册中间函数的。这个path默认是“/”，也就是处理任何请求，同时注意的是他会处理path下的子路径，如果设置path为‘/hello’,那么请求路径为‘/hello/’,'/hello/nihao','/hello/bye'这样的请求都会交给中间函数处理的。
//于是我们现在知道了app.use(express.static(_dirname + '/public'))是将所有请求，先交给express.static(_dirname + '/public')来处理一下
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/photos', photosRouter);
app.use('/pm25', pmRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    //app.locals和res.locals是express中用于渲染模板的两个对象.locals对象用于将数据传递至所渲染的模板中。
    //下面的message和error都会传递到当前的render页面里直接用于显示（渲染）
    //app.locals上通常挂载常量信息（如博客名，描述，作者信息），res.locals上通常挂载变量信息，即每次 请求的值可能不一样（如网站访问的用户名）。
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
    res.render('error');
    //上面四个指令等同于↓
    // res.status(err.status || 500).render('error', {
    //     message: err.message,
    //     error: req.app.get('env') === 'development' ? err : {}
    // })
});

module.exports = app;

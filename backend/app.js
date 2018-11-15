import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import open from 'open'
import webpackConfig from './webpack.config.dev'

//var webpackHotMiddleware = require('webpack-dev-middleware');
//var webpackDevMiddleware = require('webpack-hot-middleware');
//var open = require('open');
//var webpackConfig = require('./webpack.config.dev');

//var webpack = require('webpack');
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//importando las rutas
var authRouter = require('./routes/auth');
var runRouter = require('./routes/run');
var screenRouter = require('./routes/screen');

var app = express();

//requiriendpo webpack
const webpackCompiler = webpack(webpackConfig)

//Iniciando el servidor node con sockets
var server = require('http').Server(app);
var io = require('socket.io')(server);

//Set up mongoose connection
var mongoose = require('mongoose');
var mongoDB = 'mongodb+srv://usuario1:root12345@cluster0-a2ueb.mongodb.net/test?retryWrites=true';
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//compilando webpack
app.use(webpackDevMiddleware(webpackCompiler))
app.use(webpackHotMiddleware(webpackCompiler))

//middleware CORS para gestionar peticiones de puertos diferentes
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

//middleware para gestionar sockets io
app.use(function(req, res, next){
  res.io = io;
  next();
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Iniciando rutas
app.use('/auth', authRouter);
app.use('/run', runRouter);
app.use('/screen', screenRouter);

//enviando todo el tráfico restante a react.js (frontend)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/src/public/index.html'));
});
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

//exportando el modulo app
module.exports = {app: app, server: server};

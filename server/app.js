const path = require('path');
const express = require('express');
const mysql = require('mysql');
const logger = require('morgan');
const favicon = require('serve-favicon');
const methodOverride = require('method-override');
const cors = require('cors');
const multer = require('multer');
const bodyParser = require('body-parser');
const httpProxy = require('http-proxy-middleware');
const serveStatic = require('serve-static');
const createError = require('http-errors');

const { JWT_SECRET, JWT_AUTH_UNLESS_PATH } = require('./config');
const { mysqlConfig } = require('./config/plugin');
const { restify, jwtAuth } = require('./middlewares');
const apiRouter = require('./routers');

const app = express();
const isDev = process.env.NODE_ENV === 'development';

/* mysql connect */
const { HOST, PORT, USER, PASSWORD, DATABASE } = mysqlConfig;
app.set('mysql', mysql.createConnection({
  host: HOST,
  port: PORT,
  user: USER,
  password: PASSWORD,
  database: DATABASE
}));

/* view engine setup */
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

/* use General middlewares */
app.use(logger('dev'));
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(restify());
app.use(jwtAuth({ secret: JWT_SECRET }).unless({ path: JWT_AUTH_UNLESS_PATH }));
app.use(methodOverride());
app.use(cors({
  credentials: true,
  origin: 'http://localhost:8888'
}));
app.use(multer().any());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false,
  limit: 2 * 1024 * 1024
}));

/* use Static router middlewares */
if (isDev) {
  app.use('/public', httpProxy({ target: 'http://localhost' }));
} else {
  app.use('/public', serveStatic(path.join(__dirname, 'public')));
}

/* use API router middlewares */
app.use('/api', apiRouter);

/* use UI router middlewares */

/* catch 404 and forward to error handler */
app.use((req, res, next) => {
  next(createError(404));
});

/* error handler */
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  // res.locals.message = err.message
  // res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500);
  if (err.message instanceof Object) {
    res.json(err.message);
  } else {
    res.end();
  }
  // res.render('error');
});

module.exports = app;

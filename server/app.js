var express = require('express');
var path = require('path');
//var favicon = require('serve-favicon');

console.log('Initializing app.js file====>');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors');
var jade = require('pug');

var index = require('./routes/index');
var login = require('./routes/login');
var regusers = require('./routes/regusers');

var debug = require('debug')('server:server');
var http = require('http');

var app = express();

app.use(cors()) // <--- CORS

console.log('Initializing app.js file====>2');
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
console.log('Initializing app.js file====>3');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

/**
 * Get port from environment and store in Express.
 */

//var port = normalizePort(process.env.PORT || '3000');
var port = Number(process.env.PORT || 5000);
app.set('port', port);
//console.log('process.env=====> ' + process.env);
console.log('process.env.PORT=====> ' + process.env.PORT);

/**
 * Create HTTP server.
 */

var server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */


server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

console.log('Server listening on port ' + port);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}



app.use(logger('dev'));
app.use(logger('production'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

console.log('Initializing app.js file====>4');
//app.use('/*', index); //<-- COMMENT THIS
app.get('/*', function(req, res) {
  console.log('Calling index.html===>');
  res.sendFile(path.join(__dirname + '/dist/index.html'));
});

console.log('Initializing app.js file====>5');
app.use('/api/login', login);
app.use('/api/regusers', regusers);

// In production, we'll actually serve our angular app from express
if (app.get('env') === 'production') {
  app.use(express.static(path.join(__dirname, '/dist')));

  // production error handler
  // no stacktraces leaked to user
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: {}
    });
  });
}

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
  res.locals.error = req.app.get('env') === 'development' ? err : err; //{};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

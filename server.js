var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());

app.all('/*', function(req, res, next) {
  // CORS headers
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'GET,POST');
  // Set custom headers for CORS
  res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key');
  next();
});


// Auth Middleware - This will check if the token is valid
app.all('/api/*', require('./validation/validateToken.js'));

//This handles the login and register
app.use('/', require('./routes'));

app.get('/', function(req, res){
res.sendFile(__dirname + '/pages/main.html');
});

// If no route is matched by now, it must be a 404
app.use(function(req, res, next) {
  // var err = new Error('Not Found');
  // err.status = 404;
  // next(err);
  res.status(404);
  res.json({
    "error":"Page Not Found"
  })

});

// Start the server
app.set('port', process.env.PORT || 3005);

// Connect to our databse
var promise = mongoose.connect(require('./config.js').database, {
  useMongoClient: true,
})

var server = app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + server.address().port);
});

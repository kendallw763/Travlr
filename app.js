//the application 'requires these files paths to access website elements/properties
//unchageable variables

const createError =  require('http-errors');
const express = require('express');
const path = require('path');
const logger = require('logger');
const cookieParser = require('cookie-parser');
const hbs = require('hbs');

var indexRouter = require('./app_server/routes/index');
var usersRouter = require('./app_server/routes/users');
var travelRouter = require('./app_server/routes/travel');
var handlebars = require('hbs');


var app = express();


app.use(logger('dev'));
app.use(expres.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(patj.join(__dirname, 'public')));



// view engine setup
app.set('views', path.join(__dirname, 'app_server', 'views'));

//register handlebar partials
handlebars.registerPartials(__dirname + '/app_server/views/partials');

app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


//enable CORS
app.use('/api', (req, res, next)=>{
  res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.header('Access-Control-Allow-Headers', 'Origin, x-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PULL, DELETE')
  next();
});

//catch unauthorized errors and cerate 401 message
//the arguments passed the the arrow function are for errors handling, requests, 
//response, and next
app.use((req, res, next, err)=>{
  if(err.name === 'unauthorizedError'){//if the name of the err 'is'
    //unauthorized error...
    res//the response to the client-facing side of the application will be
      .status(401) //the message displayed to the user as a 401 status
      //with the json string of the error name concatenated with a colon 
      //to represent following information. 
      //in this case, the message is the actual error message intialized previously
      //within the application
      .json({"message": err.name + ":" + err.message});
  }

});

//write-up the routes to controllers
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/' , travelRouter);
app.use('/api', apiRouter);

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

//connect file by require
require('./app_server/modules/db');

//connect mongoose to the database
const dbURI = 'mongodb://localhost/loc8r';

//This tells mongooose to use the URI  new parser
mongoose.connect(dbURI, {newUserParser:true});

module.exports = app;

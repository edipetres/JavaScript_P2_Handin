var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var pug = require('pug');
var session = require('express-session');


var myJokes = require('./model/jokes')

// var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ secret: 'secret_3162735', saveUninitialized: true, resave: true }));

//app.use('/', index);
app.use('/users', users);

app.use(function (req, res, next) {
  // check if username is attached to the session
  console.log("Session: " + session.username);

  if (typeof session.username === 'undefined') {
    // check whether username is in the request body
    if (typeof req.body.username === 'string') {
      session.username = req.body.username;
      return res.redirect('/');
    }
    else {
      // no username found
      // req.url = '/login';
      return next();
    }
  }
  else {
    // logged in
    return next();
  }
});

// REST API
app.get('/api/joke/random', function(req, res) {
  res.send(myJokes.getRandomJoke());
});
app.get('/api/jokes', function(req, res) {
  res.json(myJokes.allJokes);
});
app.post('/api/joke', function(req, res, next) {
  var submittedJoke = req.body.joke;
  if (submittedJoke) {
    myJokes.addJoke(submittedJoke);
    res.json(submittedJoke);
  }
  res.send("Something went wrong..");
})

app.get('/', function (req, res) {
  res.render('index', { username: session.username });
});

app.get('/login', function (req, res) {
  res.render('login');
});

app.get('/joke', function (req, res) {
  // tracking usage
  if (req.session.jokeCount) {
    req.session.jokeCount += 1;
  }
  else {
    req.session.jokeCount = 1;
  }
  console.log("/joke visited " + req.session.jokeCount + " times.")
  res.render("joke", { joke: myJokes.getRandomJoke() });
});

app.get('/alljokes', function (req, res) {
  if (req.session.jokesCount) {
    req.session.jokesCount += 1;
  }
  else {
    req.session.jokesCount = 1;
  }
  console.log("/joke visited " + req.session.jokesCount + " times.")

  res.render("alljokes", { alljokes: myJokes.allJokes });
});

app.get('/addjoke', function (req, res) {
  res.render('addjoke');
});

app.post('/storejoke', function (req, res) {
  var newjoke = req.body.newjoke;
  if (typeof newjoke != 'undefined') {
    myJokes.addJoke(newjoke);
    console.log("new joke added: " + newjoke)
    if (req.session.newJoke) {
      req.session.newJoke += 1;
    }
    else {
      req.session.newJoke = 1;
    }
    console.log("/joke visited " + req.session.newJoke + " times.")
  }
  res.redirect('/alljokes')
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;

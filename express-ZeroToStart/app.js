var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')
var routes = require('./routes/index')

var app = express();

app.set('views', path.join(__dirname, 'views'));//Actually the default view folder
app.set('view engine', 'jade');//allow us to leave out the extension

app.use(favicon(path.join(__dirname, 'public','images','favicon.ico')));
app.use(logger('dev'));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/*app.get("/", function(req,res) {
    res.render('index', {title: 'Express'})
});*/

app.use("/", routes);

var names = [];
app.get('/form', function (req, res) {
  //res.send("Hi: "+names.join(",")+"<form method='post'><input name='name'></form>");
  res.render('form', {title:"This is FORM!", message:"It is the right place you've come."})
});

app.post('/form', function (req, res) {
  names.push(req.body.name);
  res.redirect('/form');
});

app.post('/names', function (req, res) {
  names.push(req.body); //We receive it as a JavaScript object
  console.log(JSON.stringify(req.body)); 
  res.redirect('/form');
});

app.use(function(req,res,next) {
    var err = new Error("Page not found");
    err.status = 404;
    next(err);
});

app.use(function(err,req,res,next) {
    res.status(err.status || 500);
    //res.send("<h1>Sorry there was a problem: " + err.message + "</h1><p>" + err.message + "</p>");
    res.render('index', {title: "Big problem!"})

});

module.exports = app;
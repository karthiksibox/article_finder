var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongo = require('mongodb');
var monk = require('monk');

pg_db = require('./db');

//pg_db=require('./db');
var app = express();
var router=express.Router();
var route=require('./routes/');
app.set('views', path.join(__dirname, 'views'));

db = monk('localhost:27017/articles');
app.set('view engine', 'jade');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

router.get('/',route.index);
router.get('/suggestions',route.suggestions);
router.get('/search',route.search);
router.post('/update',route.update);
router.post('/run_query',route.run_query);
router.post('/save_suggestion',route.save_suggestion);
router.post('/change_env',route.change_env);

app.use('/',router)


app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;

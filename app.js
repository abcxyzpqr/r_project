/**
 * Module dependencies.
 */

var express = require('express'),
    routes = require('./routes'),
    http = require('http');

var bodyParser = require('body-parser')
var app = express();

// Configuration

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

//app.use(express.bodyParser());

// Routes

app.listen(5000, function() {
    console.log("Express server listening ");
});
app.use(bodyParser.json({
    limit: '5mb'

}));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.get('/', function(req, res) {
    res.send("hello")
});
var api = require('./api/index.js');
app.use(api);
module.exports = app;

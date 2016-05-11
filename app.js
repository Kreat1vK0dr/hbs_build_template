'use strict';

var express = require('express'),
    exphbs = require('express-handlebars'),
    path = require('path'),
    mysql = require('mysql'),
    myConnection = require('express-myconnection'),
    bodyParser = require('body-parser');
    
// Setting up database access options.
// var dbOptions = {
//     host: 'localhost',
//     user: '<username',
//     password: '<password>',
//     port: 3306,
//     database: '<app_name>'
// };

// Initialising express environment.
var app = express();
// Setting port.
app.set('port', (process.env.PORT || 3030));

// SETUP
app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

app.use(express.static('public'));
// app.use(myConnection(mysql, dbOptions, 'single'));
// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: false
}));
// Parse application/json
app.use(bodyParser.json());

// ROUTES
app.get('/', function (req, res) {
    res.redirect("/home");
});

app.get('/home', function (req, res) {
    res.render("home");
});

app.listen(app.get('port'), function () {
    console.log('Node app is running on port', app.get('port'));
});

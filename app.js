'use strict';

var express = require('express'),
    exphbs = require('express-handlebars'),
    path = require('path'),
    mysql = require('mysql'),
    myConnection = require('express-myconnection'),
    bodyParser = require('body-parser'),
    sassMiddleware = require('node-sass-middleware'),
    postcssMiddleware = require('postcss-middleware'),
    autoprefixer = require('autoprefixer'),
    gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    gzip = require('gulp-gzip'),
    sourcemaps = require('gulp-sourcemaps'),
    cleanCSS = require('gulp-clean-css'),
    sass = require('gulp-sass');

// Setting up database access options.
// var dbOptions = {
//     host: 'localhost',
//     user: 'root',
//     password: '1amdan13l',
//     port: 3306,
//     database: 'app_name'
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
// Setting up middleware
app.use('/css', sassMiddleware({
    src: path.join(__dirname, 'dev', 'sass'),
    dest: path.join(__dirname, 'public', 'css'),
    debug: true,
    outputStyle: 'expanded',
    indentedSyntax: true,
    sourceMap:"./public/css"
    // prefix: '/css' // Where prefix is at <link rel="stylesheets" href="prefix/style.css"/>
}));

// app.use(postcssMiddleware({
//     src: function (req) {
//         return path.join(req.path);
//     },
//     plugins: [autoprefixer({
//         browsers: ['> 1%', 'IE 7', 'last 2 versions'],
//         cascade: false
//     })]
// }));

// gulp.task('generateScriptSourceMap', function () {
//     gulp.src('./dev/scripts/*.js')
//         .pipe(sourcemaps.init())
//         .pipe(concat('main.js'))
//         .pipe(sourcemaps.write())
//         .pipe(gulp.dest('./public/js'));
// });


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

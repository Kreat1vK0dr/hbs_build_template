// MUST RUN $ sudo gulp nodemon

var gulp = require('gulp'),
    sourcemaps = require('gulp-sourcemaps'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    sass = require('gulp-sass'),
    cleanCSS = require('gulp-clean-css'),
    autoprefixer = require('gulp-autoprefixer'),
    gzip = require('gulp-gzip'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    nodemon = require('gulp-nodemon'),
    watch = require('gulp-watch');


// {outputStyle: 'expanded', includePaths: ['sass']}

// gulp.task('bundle-sass', function() {
//   gulp.src('./dev/sass/main.sass')
//   .pipe(sass({includePaths: ['./dev/sass'],
//   indentedSyntax: true,
//   sourceMap: true,
//   outFile: './public/css',
//   outputStyle: 'expanded',
//   data: 'file'}).on('error', sass.logError))
//   .pipe(gulp.dest('./public/css'));
// });

// Optimize Images task
gulp.task('compress-images', function() {
  return gulp.src('./public/assets/img/**/*.{gif,jpg,png}')
    .pipe(imagemin({
        progressive: true,
        interlaced: true,
        svgoPlugins: [ {removeViewBox:false}, {removeUselessStrokeAndFill:false} ]
    }))
    .pipe(gulp.dest('./public/assets/img'))
});

//OR THIS
gulp.task('bundle-sass', function() {
  gulp.src('./dev/sass/main.sass')
  .pipe(sourcemaps.init())
  .pipe(sass({includePaths: ['./dev/sass'],
  indentedSyntax: true,
  outputStyle: 'expanded',
  data: 'file'}).on('error', sass.logError))
  .pipe(sourcemaps.write('.'))

  .pipe(gulp.dest('./dev/css'));
});

gulp.task('minify-css', function () {
    gulp.src('./dev/css/main.css')
    .pipe(sourcemaps.init())
    .pipe(autoprefixer({
         browsers: ['last 2 versions'],
         cascade: false
         }))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(rename('main.min.css'))
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('./public/css'));
});

gulp.task('compress-css', function () {
    gulp.src('./public/css/main.min.css')
    .pipe(sourcemaps.init())
        .pipe(gzip())
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('./public/css'));
});

gulp.task('bundle-minify-scripts', function () {
    gulp.src('./dev/js/*.js')
        .pipe(sourcemaps.init())
        .pipe(concat('main.min.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('./public/js'));
});

gulp.task('compress-js', function () {
    gulp.src('./public/js/main.min.js')
        .pipe(sourcemaps.init())
        .pipe(gzip())
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('./public/js'));
});

gulp.task('watch', function() {
    gulp.watch('./dev/sass/*.sass', ['bundle-sass', 'minify-css','compress-css']);
    gulp.watch('./dev/js/*.js', ['bundle-minify-scripts','compress-js']);
    gulp.watch('./public/assets/images/**/*.{gif,jpg,png}', ['compress-images']);
});

gulp.task('nodemon', function () {
nodemon({ script: 'app.js'})
    .on('start', ['bundle-sass', 'minify-css','bundle-minify-scripts','compress-css','compress-js','compress-images','watch'], function () {
        console.log('start!');
    })
   .on('change', ['watch'], function () {
        console.log('changed!');
    })
    .on('restart', function () {
        console.log('restarted!');
   });
})

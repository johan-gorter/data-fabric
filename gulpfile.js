'use strict';

var del = require('del');
var gulp = require('gulp');
var browserify = require('browserify');
var browserSync = require('browser-sync');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var sourcemaps = require('gulp-sourcemaps');
var mocha = require('gulp-mocha');

var reload = browserSync.reload;

gulp.task('clean', del.bind(null, ['./build']));

gulp.task('scripts', function() {
  var bundler = browserify({
    entries: ['./web/js/main.js'],
    debug: true
  });
  return bundler
    .bundle()
    .pipe(source('main.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./build/js/'))
    .pipe(reload({stream: true}));
});

gulp.task('html', function() {
  gulp.src('./web/*.html')
    .pipe(gulp.dest('./build'))
    .pipe(reload({stream: true}));
});

gulp.task('serve', ['default'], function() {
  browserSync({
    port: 3001,
    notify: false,
    server: 'build'
  });

  gulp.watch('./web/js/**/*.js', ['scripts']);
  gulp.watch('./web/**/*.html', ['html']);
});

gulp.task('test', function () {
  return gulp.src('test/**/*.js', { read: false })
    .pipe(mocha({}));
});

gulp.task('default', ['scripts', 'html']);

const gulp = require('gulp'),
  livereload = require('gulp-livereload'),
  sass = require('gulp-sass'),
  autoprefixer = require('gulp-autoprefixer'),
  sourcemaps = require('gulp-sourcemaps');

gulp.task('sass', function () {
  gulp.src('./src/sass/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(autoprefixer('last 2 version'))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./src/css'));
});

gulp.task('watch', function() {
  livereload.listen();
  gulp.watch('./src/sass/**/*.scss', gulp.series('sass'));
  gulp.watch(['./src/css/style.css', './**/*.html.twig', './js/*.js'], function (files) {
    livereload.changed(files);
  });
});

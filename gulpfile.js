/**
 * Created by hepen on 6/19/2017.
 */
var gulp = require('gulp'),
    babel = require('gulp-babel'),
    livereload = require('gulp-livereload'),
    del = require('del'),
    gulpCopy = require('gulp-copy'),
    flatten = require('gulp-flatten');


gulp.task('sass', function() {
    return gulp.src('./src/styles/**/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./dist/styles/'));
});

gulp.task('apply-prod-environment', function() {
    process.env.NODE_ENV = 'production';
});

gulp.task('clean', function(cb) {
    return del(['dist'], cb)
});

gulp.task('copyStaticFile', function () {
    return gulp.src('./src/styles/**/*')
        .pipe(gulpCopy('./dist/styles/', {prefix:2}));
});

gulp.task('js', function() {
    return gulp.src('./src/**/*.js')
        .pipe(babel({"presets": ["react-app"]}))
        .pipe(gulp.dest('./dist/'));
});

gulp.task('watch', function () {
    /*gulp.watch('/src/styles/!**!/!*.scss', ['sass']);
    gulp.watch('/src/!**!/!*.js', ['js']);*/
    // Create LiveReload server
    livereload.listen();

    // Watch any files in dist/, reload on change
    gulp.watch(['mGlobal/**']).on('change', livereload.changed);
});

gulp.task('default', ['clean'], function () {
    gulp.start('apply-prod-environment', 'js', 'copyStaticFile');
});
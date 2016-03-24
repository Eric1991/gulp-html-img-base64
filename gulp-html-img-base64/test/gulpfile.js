var base64 = require('gulp-html-img-base64');
var gulp = require('gulp');

gulp.task('default', function () {

    return gulp.src('src/*.html')

        .pipe(base64({baseDir:'src'}))

        .pipe(gulp.dest('dist'));

});
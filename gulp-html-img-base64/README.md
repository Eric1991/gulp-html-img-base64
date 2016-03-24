# gulp-html-img-base64 #
### 基础功能
将html文件中的图片url转为base64.
    
var base64 = require('gulp-html-img-base64');
var gulp = require('gulp');

gulp.task('default', function () {

    return gulp.src('src/*.html')

        .pipe(base64({baseDir:'src'}))

        .pipe(gulp.dest('dist'));

});

var gulp = require('gulp');
var config = require('../config').nutella;
console.log('here');

gulp.task('nutella', function() {
    return gulp.src(config.src)
        .pipe(gulp.dest(config.dest));
});
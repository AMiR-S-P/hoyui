const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));

// Task to compile SCSS files
gulp.task('styles', function () {
  return gulp
    .src('./styles/*.scss') // مسیر فایل‌های SCSS
    .pipe(sass({ outputStyle: 'expanded' }).on('error', sass.logError)) // کامپایل کردن SCSS به CSS
    .pipe(gulp.dest('./styles')); // مسیر خروجی CSS
});

// Watch task for automatic compilation on file changes
gulp.task('watch', function () {
  gulp.watch('./styles/*.scss', gulp.series('styles'));
});

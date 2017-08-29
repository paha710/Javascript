const gulp = require('gulp'),
      imagemin = require('gulp-imagemin'),
      sass = require('gulp-sass'),
      concat = require('gulp-concat'),
      uglify = require('gulp-uglify'),
       pug = require('gulp-pug');

gulp.task('views', function() {
  gulp.src('src/templates/main.pug')
    .pipe(pug({
      filename: 'test.html'
    }))
    .pipe(gulp.dest('dist/html'))
});
/******Image optimize****/

gulp.task('image', () =>
gulp.src('src/img/*')
  .pipe(imagemin())
  .pipe(gulp.dest('dist/img'))
);

/******Min js****/
gulp.task('minjs', () =>
  gulp.src('src/js/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'))
);


/*****Sass *****/

gulp.task('sass', () =>
  gulp.src('src/sass/*.sass')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('dist/css'))
);

/******Scripts****/

gulp.task('scripts', () =>
  gulp.src('src/js/*.js')
    .pipe(concat('main.js'))
    .pipe(gulp.dest('dist/js/'))
);


/******Watch****/

gulp.task('watch', function () {
    gulp.watch('src/js/*.js' , ['scripts']);
    gulp.watch('src/img/*',['image']);
    gulp.watch('src/sass/*.sass',['sass']);
    gulp.watch('src/templates/*.pug',['views']);
});

gulp.task('default', ['watch']);
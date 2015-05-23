var 
  autoprefixer = require('gulp-autoprefixer'),
  browserSync  = require('browser-sync'),
  cache        = require('gulp-cache'),
  concat       = require('gulp-concat'),
  gulp         = require('gulp'),
  gutil        = require('gulp-util'),
  imagemin     = require('gulp-imagemin'),
  minifycss    = require('gulp-minify-css'),
  rename       = require('gulp-rename'),
  sass         = require('gulp-sass'),
  uglify       = require('gulp-uglify');

// gulp.task('browser-sync', function() {
//   browserSync({
//     server: {
//        baseDir: "./"
//     }
//   });
// });

gulp.task('browser-sync', function() {
  browserSync({
    proxy: "localhost"
  });
});

gulp.task('styles', function(){
  gulp.src(['src/**/*.scss'])
    .pipe(sass())
    .on('error', gutil.log)
    .pipe(autoprefixer('last 2 versions'))
    .on('error', gutil.log)
    // .pipe(minifycss())
    .pipe(gulp.dest('./'))
    .pipe(browserSync.reload({stream:true}))
});

gulp.task('img', function(){
  gulp.src('src/img/**/*')
    .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
    .pipe(gulp.dest('img/'))
});

gulp.task('scripts', function(){
  return gulp.src('src/**/*.js')
    .pipe(concat('main.js'))
    .on('error', gutil.log)
    .pipe(gulp.dest('js/'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .on('error', gutil.log)
    .pipe(gulp.dest('js/'))
    .pipe(browserSync.reload({stream:true}))
});

gulp.task('bs-reload', function () {
  browserSync.reload();
});

gulp.task('default', ['browser-sync'], function () {
  gulp.watch("src/**/*.scss", ['styles']);
  gulp.watch("src/**/*.js", ['scripts','bs-reload']);
  gulp.watch("src/img/**/*", ['img','bs-reload']);
  gulp.watch(["*.html", "*.php", "views/*.twig"], ['bs-reload']);
});
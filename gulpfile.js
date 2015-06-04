var
autoprefixer = require('gulp-autoprefixer'),
browserSync  = require('browser-sync'),
cache        = require('gulp-cache'),
concat       = require('gulp-concat'),
gulp         = require('gulp'),
gutil        = require('gulp-util'),
imagemin     = require('gulp-imagemin'),
minifycss    = require('gulp-minify-css'),
notify       = require("gulp-notify"),
pixrem       = require("gulp-pixrem"),
plumber      = require('gulp-plumber'),
rename       = require('gulp-rename'),
sass         = require('gulp-sass'),
sourcemaps   = require('gulp-sourcemaps'),
shell        = require('gulp-shell'),
uglify       = require('gulp-uglify')
;

gulp.task('sublime', shell.task([
  'subl .'
]))

gulp.task('browser-sync', function() {
	browserSync({
		server: { baseDir: "./" } // use this to server static pages
// 		proxy: "localhost/project-starter" // use this if your running a server like MAMP
	});
});

gulp.task('styles', function(){
	gulp.src(['src/**/*.scss'])
	.pipe(plumber({errorHandler: notify.onError("Sass error: <%= error.message %>")}))
	.pipe(sourcemaps.init())
	.pipe(sass())
	.on('error', gutil.log)
	.pipe(autoprefixer('last 2 versions', 'ie 8', 'ie 9'))
	.on('error', gutil.log)
	//.pipe(gulp.dest('./'))
	//.pipe(rename({suffix: '.min'}))
	.pipe(minifycss())
	.pipe(pixrem())
	.pipe(sourcemaps.write('./src'))
	.pipe(gulp.dest('./'))
	.pipe(browserSync.reload({stream:true}))
	.pipe(notify("Styles done."))
});

gulp.task('img', function(){
	gulp.src('src/img/**/*')
	.pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
	.pipe(gulp.dest('img/'))
	.pipe(notify("Images optimized."))
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
	.pipe(notify("js squished."))
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

gulp.task('s', ['sublime', 'default'] );
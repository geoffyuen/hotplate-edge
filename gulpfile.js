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
uglify       = require('gulp-uglify'),
svgstore     = require('gulp-svgstore'),
svgmin       = require('gulp-svgmin'),
svg2png      = require('gulp-svg2png')
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

gulp.task('bs-reload', function () {
	browserSync.reload();
});

gulp.task('styles', function(){
	gulp.src(['src/**/*.scss'])
	.pipe(plumber({errorHandler: notify.onError("Sass error: <%= error.message %>")}))
	.pipe(sourcemaps.init())
	.pipe(sass())
	.pipe(autoprefixer('last 2 versions', 'ie 8', 'ie 9'))
	.pipe(minifycss())
	.pipe(pixrem()) // remove this if you don't need to support IE8 or you don't use rems
	.pipe(sourcemaps.write('./src'))
	.pipe(gulp.dest('./'))
	.pipe(browserSync.reload({stream:true}))
	.pipe(notify("Styles done."))
});

gulp.task('img', function(){
	gulp.src('src/img/**/*')
	.pipe(plumber({errorHandler: notify.onError("Img error: <%= error.message %>")}))
	.pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
	.pipe(gulp.dest('img/'))
	.pipe(notify("Images optimized."))
});
gulp.task('svgstore', function () {
    return gulp
    .src('src/sprites/**/*.svg')
	.pipe(plumber({errorHandler: notify.onError("svgstore error: <%= error.message %>")}))
	.pipe(svgmin())
	.pipe(svgstore())
	.pipe(gulp.dest('./img'))
	.pipe(notify("SVG'ed"))
});
gulp.task('svg2png', function () {
	return gulp
	.src('src/sprites/**/*.svg')
	.pipe(plumber({errorHandler: notify.onError("svg2png error: <%= error.message %>")}))
	.pipe(svg2png())
	.pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
	.pipe(gulp.dest('./img'))
	.pipe(notify("SVGs 2 PNG"))
});

gulp.task('scripts', function(){
	return gulp.src('src/**/*.js')
	.pipe(plumber({errorHandler: notify.onError("JS error: <%= error.message %>")}))
	.pipe(concat('main.js'))
	.pipe(gulp.dest('js/'))
	.pipe(rename({suffix: '.min'}))
	.pipe(uglify())
	.pipe(gulp.dest('js/'))
	.pipe(browserSync.reload({stream:true}))
	.pipe(notify("js squished."))
});

gulp.task('default', ['browser-sync'], function () {
	gulp.watch("src/**/*.scss", ['styles']);
	gulp.watch("src/**/*.js", ['scripts','bs-reload']);
	gulp.watch("src/img/**/*", ['img','bs-reload']);
	gulp.watch("src/sprites/**/*.svg", ['svgstore', 'svg2png','bs-reload']);
	gulp.watch(["*.html", "*.php", "views/*.twig"], ['bs-reload']);
});

gulp.task('s', ['sublime', 'default'] );
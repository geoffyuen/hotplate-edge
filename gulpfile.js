// require('es6-promise').polyfill(); // Uncomment if old Node/npm
var
ie8 = false;

var
browserSync  = require('browser-sync'),
cache        = require('gulp-cache'),
concat       = require('gulp-concat'),
gulp         = require('gulp'),
// gutil        = require('gulp-util'),
imagemin     = require('gulp-imagemin'),
cssnano      = require('gulp-cssnano'),
notify       = require("gulp-notify"),
plumber      = require('gulp-plumber'),
rename       = require('gulp-rename'),
sass         = require('gulp-sass'),
sourcemaps   = require('gulp-sourcemaps'),
shell        = require('gulp-shell'),
uglify       = require('gulp-uglify'),
svgstore     = require('gulp-svgstore'),
svgmin       = require('gulp-svgmin')
;

if (ie8) {
	var
	pixrem       = require("gulp-pixrem"),
	svg2png      = require('gulp-svg2png')
	;
}


// start bs
gulp.task('browser-sync', function() {
	browserSync({
		server: { baseDir: "./" } // use this to serve static pages
		// proxy: "localhost:8888/project-starter" // use this if you're running a server like MAMP witht the default port
		// proxy: "localhost/project-starter" // use this if your running a server
	});
});

// trigger reload
gulp.task('bs-reload', function() {
	browserSync.reload();
});

// process ./src/styles.scss
gulp.task('styles', function(){
	return gulp
	.src(['src/**/*.scss'])
	.pipe(plumber({errorHandler: notify.onError("Sass error: <%= error.message %>")}))
	.pipe(sourcemaps.init())
	.pipe(sass( {outputStyle: 'nested'} ))
	.pipe(cssnano({
		autoprefixer: {
			browsers: ['last 2 versions','ie 8','ie 9','ie 10'],
			remove: false,
			flexbox: true,
			add: true
		}
	}))
	// .pipe(pixrem()) // for IE8 or you don't use rems
	.pipe(sourcemaps.write('./src'))
	.pipe(gulp.dest('./'))
	.pipe(browserSync.stream())
	// .pipe(browserSync.reload({stream:true}))
	.pipe(notify("Styles done."))
});

// optimize images (jpg, png, gif, svg)
gulp.task('img', function(){
	return gulp
	.src('src/img/**/*')
	.pipe(plumber({errorHandler: notify.onError("Img error: <%= error.message %>")}))
	.pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
	.pipe(gulp.dest('img/'))

	gulp.src('src/img/**/*.svg')
	.pipe(plumber({errorHandler: notify.onError("Img error: <%= error.message %>")}))
	.pipe(svgmin())
	.pipe(gulp.dest('img/'))
	.pipe(notify("Images optimized."))
});

// create svg spritesheet
gulp.task('svgstore', function() {
	return gulp
	.src('src/sprites/**/*.svg')
	.pipe(plumber({errorHandler: notify.onError("svgstore error: <%= error.message %>")}))
	.pipe(svgmin({
		plugins: [
			{ removeDoctype: true },
			{ removeComments: true }
		]
	}))
	.pipe(gulp.dest('src/sprites'))
	.pipe(svgstore())
	.pipe(gulp.dest('./img'))
	.pipe(notify("SVG'ed"))
});

// create png fallbacks for ie8
// gulp.task('svg2png', function() {
// 	return gulp
// 	.src('src/sprites/**/*.svg')
// 	.pipe(plumber({errorHandler: notify.onError("svg2png error: <%= error.message %>")}))
// 	.pipe(svg2png())
// 	.pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
// 	.pipe(gulp.dest('./img'))
// 	.pipe(notify("SVGs 2 PNG"))
// });

// compress js into ./js/main.js
gulp.task('scripts', function() {
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

gulp.task('phps', shell.task([
  'php -S localhost:8000'
]))

function mainprocess() {
	gulp.watch("src/**/*.scss", ['styles']);
	gulp.watch("src/**/*.js", ['scripts','bs-reload']);
	gulp.watch("src/img/**/*", ['img','bs-reload']);
	gulp.watch("src/sprites/**/*.svg", ['svgstore', 'bs-reload']);
	gulp.watch(["*.html", "*.php", "views/*.twig"], ['bs-reload']);	
}
// serve, sync and watch
gulp.task('default', ['browser-sync'], function() {
	mainprocess();
});

// serve and watch
gulp.task('cont', function() {
	mainprocess();
});

// open current folder in subblime
gulp.task('sublime', shell.task([
  'subl .'
]))

// fix permissions - do not run yet
gulp.task('chmod', shell.task([
  'sudo find . -type f -exec chmod 644 {} +; sudo find . -type d -exec chmod 755 {} +'
]))


gulp.task('s', ['sublime', 'default'] );
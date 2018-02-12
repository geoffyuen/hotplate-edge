// require('es6-promise').polyfill(); // Install and uncomment if old Node/npm

// Uncomment to disable nags
// export DISABLE_NOTIFIER=true;

var
//localurl          = "localhost:8888/yourprojectfolder",
localurl          = "test.test/hotplate-edge/index.html",
iamrunningaserver = true
;

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


// Start bs
gulp.task('browser-sync', function() {
	if ( iamrunningaserver ) {
		browserSync({
			proxy: localurl
		});
	} else {
		browserSync({
			server: { baseDir: "./" } // serve static pages
		});
	}
});


// Trigger reload
gulp.task('bs-reload', function() {
	browserSync.reload();
});


// Process ./src/styles.scss
gulp.task('styles', function(){
	return gulp
	.src(['src/**/*.scss'])
	.pipe(plumber({errorHandler: notify.onError("Sass error: <%= error.message %>")}))
	.pipe(sourcemaps.init())
	.pipe(sass( {outputStyle: 'nested'} ))
	.pipe(cssnano({
		autoprefixer: {
			browsers: ['last 2 versions','ie 10', 'ie 11'],
			remove: false,
			flexbox: true,
			add: true
		}
	}))
	.pipe(sourcemaps.write('./src'))
	.pipe(gulp.dest('./'))
	.pipe(browserSync.stream({match: '**/*.css'}))
	.pipe(notify("Styles done."))
});


// Optimize images (jpg, png, gif, svg)
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


// Create svg spritesheet
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


// Compress js into ./js/main.js
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


// The meat of our Gulp loop
function mainprocess() {
	gulp.watch("src/**/*.scss", ['styles']);
	gulp.watch("src/**/*.js", ['scripts','bs-reload']);
	gulp.watch("src/img/**/*", ['img','bs-reload']);
	gulp.watch("src/sprites/**/*.svg", ['svgstore', 'bs-reload']);
	gulp.watch(["*.html", "*.php", "templates/*.twig"], ['bs-reload']);
}


// Serve, sync and watch
gulp.task('default', ['browser-sync'], function() {
	mainprocess();
});

// require('es6-promise').polyfill(); // Install and uncomment if old Node/npm

// Uncomment to disable nags
// export DISABLE_NOTIFIER=true;

var localurl = false;
// var localurl = "flywheel.test";
// var localurl = "localhost:8888";

var phpserve = false;

var
  gulp = require("gulp"),
  // browserSync = require('browser-sync'),
  cache = require("gulp-cache"),
  concat = require("gulp-concat"),
  imagemin = require("gulp-imagemin"),
  cssnano = require("gulp-cssnano"),
  notify = require("gulp-notify"),
  plumber = require("gulp-plumber"),
  rename = require("gulp-rename"),
  sass = require("gulp-sass"),
  sourcemaps = require("gulp-sourcemaps"),
  uglify = require("gulp-uglify"),
  svgstore = require("gulp-svgstore"),
  svgmin = require("gulp-svgmin"),
  exec = require('child_process').exec;

// Old: gulp-browsersync start
gulp.task("browser-sync", function() {
  if (localurl == false) {
    browserSync({
      server: { baseDir: "./" } // serve static pages
    });
  } else {
    browserSync({
      proxy: localurl
    });
  }
});
// Old: BS trigger reload
gulp.task("bs-reload", function() {
  browserSync.reload();
});


// Global browser-sync start and watch
gulp.task('bs-serve-watch2', function() {
  if (localurl == false) {
    exec('browser-sync start -s -f "*.html, *.php, templates/**/*.twig, style.css, js/*.js, img/**/*"');
  } else {
    exec('browser-sync start -p "' + localurl + '" -f "*.html, *.php, templates/*.twig, style.css, js/*.js, img/*"');
  }
})


// Process ./src/styles.scss
gulp.task("styles", function() {
  return gulp
    .src(["src/_sass/*.scss"])
    .pipe(
      plumber({
        errorHandler: notify.onError("Sass error: <%= error.message %>")
      })
    )
    .pipe(sourcemaps.init())
    .pipe(sass({ outputStyle: "nested" }))
    .pipe(
      cssnano({
        autoprefixer: {
          browsers: ["last 2 versions", "ie 10", "ie 11"],
          remove: false,
          flexbox: true,
          add: true
        }
      })
    )
    .pipe(sourcemaps.write("./src"))
    .pipe(gulp.dest("./"))
    // .pipe(browserSync.stream({ match: "**/*.css" }))
    .pipe(notify("Styles done."));
});

// Optimize images (jpg, png, gif, svg)
gulp.task("img", function() {
  return gulp
    .src("src/img/**/*")
    .pipe(
      plumber({
        errorHandler: notify.onError("Img error: <%= error.message %>")
      })
    )
    .pipe(
      cache(
        imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })
      )
    )
    .pipe(gulp.dest("img/"));

  gulp
    .src("src/img/**/*.svg")
    .pipe(
      plumber({
        errorHandler: notify.onError("Img error: <%= error.message %>")
      })
    )
    .pipe(svgmin())
    .pipe(gulp.dest("img/"))
    .pipe(notify("Images optimized."));
});

// Create svg spritesheet
gulp.task("svgstore", function() {
  return gulp
    .src("src/sprites/**/*.svg")
    .pipe(
      plumber({
        errorHandler: notify.onError("svgstore error: <%= error.message %>")
      })
    )
    .pipe(
      svgmin({
        plugins: [{ removeDoctype: true }, { removeComments: true }]
      })
    )
    .pipe(gulp.dest("src/sprites"))
    .pipe(svgstore())
    .pipe(gulp.dest("./img"))
    .pipe(notify("SVG'ed"));
});

// Compress js into ./js/main.js
gulp.task("scripts", function() {
  return gulp
    .src("src/**/*.js")
    .pipe(
      plumber({
        errorHandler: notify.onError("JS error: <%= error.message %>")
      })
    )
    .pipe(concat("main.js"))
    .pipe(gulp.dest("js/"))
    .pipe(rename({ suffix: ".min" }))
    .pipe(uglify())
    .pipe(gulp.dest("js/"))
    // .pipe(browserSync.reload({ stream: true }))
    .pipe(notify("js squished."));
});

// The meat of our Gulp loop
function mainprocess() {
  gulp.watch("src/_sass/*.scss", ["styles"]);
  gulp.watch("src/**/*.js", ["scripts", "bs-reload"]);
  gulp.watch("src/img/**/*", ["img", "bs-reload"]);
  gulp.watch("src/sprites/**/*.svg", ["svgstore", "bs-reload"]);
  gulp.watch(["*.html", "*.php", "templates/*.twig"], ["bs-reload"]);
}
// ...without bs
function altprocess() {
  gulp.watch("src/_sass/*.scss", ["styles"]);
  gulp.watch("src/**/*.js", ["scripts"]);
  gulp.watch("src/img/**/*", ["img"]);
  gulp.watch("src/sprites/**/*.svg", ["svgstore"]);
}

// Serve, sync and watch
gulp.task("olddefault", ["browser-sync"], function() {
  mainprocess();
});
// Alt serve sync and watch
gulp.task("default", ["bs-serve-watch2"], function() {
  altprocess();
});
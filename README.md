# flexgrid + gulp starter

1. git clone https://github.com/geoffyuen/hotplate-edge.git
2. git init
2. npm install
3. edit gulpfile.js browsersync proxy line for your local server
4. gulp
5. Profit!

## Gulp Includes:

- Sass
- Autoprefixer
- Pixrem
- Sourcemapping
- Browsersync
- js concatenation
- js uglify
- image optimization
- svg spriting

## Folder Structure

- *src* contains scss, js and img/* images
- src/style.scss compliles to ./style.css
- src/js/* compiles to ./js/main.js and ./js/main.min.js
- src/img/* optimized to ./img
- src/svg/*.svg for svg icons compiles to /img and ajaxed in
- . should contain your html/php files

## style.scss

This file should just contain @imports.

### Requirements

- homebrew
- git
- npm

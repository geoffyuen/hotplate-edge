# A website project boillerplate

Features:

- modified html5boilerplate index.html support for IE 8+, removed of compatibily mode button
- Gulp for watching, compiling Sass, javascript, svg spritesheet and imageoptimization
- Browsersync for refreshing on save
- css grid framework and organization

## Get Started

1. `bower install https://github.com/geoffyuen/hotplate-edge.git && mv bower_components/hotplate-edge/* .`
2. `npm install`
3. edit gulpfile.js browsersync proxy line for your local server
4. `gulp`
5. Profit!

- `gulp` starts watching and opens a browser window/tab
- `gulp phps &` starts the built-in php server when you can then follow with another `gulp` command
- `gulp sublime` opens the current folder in Sublime Text
- `gulp s` opens the current folder in Sublime Text and runs `gulp`


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

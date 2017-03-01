---
layout: default
title: Gulp
---

## Folder Structure

- `src` contains scss, js and img/* images
	- `style.scss` compliles to `./style.css`
	- `sass/*` should contain all your sass files
	- `js/*` concats and minifies to `./js/main.js` and `./js/main.min.js`
	- `img/*` optimized to `./img`
	- `sprites/*.svg` for svg icons compiles to `/img/spritesheet.svg`
- `./` should contain your html/php/twig files
- `js` will contain your javascript. You should also put any vendor scripts in here
- `img` will contain any optimized png, jpg and spritesheets

----

## Gulp will perform the following tasks:

- Sass compilation
- Autoprefixer
- Sourcemapping
- Browsersync
- js concatenation + uglify
- png and jpg optimization
- svg spriting

### Web Server Configuration

#### Are you already running a webserver? (MAMP, Docker, Vagrant, etc):

Open the gulpfile.js. Edit the variables:

- `localurl = "yourlocalurl"` - eg. MAMP: `localurl = "localhost:8888/yourprojectfolder"`
- `iamrunningaserver = true`

#### You're not running a web server?

Open the gulpfile.js. Edit the variable:

- `iamrunningaserver = false`

Running `gulp` will start a webserver (using Browser-sync).
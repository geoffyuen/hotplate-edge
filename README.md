# Hotplate

## A boilerplate for websites and WordPress themes

Features Gulp, Sass, tiny CSS grid, HTML5BP, SVG spritesheets, IE8+:

- modified html5boilerplate index.html support for IE 8+, removed of compatibility mode button
- Gulp for watching, compiling Sass, javascript, svg spritesheet and imageoptimization
- Browsersync for refreshing on save
- css grid framework and organization
- https://github.com/geoffyuen/hotplate-edge

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

- npm
- bower

# Grid

There are 3 grids, inspired by Skeleton and Bootstrap, included with this boilerplate. All are **rowless**, meaning that you can insert countless columns inside a wrapper element. The columns will wrap to a "newline" if it's not able to fit on the current "row". This produces much less structural and unsemantic markup with typical float based grids like Bootstrap, Foundation, Bourbon, etc. Clearfixes are also not needed. All three grids have natively support **vertical alignment**. With the flexbox based grids, **equal heights** are also natively supported.

| SCSS Partial        | Tech                      | Gutters | support | Notes   |
|---------------------|---------------------------|---------|---------|---------|
| _hotplate-flexplus  | [Flexbox][1], [calc()][2] | margins | IE10+   | Default |
| _hotplate-grid      | Inline-block | padding    | IE8+    | For legacy browsers |
| _hotplate-flex      | [Flexbox][1] | padding    | IE10+   | Drop-in replacement for hotplate-grid |

It's highly recommend to use the default flexbox grid. With it you get equal height columns, can apply coloured backgrounds and custom padding to your columns. However it is bleeding edge and has not been in production nearly as long as the inline-block based grid. If you need to support legacy browsers like IE8 use inline-block based grid.

[1]: http://caniuse.com/#search=flexbox
[2]: http://caniuse.com/#search=calc

## Quickstart to using the grid

Three columns:

```
<div class="wrapper">
	<div class="col-4"></div>
	<div class="col-4"></div>
	<div class="col-4"></div>
</div>
```

Two rows of three columns

```
<div class="wrapper">
	<div class="col-4"></div>
	<div class="col-4"></div>
	<div class="col-4"></div>
	<div class="col-4"></div>
	<div class="col-4"></div>
	<div class="col-4"></div>
</div>
```

Header, content area, sidebar and footer

```
<div class="wrapper">
	<header class="col-12"></header>
	<section class="col-8"></section>
	<aside class="col-4"></aside>
	<footer class="col-12"></footer>
</div>
```

### Breakpoints

```
$xl: 1140px;
$lg: 960px;
$md: 768px;
$sm: 620px;
$xs: 480px;
$xxs:320px;
```

There are column classes that respond to each of the breakpoints listed above:

- col-xl-*
- col-lg-*
- col-md-* or col-*
- col-sm-*
- col-xs-*
- col-xxs-*

Where * is an number from 1-12.
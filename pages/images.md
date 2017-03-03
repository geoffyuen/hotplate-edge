---
layout: default
title: Images
---

## Image optimization

Save your png and jpg images into `./src/img`. Gulp tasks will make an optimized copy into `./img`.

## SVG Spritesheet

Prepare your icons in Sketch. Make sure they're constructed in such a way that when you select it, it is coloured black (#000000). Export that as a SVG into `./src/sprites` and it will be inserted into a a spritesheet in `./img/sprites.svg`.

### Javascript injection

- js loads spritesheet by ajax
- the icons are written to the console.log
- copy that into your html to use
- write css to size and colour

### Describe method to use 2 colours using fill, colour and currentColor.
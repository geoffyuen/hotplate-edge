---
layout: default
title: Sass
---

## Settings

`./src/_all-settings.scss`


````
    // Typography - applied in _html.scss
    $hp-basefontsize: 10px; // Base root size applied to <html> - 10 makes it easier to use em/rems;
    $hp-mobilefontsize: 1.4rem; // font size for mobile applied to <body>
    $hp-fontsize: 1.6rem; // font size for mobile applied to <body> at a media query
    $hp-fonts: sans-serif;
    $hp-headline-fonts: sans-serif;

    // Hotplate grid
    $hp-gutter: 1.4rem; // Gutter will be double this value!

    // Breakpoints
    $xl: 1140px;
    $lg: 960px;
    $md: 768px;
    $sm: 620px;
    $xs: 480px;
    // iphone6+?
    $xxs:320px;
````

## Z-index Management

`./src/_z-index.scss`

Instead of setting z-index values throughout your sass files consolidate them in here. This removes a lot of confusion and of how things are layered because you can see them all in one file.

### How to use

Create a sass list with the classes (or ids) you want to layer. The first class will have the highest index value and the bottomost the smallest. This list will visually map how elements are layered.

Define your list of classes/IDs:

````
$burger:
  '.bun--top'
  '.tomato'
  '.lettuce'
  '.cheese'
  '.patty'
  '.bun--bottom'
;
````

Call the layer mixin:

`@include lay-z-index($burger);`

You can pass an optional z-index value like so:

`@include lay-z-index($burger, 1000);`

1000 will be the lowest z-index and will increment by one for each class passed in the list

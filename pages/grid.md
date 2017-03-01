---
layout: default
title: Grid
---

## Grid

- inspired by Skeleton and Bootstrap, included with this boilerplate.
- **rowless**, meaning that you can insert countless columns inside a wrapper element. The columns will wrap to a "newline" if it's not able to fit on the current "row". This produces much less structural and unsemantic markup with typical float based grids like Bootstrap, Foundation, Bourbon, etc. Clearfixes are also not needed.
- you get equal height columns, can apply coloured backgrounds and custom padding to your columns.

### Quickstart to using the grid

Three columns:

```
<div class="wrapper">
	<div class="col-4"></div>
	<div class="col-4"></div>
	<div class="col-4"></div>
</div>
```

Two rows of three columns:

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

Header, content area, sidebar and footer:

```
<div class="wrapper">
	<header class="col-12"></header>
	<section class="col-8"></section>
	<aside class="col-4"></aside>
	<footer class="col-12"></footer>
</div>
```

### Breakpoints

The use the classes below in your html to layout pages. Use the varibles in your Sass files to perform media queries using the `media` or `undermedia` mixins.


Width  |Class            |Sass Var
:------|:----------------|:--------
1140px |col-xl-*         |$xl
960px  |col-lg-*         |$lg
768px  |col-md-* or col-*|$md
620px  |col-sm-*         |$sm
480px  |col-xs-*         |$xs
default|col-xxs-*        |$xxs

The * denotes number from 1-12. Combine the column classes on an element to change it's width depending on how wide the browser viewport is.

#### HTML Example:

```
<div class="wrapper">
	<div class="col-xxs-6 col-md-12 col-xl-4"></div>
</div>
```

The column above will display at half-width column on mobile, full width at tablet and then down to a third-width column widescreen monitor.

#### Responsive mixins:

```
@include media() {
	your rules go here;
}
```

This translates to:

```
@media (min-width: 768px) {
	your rules are here;
}
```

If you want a specific breakpoint pass one of the breakpoint variables or your own (in ems, px, etc):

```
@include media($sm) {
	your rules go here;
}
```

```
@include media(5em) {
	your rules go here;
}
```

To write media queries below a breakpoint:

```
@include undermedia($lg) {
	your rules go here;
}
```

This translates to:

```
@media (max-width: 959px) {
	your rules are here;
}
```
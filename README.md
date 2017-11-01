# Starting Project (@flinbu)

Use this repository to start a new project compiling SCSS, JS and optimizing images. Also include Browser Sync to have live changes in the site.

## Getting Started

This is build under Node-JS with npm, you have to download and install the dependencies before run the test command.

### Prerequisites

Node-JS and global Gulp.js installed

1. Install Node-JS from [here](https://nodejs.org/en/)
2. Install global Gulp.js, run in terminal

```
npm install -g gulp
```
Maybe you need to run this like sudo (Unix)

In Windows, open terminal like Administrator navigate to project folder and run command.

### Installing project

Once you have Node-JS and Gulp.js you need to install dependencies (node modules) to run compile and test commands, without this, you can start.

Simply run the command in terminal:

```
npm install
```
That's all!

### Setting up automation
Open file `gulpfile.js` and edit the project constant, only edit this, if you modified other parts of the file, the automation tasks will fail.

First edit the project info like title, nice name, slug and filenames:

```
const project = {
    title: 'Project title', //Project title
    name: 'project-title', //Project nice name
    slug: 'project-title', //Project slug
    filenames: {
        js: 'project.scripts', //Compiled CSS filename without .css extension
        css: 'project.css' //Compiles JS filename without .js extension
    },
    ...
```

Now configure the Browser Sync plugin, only modified if you have a PHP application or another type that requires run Apache or something like that, set `proxy: true` and submit the url to bypass `url: 'http://localhost/project-local/build'`:

```
const project = {
    ...
    serve: {
        proxy: false,
        dir: 'build',
        url: 'http://localhost/project-local/build'
    },
    ...
```

You can setup dependencies that you want to include in build, don't copy and paste third party files in build folder because can be deleted in compiling tasks.

By default, the next dependencies are configured:

* Webfont.js (to load Google Fonts)
* jQuery (minified last version)
* Popper.js (required by Bootstrap)
* Tether (required by Bootstrap)
* Bootstrap JS (SCSS file is imported in SCSS main file)
* Embed Videos (Script that embed Youtube and Vimeo videos asynchronously)
* OWL Carousel JS Files (SCSS on main SCSS file)
* Clipboard.js (To use clipboard HTML 5 API)
* SVG Icons (JS plugin to include SVG icons in the HTML)

To use your own dependencies modified de `dependencies` property:

```
const project = {
    ...
    dependencies: {
    	 //If you don't have any to import, set property to false
        css: false,
        js: [
        	  //To import local file
            {
                src: 'path/to/file', //From
                build: 'build/assets/js' //To
            },
            //To download file
            {
                download: 'https://file.url/to/import',
                build: 'build/assets/js'
            }
        ],
        images: [
            {
                src: 'src/images/info.txt',
                build: 'build/assets/images'
            }
        ],
        fonts: false,
        icons: false
    }
    ...
```
And that's all again!

## File structure
You will find in project folder a directory named "src", inside this you can find all the un-processed files of the project.

### src/scss (CSS)
CSS works with SCSS and use the [Bootstrap 4](http://getbootstrap.com/) framework, also [Font Awesome](http://fontawesome.io/) and [Bourbon.io](http://bourbon.io/).

The main file, where all the imports are made is `app.scss` here are imported:

* `_dependencies.scss` All the dependies was imported here.
* `_variables.scss` A set of vars to use in SCSS, fonts, colors, measurements.
* `_mixins.scss` Some mixins to use in SCSS, gradients, colors lists, and more.
* `_layout.scss` This is your file, here you can import all the files that you need.

Please feel free to use the structure with which you feel most comfortable as long as you respect the files already displayed.

Later we will explain the existing variables and mixins. 

### src/js
Here you have the Javascript to compile with some files. Ideally, keep the code (functions, variables and scripts in general) separate in individual files.

Tha main file is `app.js` here all called:

* `functions.js` Every function that you need for JS, you can put in here.
* `fonts.js` This file is very important, here you must configure the [Google Fonts](http://fonts.google.com) that you want to use on the site. Later it is explained.
* `utilities.js` By default some utilities are created.
* `custom.js` This is your file, all the custom JS code you have can put it in this file.

The compile task will concat and minified a single file.

### src/images
The images for the project. The images placed here will be processed to work in web.

### src/fonts
The custom fonts for the project. The fonts placed here will be processed to work in web.
By default some fonts are loaded for the project (Font Awesome), but if you need others you can place it in this folder. Importat: the fonts will be placed in `assets/fonts` in build folder.



## SCSS Variables

### font-main
Especifies the main font family in the site. Generally applied to `body`.

### font-titles
Font family used for headings.

### general-font-size
The root font size, is applied on body in `/layout/_base.scss` file.

### colors
Is a SASS list with the colors or color theme to use in all the CSS.

```
$colors: ( 
    gray-darker: #333333, 
    gray-dark: #666666, 
    gray: #999999, 
    gray-light: #BBBBBB, 
    gray-lighter: #F5F5F5, 
    gray-bg: #F9F9FB, 
    gray-blue: #323C47,
    black: #000000, 
    white: #FFFFFF, 
    red: #D8141A,
    blue: #4DA1FF
);
```

There are some pre defined colors, you can add or modified then. To get one color you can use de `color()` function.

### networks
Sass list with most used social networks colors. This is used on mixins like `social-colors` to create CSS rules.

The library [brand-colors](https://brandcolors.net/) is used to get the company colors.

```
$networks: (
    facebook: $bc-facebook,
    twitter: $bc-twitter,
    instagram: $bc-instagram,
    youtube: $bc-youtube,
    vimeo: $bc-vimeo-2,
    google: $bc-google,
    linkedin: $bc-linkedin,
    pinterest: $bc-pinterest,
    dribbble: $bc-dribbble-2,
    behance: $bc-behance,
    whatsapp: $bc-whatsapp
);
```

## SCSS Mixins and functions
### text-colors
Generates css rules to use text color from colors var.

###### Usage: 
`@include text-colors();`

###### Return:
```
...
.parent.black {
	color: #000000;
}
.parent.white {
	color: #ffffff;
}
.parent.red {
	color: #D8141A;
}
.parent.blue {
	color: #4DA1FF;
}
...
```
### bg-colors
Generates css rules to use background color from colors var.

###### Usage: 
`@include bg-colors();`

###### Return:
```
...
.parent.black {
	background-color: #000000;
}
.parent.white {
	background-color: #ffffff;
}
.parent.red {
	background-color: #D8141A;
}
.parent.blue {
	background-color: #4DA1FF;
}
...
```
### social-colors
Generates css rules to use text color from networks var. Same as `text-colors()`.

###### Usage: 
`@include social-colors();`

### social-bg-colors
Generates css rules to use text background color from networks var. Same as `bg-colors()`.

###### Usage: 
`@include social-bg-colors();`

### bg-gradient
Creates linear grandient in the selector, receives three var:

* **$from-color**: Initial color
* **$to-color**: Final color
* **$direction**: (option) (to bottom default) The gradient direction (to bottom, to top, to left, to right, 145deg, etc...)

###### Usage: 
`@include bg-gradient($gry-darker, $blue, 145deg);`

###### Return:
```
...
.selector {
	background: linear-gradient(145deg, #333333 0%, #4DA1FF 100%);
}
...
```

### color()
Color is a function that returns color from colors var.

###### Usage: 
`color: color(gray-darker);`

###### Return:
```
...
.selector {
	color: #333333;
}
...
```

## Components
Check the component [here](COMPONENTS.md)

## NPM Commands (build, compile)
There are some command task to execute the build and compiling process for the project.

To start coding and sync the changes in the browser use:
`npm test` or `gulp`, this command will build, initialize browser sync (node server) and the watch task.

Watch task will listen your src files and execute the correct command for that file, eg.: If you modified a .scss file in scss directory, watch task will execute `gulp css`, this regenerates all the CSS and inject it to the preview window open in your browser.

If you only wants to build the project without execute the server, just run `npm run build` or `gulp build`. This generates all the compiled project in build folder. There is a task for every thing in the project:

* `gulp` Is the default task that runs build, watch and node server.
* `gulp css` Regenerates images and css, the images are neccesary to run the postcss processor.
* `gulp js` Compiles the JS.
* `gulp html` Process the HTML.
* `gulp images` Process the images in images folders.
* `gulp images-deps` Process the images marked in dependencies.
* `gulp js-deps` Process the JS dependencies.
* `gulp build` Build the project.

if the commands do not work for you, it's probably because gulp is not installed globally on your computer; Go back to the beginning and follow the steps to install gulp in a global way.

## Built With

* [Bootstrap 4](http://getbootstrap.com/) - The web framework used
* [Node-JS](https://nodejs.org/en/) - The CORE
* [SCSS](http://sass-lang.com/) - CSS Preprocessor
* [PostCSS](http://postcss.org/) - CSS Preprocessor

## Authors

* **Felipe Linares** - *Initial work* - [flinbu](https://github.com/flinbu)

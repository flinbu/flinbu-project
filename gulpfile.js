'use strict';

//Project config
const project = {
    title: 'Project title',
    name: 'project-title',
    slug: 'project-title',
    filenames: {
        js: 'project.scripts',
        css: 'project.css'
    },
    serve: {
        proxy: false,
        dir: 'build',
        url: 'http://localhost/project-local/build'
    },
    dependencies: {
        css: false,
        js: [
            {
                download: 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js',
                build: 'build/assets/js'
            },
            {
                src: 'node_modules/jquery/dist/jquery.min.js',
                build: 'build/assets/js'
            },
            {
                download: 'https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.11.0/umd/popper.min.js',
                build: 'build/assets/js'
            },
            {
                src: 'node_modules/tether/dist/js/tether.min.js',
                build: 'build/assets/js'
            },
            {
                src: 'node_modules/bootstrap/dist/js/bootstrap.min.js',
                build: 'build/assets/js'
            },
            {
                src: 'node_modules/embedvideos/embed.videos.min.js',
                build: 'build/assets/js'
            },
            {
                src: 'node_modules/owl.carousel/dist/owl.carousel.min.js',
                build: 'build/assets/js'
            },
            {
                src: 'node_modules/clipboard/dist/clipboard.min.js',
                build: 'build/assets/js'
            },
            {
                src: 'node_modules/flinbu-svg-icons/svg-icons.min.js',
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
};


/////////////// DON'T MODIFIED FROM THIS POINT //////////////////////
const dir = {
        src: 'src',
        build: 'build'      
      },
      gulp = require('gulp'),
      gutil = require('gulp-util'),
      newer = require('gulp-newer'),
      imagemin = require('gulp-imagemin'),
      sass = require('gulp-sass'),
      postcss = require('gulp-postcss'),
      deporder = require('gulp-deporder'),
      concat = require('gulp-concat'),
      stripdebug = require('gulp-strip-debug'),
      uglify = require('gulp-uglify'),
      sourcemaps = require('gulp-sourcemaps'),
      rename = require('gulp-rename'),
      include = require('gulp-file-include'),
      download = require('gulp-download');

//Browser Sync
var browserSync = false;
var syncOpts;
if (project.serve.proxy) {
    syncOpts = {
        proxy: project.serve.url,
        files: dir.build + '/**/*',
        open: true,
        notify: true,
        logLevel: 'debug',
        ui: {
            post: 80001
        }
    };
} else {
    syncOpts = {
        server: {
            baseDir: './' + dir.build
        },
        files: dir.build + '/**/*',
        open: true,
        notify: true,
        logLevel: 'debug',
        ui: {
            post: 80001
        }
    }
}

//HTML Settings
var html = {
    src: [dir.src + '/html/*.html', dir.src + '/html/**/*.php'],
    build: dir.build,
    watch: [dir.src + '/html/*.html', dir.src + '/html/**/*.php', dir.src + '/html/modules/**/*']
};

//Images settings
var images = {
    src: dir.src + '/images/**/*',
    build: dir.build + '/assets/images',
    watch: dir.src + '/images/**/*',
    dependencies: false
};
if (project.dependencies.images) {
    images.dependencies = project.dependencies.images;
}

//Fonts settings
var fonts = {
    src: dir.src + '/fonts/**/*',
    build: dir.build + '/assets/fonts',
    watch: dir.src + '/fonts/**/*',
    needs: [
        {
            src: 'node_modules/font-awesome/fonts/**/*',
            build: dir.build + '/assets/fonts'
        }
    ],
    dependencies: false
};
if (project.dependencies.fonts) {
    fonts.dependencies = project.dependencies.fonts
}

//JS Settings
var js = {
    src: dir.src + '/js/**/*.js',
    build: dir.build + '/assets/js',
    watch: dir.src + '/js/**/*.js',
    dependencies: false
};
if (project.dependencies.js) {
    js.dependencies = project.dependencies.js;
}

var injectJS = '';
project.dependencies.js.forEach(function (dep) {
    var depSrc = (dep.src) ? dep.src : dep.download;
    var depSplit = depSrc.split('/');
    var depName = depSplit[depSplit.length - 1];
    injectJS = injectJS + '<script src="assets/js/' + depName + '"></script>' + '\n';
});
injectJS = injectJS + '<script src="assets/js/' + project.filenames.js + '.min.js"></script>';

//CSS Settings
var css = {
    src: dir.src + '/scss/app.scss',
    build: dir.build + '/assets/css',
    watch: dir.src + '/scss/**/*.scss',
    sassOpts: {
        outputStyle: 'nested',
        imagePath: images.build,
        precision: 3,
        errLogToConsole: true
    },
    processors: [
        require('postcss-assets')({
            loadPaths: ['/assets/images'],
            basePath: dir.build,
            baseUrl: images.build
        }),
        require('autoprefixer')({
            browsers: ['last 2 versions', '> 2%']
        }),
        require('css-mqpacker'),
        require('cssnano')
    ],
    dependencies: false
};
if (project.dependencies.css) {
    css.dependencies = project.dependencies.css;
}

var injectCSS = '<link rel="stylesheet" href="assets/css/' + project.filenames.css + '.css" type="text/css" />';

///////// TASKS ///////////
//Image processing
gulp.task('images-deps', () => {
    if (images.dependencies) {
        images.dependencies.forEach(function (dep) {
            if (dep.src) {
                gulp.src(dep.src)
                    .pipe(newer(dep.build))
                    .pipe(imagemin())
                    .pipe(gulp.dest(dep.build));
            }
            if (dep.download) {
                download(dep.download)
                    .pipe(imagemin())
                    .pipe(gulp.dest(dep.build));
            }
        });
    }
});
gulp.task('images', ['images-deps'], () => {
    gulp.src(images.src)
        .pipe(newer(images.build))
        .pipe(imagemin())
        .pipe(gulp.dest(images.build));
});

//CSS Processing
gulp.task('css-deps', () => {
    if (css.dependencies) {
        css.dependencies.forEach(function (dep) {
            if (dep.src) {
                gulp.src(dep.src)
                    .pipe(newer(dep.build))
                    .pipe(gulp.dest(dep.build));
            }
            if (dep.download) {
                download(dep.download)
                    .pipe(gulp.dest(dep.build));
            }
        });
    }
});
gulp.task('css', ['images'], () => {
    gulp.src(css.src)
        .pipe(sourcemaps.init())
        .pipe(sass(css.sassOpts))
        .pipe(postcss(css.processors))
        .pipe(rename(project.filenames.css + '.css'))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(css.build));
});

//HTML Processing
gulp.task('html', () => {
    gulp.src(html.src)
        .pipe(newer({
            dest: html.build,
            extra: html.build + '/modules/**/*'
        }))
        .pipe(include({
            context: {
                CSSFile: injectCSS,
                JSFile: injectJS,
                OGData: ''
            }
        }))
        .pipe(gulp.dest(html.build));
});

//JS Processing
gulp.task('js-deps', () => {
    if (js.dependencies) {
        js.dependencies.forEach(function (dep) {
            if (dep.src) {
                gulp.src(dep.src)
                    .pipe(gulp.dest(dep.build));
            };
            if (dep.download) {
                download(dep.download)
                    .pipe(gulp.dest(dep.build));
            };
        });
    }
});
gulp.task('js', () => {
    gulp.src(js.src)
        .pipe(deporder())
        .pipe(concat(project.filenames.js + '.js'))
        .pipe(stripdebug())
        .pipe(gulp.dest(js.build))
        .pipe(rename(project.filenames.js + '.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(js.build));
});

//Fonts Processing
gulp.task('fonts-deps', () => {
    if (fonts.dependencies) {
        gulp.src(fonts.dependencies)
            .pipe(gulp.dest(fonts.build));
    }
});
gulp.task('fonts', () => {
    gulp.src(fonts.src)
        .pipe(newer(fonts.build))
        .pipe(gulp.dest(fonts.build));

    if (fonts.needs) {
        fonts.needs.forEach(function (dep) {
            if (dep.src) {
                gulp.src(dep.src)
                    .pipe(gulp.dest(dep.build));
            };
            if (dep.download) {
                download(dep.download)
                    .pipe(gulp.dest(dep.build));
            };
        });
    }
});

//Build
gulp.task('build', ['html', 'css', 'js-deps', 'js', 'fonts-deps', 'fonts', 'css-deps']);

//Browser Sync
gulp.task('browsersync', () => {
    if (!browserSync) {
        browserSync = require('browser-sync').create();
        browserSync.init(syncOpts);
    }
});

//Watch
gulp.task('watch', ['browsersync'], () => {
    //HTML
    gulp.watch(html.watch, ['html']);

    //Images
    gulp.watch(images.watch, ['images']);

    //CSS
    gulp.watch(css.watch, ['css']);

    //Fonts
    gulp.watch(fonts.watch, ['fonts']);

    //JS
    gulp.watch(js.watch, ['js']);
});

gulp.task('watch-html', () => {
    gulp.watch(html.watch, ['html']);
});

//Defautl
gulp.task('default', ['build', 'watch']);
/* jshint node: true */ // For jsHint

'use strict';

/* PACKAGES
=====================================================================*/
var
  project = 'Pognali',
  tunnelName = project.toLowerCase(),
  // connect = require('gulp-connect-php'),
  bs = require('browser-sync').create();

var
  gulp = require('gulp'),
  gulpSync = require('gulp-sync')(gulp),
  notify = require('gulp-notify'),
  del = require('del'),
  jade = require('gulp-jade'),
  stylus = require('gulp-stylus'),
  sourcemaps = require('gulp-sourcemaps'),
  prefixes = require('gulp-autoprefixer'),
  csscomb = require('gulp-csscomb'),
  minifier = require('gulp-minifier'),
  htmlmin = require('gulp-html-minify'),
  beautifier = require('gulp-jsbeautifier'),
  rename = require('gulp-rename'),
  concat = require('gulp-concat'),
  imgOptim = require('gulp-imageoptim'),
  svgSprite = require('gulp-svg-sprites');


/* CLEANING FILES
=====================================================================*/
gulp.task('clearAll', function () {
  return del(['build/', 'public/']);
});

gulp.task('clearImg', function () {
  return del('build/img/*.*');
});

gulp.task('clearSvg', function () {
  return del('build/img/svg/*.svg');
});


/* MARKUP
=====================================================================*/
gulp.task('markup', function () {
  return gulp.src('src/jade/*.jade')
    .pipe(jade({
      pretty: true
    }).on('error', notify.onError(function (error) {
      return {
        title: 'JADE',
        message: error.message
      };
    })))
    // For working with PHP uncomment this lines
    // .pipe(rename({
    //   extname: '.php'
    // }))
    .pipe(beautifier())
    .pipe(gulp.dest('build/'))
    .on('end', bs.reload);
});

gulp.task('minifyMarkup', function () {
  return gulp.src('build/*.html')
    // When working with PHP comment minifying
    // .pipe(minifier({
      // minify: true,
      // minifyHTML: {
      //   collapseWhitespace: true,
      //   conservativeCollapse: true
      // }
    // }))
    .pipe(htmlmin())
    .pipe(gulp.dest('public/'));
});


/* STYLES
=====================================================================*/
gulp.task('styles', function () {
  return gulp.src('src/stylus/styles.styl')
    .pipe(sourcemaps.init())
    .pipe(stylus({
      'include css': true
    }).on('error', notify.onError(function (error) {
      return {
        title: 'STYLUS',
        message: error.message
      };
    })))
    .pipe(prefixes({
      browsers: ['> 0.15%'],
      cascade: true,
      grid: true
    }))
    .pipe(csscomb())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('build/styles/'))
    .pipe(bs.reload({
      stream: true
    }));
});

gulp.task('minifyStyles', function () {
  return gulp.src('build/styles/styles.css')
    .pipe(minifier({
      minify: true,
      minifyCSS: true
    }))
    .pipe(rename('styles.min.css'))
    .pipe(gulp.dest('public/styles/'));
});


/* SCRIPTS
=====================================================================*/
gulp.task('scripts', function () {
  return gulp.src('src/scripts/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(concat('bundle.js'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('build/scripts/'))
    .on('end', bs.reload);
});

gulp.task('minifyScripts', function () {
  return gulp.src('build/scripts/bundle.js')
    .pipe(minifier({
      minify: true,
      minifyJS: true
    }))
    .pipe(rename('bundle.min.js'))
    .pipe(gulp.dest('public/scripts/'));
});


/* PHP
=====================================================================*/
gulp.task('php', function () {
  return gulp.src('src/php/**/*.php')
    .pipe(gulp.dest('build/'))
    .on('end', bs.reload);
});


/* IMAGES
=====================================================================*/
gulp.task('images', ['clearImg'], function () {
  return gulp.src('src/images/*.*')
    .pipe(gulp.dest('build/images/'));
});

gulp.task('svg', ['clearSvg'], function () {
  return gulp.src('src/images/svg/*.svg')
    .pipe(gulp.dest('build/images/svg/'))
    .pipe(svgSprite({
      mode: "symbols",
      selector: "icon-%f",
      preview: false
    }))
    .pipe(rename('sprite-symbols.svg'))
    .pipe(gulp.dest('build/images/'));
});

gulp.task('optImg', function () {
  return gulp.src('build/images/**/*.{png,gif,jpg,jpeg}')
    .pipe(imgOptim.optimize({
      batchSize: 75
    }))
    .pipe(gulp.dest('public/images/'));
});


/* MOVING FILES
=====================================================================*/
gulp.task('toSrc', function () {
  // var moveBootstrap =  gulp.src('node_modules/bootstrap/dist/**/*.*')
  //   .pipe(gulp.dest('src/libs/bootstrap'));

  // var movejQuery =  gulp.src('node_modules/jquery/dist/jquery.min.js')
  //   .pipe(gulp.dest('src/libs/'));
});

gulp.task('toBuild', function () {
  var moveLibs = gulp.src('src/libs/**/*.*')
    .pipe(gulp.dest('build/libs/'));

  var moveFonts = gulp.src('src/fonts/**/*.*')
    .pipe(gulp.dest('build/fonts/'));

  var moveMedia = gulp.src('src/media/**/*.*')
    .pipe(gulp.dest('build/media/'));
});

gulp.task('toPublic', function () {
  var moveRootFiles = gulp.src(['.htaccess', '.gitignore', 'robots.txt'])
  .pipe(gulp.dest('public/'));

  var movePhp = gulp.src('build/*.php')
    .pipe(gulp.dest('public/'));

  var moveLibs = gulp.src('build/libs/**/*.*')
    .pipe(gulp.dest('public/libs/'));

  var moveFonts = gulp.src('build/fonts/**/*.*')
    .pipe(gulp.dest('public/fonts/'));

  var moveMedia = gulp.src('build/media/**/*.*')
    .pipe(gulp.dest('public/media/'));

  var moveImg = gulp.src('build/images/*.{ico,svg}')
    .pipe(gulp.dest('public/images/'));
});


/* STATIC SERVER & WATCHER
=====================================================================*/
gulp.task('server', function () {
  // To work with PHP comment this
  bs.init({
    server: { baseDir: 'build/' },
    tunnel: tunnelName,
    open: false,
    browser: 'Vivaldi'
  });

  // To work with PHP uncomment this
  // connect.server({base: 'build/'}, function (){
  //   bs.init({
  //     proxy: '127.0.0.1:8000',
  //     open: true,
  //     browser: 'Opera',
  //     tunnel: true,
  //     tunnel: tunnelName,
  //     baseDir: 'build/'
  //   });
  // });

  gulp.watch('src/jade/**/*.jade', ['markup']);
  gulp.watch('src/stylus/**/*.styl', ['styles']);
  gulp.watch('src/scripts/**/*.js', ['scripts']);
  gulp.watch('src/php/**/*.php', ['php']);
  gulp.watch('src/images/*.*', ['images']);
  gulp.watch('src/images/svg/*.svg', ['svg']);
});


/* TASKS
=====================================================================*/
gulp.task('default', gulpSync.sync([
  'clearAll',
  ['toSrc', 'toBuild', 'images'],
  ['svg', 'markup', 'styles', 'scripts', 'php'],
  'server'
]));

gulp.task('public', gulpSync.sync([
  'clearAll',
  ['toSrc', 'toBuild', 'images', 'svg', 'markup', 'styles', 'scripts'],
  ['toPublic', 'minifyMarkup', 'minifyStyles', 'minifyScripts'],
  'optImg'
]));

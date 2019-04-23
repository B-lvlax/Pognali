/* jshint node: true */

'use strict';

/* PACKAGES
=====================================================================*/
const
  project = 'Pognali',
  tunnelName = project.toLowerCase(),
  connect = require('gulp-connect-php'), // To work with PHP uncomment this
  bs = require('browser-sync').create();

const
  { src, dest, watch, series, parallel } = require('gulp'),
  notify = require('gulp-notify'),
  del = require('del'),
  jade = require('gulp-jade'),
  stylus = require('gulp-stylus'),
  prefixes = require('gulp-autoprefixer'),
  csscomb = require('gulp-csscomb'),
  minifier = require('gulp-minifier'),
  htmlmin = require('gulp-html-minify'),
  beautifier = require('gulp-jsbeautifier'),
  rename = require('gulp-rename'),
  concat = require('gulp-concat'),
  imgOptim = require('gulp-imageoptim'),
  svgSprite = require('gulp-svg-sprites'),
  rsync = require('gulp-rsync');


/* CLEANING FILES
=====================================================================*/
function clearAll() {
  return del(['build/', 'public/']);
}


/* MARKUP
=====================================================================*/
function markup() {
  return src('src/jade/*.jade')
    .pipe(jade({
      pretty: true
    }).on('error', notify.onError(function(error) {
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
    .pipe(dest('build/'))
    .on('end', bs.reload);
}

function minifyMarkup() {
  return src('build/*.html')
    .pipe(htmlmin())
    .pipe(dest('public/'));
}


/* STYLES
=====================================================================*/
function styles() {
  return src('src/stylus/styles.styl', { sourcemaps: true })
    .pipe(stylus({
      'include css': true
    }).on('error', notify.onError(function(error) {
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
    .pipe(dest('build/styles/', { sourcemaps: '.' }))
    .pipe(bs.reload({ stream: true }));
}

function minifyStyles() {
  return src('build/styles/styles.css')
    .pipe(minifier({
      minify: true,
      minifyCSS: true
    }))
    .pipe(rename({ extname: '.min.css'}))
    .pipe(dest('public/styles/'));
}


/* SCRIPTS
=====================================================================*/
function scripts() {
  return src('src/scripts/**/*.js', { sourcemaps: true })
    .pipe(concat('bundle.js'))
    .pipe(dest('build/scripts/', { sourcemaps: '.' }))
    .on('end', bs.reload);
}

function minifyScripts() {
  return src('build/scripts/bundle.js')
    .pipe(minifier({
      minify: true,
      minifyJS: true
    }))
    .pipe(rename('bundle.min.js'))
    .pipe(dest('public/scripts/'));
}


/* PHP
=====================================================================*/
function php() {
  return src('src/php/**/*.php')
    .pipe(dest('build/'))
    .on('end', bs.reload);
}


/* IMAGES
=====================================================================*/
function images() {
  const clearImg = del(['build/images/*', '!build/images/svg/**/*.svg']);

  return src(['src/images/**/*.*', '!src/images/svg/**/*.svg'], clearImg)
    .pipe(dest('build/images/'));
}

function spriteSvg() {
  const clearSvg = del(['build/images/svg/**/*.svg', 'build/images/sprite-symbols.svg']);

  return src('src/images/svg/**/*.svg', clearSvg)
    .pipe(dest('build/images/svg/'))
    .pipe(svgSprite({
      mode: "symbols",
      selector: "icon-%f",
      preview: false
    }))
    .pipe(rename('sprite-symbols.svg'))
    .pipe(dest('build/images/'));
}

function optImg() {
  // Another plugin for all types https://www.npmjs.com/package/gulp-imagemin
  return src('build/images/**/*.{png,gif,jpg,jpeg}')
    .pipe(imgOptim.optimize({ batchSize: 75 }))
    .pipe(dest('public/images/'));
}


/* MOVING FILES
=====================================================================*/
function toSrc(cb) {
  // const moveBootstrap = src('node_modules/bootstrap/dist/**/*.*')
  //   .pipe(dest('src/libs/bootstrap'));

  // const movejQuery = src('node_modules/jquery/dist/jquery.min.js')
  //   .pipe(dest('src/libs/'));
  cb();
}

function toBuild(cb) {
  const moveLibs = src('src/libs/**/*.*')
    .pipe(dest('build/libs/'));

  const moveFonts = src('src/fonts/**/*.*')
    .pipe(dest('build/fonts/'));

  const moveMedia = src('src/media/**/*.*')
    .pipe(dest('build/media/'));

  const movePreview = src('mockups/preview/*.png')
    .pipe(dest('build/preview/'));

  cb();
}

function toPublic(cb) {
  const clearPreview = del('build/preview/');

  const moveRootFiles = src(['.htaccess', '.gitignore', 'robots.txt'])
  .pipe(dest('public/'));

  const movePhp = src('build/*.php')
    .pipe(dest('public/'));

  const moveLibs = src('build/libs/**/*.*')
    .pipe(dest('public/libs/'));

  const moveFonts = src('build/fonts/**/*.*')
    .pipe(dest('public/fonts/'));

  const moveMedia = src('build/media/**/*.*')
    .pipe(dest('public/media/'));

  const moveImg = src('build/images/**/*.{ico,svg}')
    .pipe(dest('public/images/'));

  cb();
}


/* STATIC SERVER, WATCHER & DEPLOYING
=====================================================================*/
function server() {
  // To work with PHP comment this
  // bs.init({
  //   server: { baseDir: 'build' },
  //   open: false,
  //   browser: 'Vivaldi',
  //   tunnel: tunnelName,
  //   scrollThrottle: 100
  // });

  // To work with PHP uncomment this
  connect.server({ base: 'build' }, function() {
    bs.init({
      proxy: '127.0.0.1:8000',
      open: false,
      browser: 'Vivaldi',
      tunnel: tunnelName,
      scrollThrottle: 100
    });
  });

  watch('src/jade/**/*.jade', markup);
  watch('src/stylus/**/*.styl', styles);
  watch('src/scripts/**/*.js', scripts);
  watch('src/php/**/*.php', php);
  watch('src/images/**/*.*}', images);
  watch('src/images/svg/**/*.svg', spriteSvg);
}


function deploy() {
  var
    args = process.argv.slice(2),
    path = args[1] === '--build' ? 'build' : 'public';

  return src(path + '/**')
    .pipe(rsync({
      root: path + '/',
      hostname: 'example.com',
      destination: 'absolute/path/to/site/',
      archive: true,
      recursive: true,
      silent: false,
      compress: true,
      progress: true,
      clean: true
  }));
}


/* TASKS
=====================================================================*/
exports.default = series(
  clearAll,
  parallel(toSrc, toBuild, images, spriteSvg),
  parallel(markup, styles, scripts, php),
  server
);

exports.build = series(
  clearAll,
  parallel(toSrc, toBuild, images, spriteSvg),
  parallel(markup, styles, scripts, php)
);

exports.public = series(
  clearAll,
  parallel(toSrc, toBuild, spriteSvg, images),
  parallel(markup, styles, scripts, php),
  toPublic,
  parallel(optImg, minifyMarkup, minifyStyles, minifyScripts)
);

exports.deploy = deploy;

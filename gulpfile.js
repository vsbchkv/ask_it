const { gulp, watch, series, src, dest, parallel } = require('gulp');
const sass = require('gulp-sass');
const plumber = require('gulp-plumber');
const server = require('browser-sync').create();
const postcss = require('gulp-postcss');

// path
const config = {
  // html
  html: {
    src: 'src/index.html',
    dist: 'dist/'
  },
  // css
  styles: {
    src: 'src/scss/**/*.scss',
    dist: 'dist/css/'
  },
  // img
  images: {
    src: 'src/img/**/*.*',
    dist: 'dist/img/'
  },
  // fonts
  fonts: {
    src: 'src/fonts/**/*.*',
    dist: 'dist/fonts/'
  },
  // scipts
  scripts: {
    src: 'src/js/**/*.js',
    dist: 'dist/js/'
  }
};

// html
function html() {
  return src(config.html.src)
    .pipe(plumber())
    .pipe(dest(config.html.dist))
    .pipe(server.stream());
}

// styles
function css() {
  return src(config.styles.src)
    .pipe(plumber())
    .pipe(sass({outputStyle: 'expanded'}))
    .pipe(postcss([
      require('autoprefixer'),
      require('postcss-discard-comments'),
      require('postcss-csso')
    ]))
    .pipe(dest(config.styles.dist))
    .pipe(server.stream());
}

function scripts() {
    return src(config.scripts.src)
    .pipe(plumber())
    .pipe(dest(config.scripts.dist))
    .pipe(server.stream());
}

function images() {
  return src(config.images.src)
  .pipe(dest(config.images.dist))
  .pipe(dest(config.images.dist));
}

function load() {
  server.init({
    port: 7070,
    server: {
      baseDir: "dist/",
    }
  });
}

function watcher() {
  watch(
    [config.html.src, config.styles.src, config.images.src, config.scripts.src],
    parallel(html, css, images)
  );
}

// default: gulp
exports.default = series(parallel(html, css, images, scripts, watcher, load));

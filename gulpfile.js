var gulp = require('gulp'),
    prefixer = require('gulp-autoprefixer'),
    sass = require('gulp-sass'),
    server = require('gulp-server-livereload');
    //cssnano = require('gulp-cssnano'),
    //sourcemaps = require('gulp-sourcemaps');


var path = {
    dist: { //Тут мы укажем куда складывать готовые после сборки файлы
        html: 'dist/',
        js: 'dist/js/',
        css: 'dist/css/',
        img: 'dist/img/',
        fonts: 'dist/fonts/'
    },
    src: { //Пути откуда брать исходники
        html: 'src/*.html', //Синтаксис src/*.html говорит gulp что мы хотим взять все файлы с расширением .html
        js: 'src/js/**/*.js',
        style: 'src/scss/*.scss',
        img: 'src/img/**/*.*', //Синтаксис img/**/*.* означает - взять все файлы всех расширений из папки и из вложенных каталогов
        fonts: 'src/fonts/**/*.*'
    }
};

gulp.task('html', function() { //HTML просто перемещаем, без обработки
  return gulp.src(path.src.html)
    .pipe(gulp.dest(path.dist.html))
});

gulp.task('images', function() { //Картинки просто перемещаем, без обработки
  return gulp.src(path.src.img)
    .pipe(gulp.dest(path.dist.img))
});

gulp.task('scripts', function() { //Картинки просто перемещаем, без обработки
  return gulp.src(path.src.js)
    .pipe(gulp.dest(path.dist.js))
});

gulp.task('styles', function () { //CSS сборка
    gulp.src(path.src.style) //Выберем наш styles.scss
        .pipe(sass().on('error', sass.logError)) //Скомпилируем
        .pipe(prefixer({
            browsers: ['last 5 versions']
        })) //Добавим вендорные префиксы
        /*.pipe(sourcemaps.init())
        .pipe(cssnano())
        .pipe(sourcemaps.write('.'))*/
        .pipe(gulp.dest(path.dist.css)) //И в build
    ;
});

gulp.task('refresh', function() {
    gulp.src('dist')
        .pipe(server({
            livereload: true,
            //defaultFile: 'index.html',
            directoryListing: false,
            open: false
        }));
});

gulp.task('watcher',function() {
    gulp.watch('src/**/*.scss', ['styles']);
});

gulp.task('build', ['html', 'styles', 'images', 'scripts']);

gulp.task('default', ['refresh','watcher']);
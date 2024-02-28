import gulp from "gulp";
import * as sass from 'sass'
import gulpSass from 'gulp-sass'
const sassConst = gulpSass(sass) 
import autoprefixer from 'gulp-autoprefixer'
import { createRequire } from 'module'
const require = createRequire(import.meta.url)
const browserSync = require('browser-sync').create()
import concat from 'gulp-concat'
import babel from 'gulp-babel'
import uglify from 'gulp-uglify'

// compile sass, adding autoprefixer e refreshing page
function compileSass(){
    return gulp.src('scss/*.scss')
    .pipe(sassConst({outputStyle : 'compressed'}))
    .pipe(autoprefixer({
        overrideBrowsersList: ['last 2 versions'],
        cascade: false
    }))
    .pipe(gulp.dest("css/"))
    .pipe(browserSync.stream())
}

function pluginsCSS() {
    return gulp.src('css/lib/*.css')
    .pipe(concat('plugins.css'))
    .pipe(gulp.dest('css/'))
    .pipe(browserSync.stream())
}

gulp.task('plugincss', pluginsCSS)

// sass task
gulp.task('sass', compileSass)

function gulpJS() {
    return gulp.src('js/scripts/*.js')
    .pipe(concat('all.js'))
    .pipe(babel({
        presets: ['@babel/env']
    }))
    .pipe(uglify())
    .pipe(gulp.dest('js/'))
    .pipe(browserSync.stream())
}

gulp.task('alljs', gulpJS)

function pluginsJS() {
    return gulp.src(['./js/lib/aos.min.js', './js/lib/swiper.min.js'])
    .pipe(concat('plugins.js'))
    .pipe(gulp.dest('js/'))
    .pipe(browserSync.stream())
}

gulp.task('pluginjs', pluginsJS)

// browserSync Function
function browser() {
    browserSync.init({
        server: {
            baseDir: './'
        }
    })
}

// browserSync task
gulp.task('browser-sync', browser)

// watch function for alterations in sass and html
function watch() {
    gulp.watch('scss/*.scss', compileSass)
    gulp.watch('css/lib/*.css', pluginsCSS)
    gulp.watch('*.html').on('change', browserSync.reload)
    gulp.watch('js/scripts/*js', gulpJS)
    gulp.watch('js/lib/*.js', pluginsJS)
}

// watch task
gulp.task('watch', watch)

// default tasks that execute watch and browser-sync
gulp.task('default', gulp.parallel('watch', 'browser-sync', 'sass', 'plugincss', 'alljs', 'pluginjs'))
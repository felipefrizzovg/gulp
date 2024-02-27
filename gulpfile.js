import gulp from "gulp";
import * as sass from 'sass'
import gulpSass from 'gulp-sass'
const sassConst = gulpSass(sass) 
import autoprefixer from 'gulp-autoprefixer'

function compileSass(){
    return gulp.src('scss/*.scss')
    .pipe(sassConst({outputStyle : 'compressed'}))
    .pipe(autoprefixer({
        cascade: false
    }))
    .pipe(gulp.dest("css/"))
}

gulp.task('default', compileSass)
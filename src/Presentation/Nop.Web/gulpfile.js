'use strict'

import gulp from 'gulp';
import { prepareCldr } from './gulp/tasks/prepareCldr.js';
import copyDependencies from './gulp/tasks/copyDependencies.js';
import clean from './gulp/tasks/clean.js';
import gulpSass from 'gulp-sass';
import * as dartSass from 'sass';
import sourcemaps from 'gulp-sourcemaps';
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import rename from 'gulp-rename';

const sass = gulpSass(dartSass);

// SCSS compilation for BobMag theme
const paths = {
  bobmagScss: 'Themes/BobMag/Content/scss/app.scss',
  bobmagCssDest: 'Themes/BobMag/Content/css'
};

function compileBobmagScss() {
  return gulp.src(paths.bobmagScss)
    .pipe(sourcemaps.init())
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(postcss([autoprefixer()]))
    .pipe(rename('styles.css'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.bobmagCssDest));
}

function watchBobmagScss() {
  gulp.watch('Themes/BobMag/Content/scss/**/*.scss', compileBobmagScss);
}

// Export tasks
export { compileBobmagScss };
export { watchBobmagScss as watch };

// Default task (original)
gulp.task('default',
  gulp.series(clean, copyDependencies, prepareCldr)
);

// Theme build task
gulp.task('theme', compileBobmagScss);

// Theme watch task
gulp.task('theme:watch', watchBobmagScss);
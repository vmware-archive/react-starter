const gulp = require('gulp');
const plugins = require('gulp-load-plugins')();

gulp.task('lint', () => {
  const {FIX: fix = true} = process.env;
  return gulp.src(['gulpfile.js', 'app/**/*.js', 'helpers/**/*.js', 'server/**/*.js', 'spec/**/*.js', 'tasks/**/*.js'], {base: '.'})
    .pipe(plugins.plumber())
    .pipe(plugins.eslint({fix}))
    .pipe(plugins.eslint.format('stylish'))
    .pipe(plugins.if(file => file.eslint && typeof file.eslint.output === 'string', gulp.dest('.')))
    .pipe(plugins.eslint.failOnError());
});

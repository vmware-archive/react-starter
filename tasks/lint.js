const gulp = require('gulp');
const {plumber, eslint, if: gulpIf} = require('gulp-load-plugins')();
const lazypipe = require('lazypipe');

function Lint(gulp) {
  gulp.task('lint', () => {
    return gulp.src(['gulpfile.js', 'app/**/*.js', 'helpers/**/*.js', 'server/**/*.js', 'spec/**/*.js', 'tasks/**/*.js'], {base: '.'})
      .pipe(Lint.lint());
  });
}

function lint() {
  const {FIX: fix = true} = process.env;
  return lazypipe()
    .pipe(() => plumber())
    .pipe(() => eslint({fix}))
    .pipe(() => eslint.format('stylish'))
    .pipe(() => gulpIf(file => file.eslint && typeof file.eslint.output === 'string', gulp.dest('.')))
    .pipe(() => eslint.failAfterError());
}

Lint.lint = lint();

Lint(gulp);

module.exports = Lint;

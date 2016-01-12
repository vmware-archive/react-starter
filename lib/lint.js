const {plumber, eslint, if: gulpIf} = require('gulp-load-plugins')();
const lazypipe = require('lazypipe');
const gulp = require('gulp');
const {log, colors} = require('gulp-util');

function lint() {
  const {FIX: fix = true} = process.env;
  return lazypipe()
    .pipe(() => plumber())
    .pipe(() => eslint({fix}))
    .pipe(() => eslint.format('stylish'))
    .pipe(() => gulpIf(file => {
          const fixed = file.eslint && typeof file.eslint.output === 'string';

          if (fixed) {
            log(colors.yellow(`fixed an error in ${file.eslint.filePath}`));
            return true;
          }
        },
        gulp.dest('.'))
      )
    .pipe(() => eslint.failAfterError());
}


const Lint = {
  install() {
    gulp.task('lint', Lint.tasks.lint());
  },

  lint: lint(),

  tasks: {
    lint() {
      return function() {
        return gulp.src(['gulpfile.js', 'app/**/*.js', 'helpers/**/*.js', 'server/**/*.js', 'spec/**/*.js', 'tasks/**/*.js'], {base: '.'})
          .pipe(Lint.lint());
      };
    }
  }
};

module.exports = Lint;
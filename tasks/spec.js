const gulp = require('gulp');
const mergeStream = require('merge-stream');
const {jasmine, jasmineBrowser, processEnv, plumber} = require('gulp-load-plugins')();
const webpack = require('webpack-stream');

function appAssets(options = {}) {
  const config = Object.assign(require('../config/webpack.config')('test'), options);
  const javascript = gulp.src(['spec/app/**/*_spec.js'])
    .pipe(plumber())
    .pipe(webpack(config));
  return mergeStream(
    javascript,
    gulp.src('spec/support/jasmine.css')
  );
}

function specApp() {
  return appAssets({watch: false})
    .pipe(jasmineBrowser.specRunner({console: true}))
    .pipe(jasmineBrowser.headless({driver: 'phantomjs'}));
}

gulp.task('spec', specApp);

gulp.task('jasmine', () => {
  const plugin = new (require('gulp-jasmine-browser/webpack/jasmine-plugin'))();
  return appAssets({plugins: [plugin]})
    .pipe(jasmineBrowser.specRunner())
    .pipe(jasmineBrowser.server({whenReady: plugin.whenReady}));
});

module.exports = {
 appAssets
};

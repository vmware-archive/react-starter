const gulp = require('gulp');
const mergeStream = require('merge-stream');
const {jasmineBrowser, plumber} = require('gulp-load-plugins')();
const webpack = require('webpack-stream');
const path = require('path');

function appAssets(options = {}) {
  const config = Object.assign(require(path.resolve(process.cwd(), 'config', 'webpack.config'))('test'), options);
  const javascript = gulp.src(['spec/app/**/*_spec.js'])
    .pipe(plumber())
    .pipe(webpack(config));
  return mergeStream(
    javascript,
    gulp.src('spec/support/jasmine.css')
  );
}

function specApp() {
  return Spec.appAssets({watch: false})
    .pipe(jasmineBrowser.specRunner({console: true}))
    .pipe(jasmineBrowser.headless({driver: 'phantomjs'}));
}

function jasmine() {
  const plugin = new (require('gulp-jasmine-browser/webpack/jasmine-plugin'))();
  return Spec.appAssets({plugins: [plugin]})
    .pipe(jasmineBrowser.specRunner())
    .pipe(jasmineBrowser.server({whenReady: plugin.whenReady}));
}

function Spec(gulp) {
  gulp.task('spec-app', Spec.specApp);

  gulp.task('jasmine', Spec.jasmine);
}

Spec.specApp = specApp;
Spec.jasmine = jasmine;
Spec.appAssets = appAssets;

Spec(gulp);

module.exports = Spec;

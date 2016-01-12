const gulp = require('gulp');
const mergeStream = require('merge-stream');
const {jasmineBrowser, plumber} = require('gulp-load-plugins')();
const webpack = require('webpack-stream');
const path = require('path');

const Jasmine = {
  install() {
    gulp.task('spec-app', Jasmine.tasks.specApp);

    gulp.task('jasmine', Jasmine.tasks.jasmine);
  },

  appAssets(options = {}) {
    const config = Object.assign(require(path.resolve(process.cwd(), 'config', 'webpack.config'))('test'), options);
    const javascript = gulp.src(['spec/app/**/*_spec.js'])
      .pipe(plumber())
      .pipe(webpack(config));
    return mergeStream(
      gulp.src(require.resolve('phantomjs-polyfill/bind-polyfill')),
      javascript,
      gulp.src(require.resolve('./jasmine.css'))
    );
  },

  tasks: {
    jasmine() {
      const plugin = new (require('gulp-jasmine-browser/webpack/jasmine-plugin'))();
      return Jasmine.appAssets({plugins: [plugin]})
        .pipe(jasmineBrowser.specRunner())
        .pipe(jasmineBrowser.server({whenReady: plugin.whenReady}));
    },
    specApp() {
      return Jasmine.appAssets({watch: false})
        .pipe(jasmineBrowser.specRunner({console: true}))
        .pipe(jasmineBrowser.headless({driver: 'phantomjs'}));
    }
  }
};

module.exports = Jasmine;

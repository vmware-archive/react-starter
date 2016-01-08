const {assetPath} = require('../server/asset_helper');
const {compact} = require('../helpers/application_helper');
const debounce = require('lodash.debounce');
const del = require('del');
const File = require('vinyl');
const gulp = require('gulp');
const mergeStream = require('merge-stream');
const path = require('path');
const plugins = require('gulp-load-plugins')();
const runSequence = require('run-sequence');
/* eslint-disable no-unused-vars */
const React = require('react');
/* eslint-enable no-unused-vars */
const through2 = require('through2');
const webpack = require('webpack-stream');

const restartServer = debounce(require('./server').restartServer, 1000);

function isDevelopment() {
  return process.env.NODE_ENV === 'development';
}

function isProduction() {
  return process.env.NODE_ENV === 'production';
}

function rename(options = {}) {
  return through2.obj(function(file, encoding, callback) {
    const {base = process.cwd(), path: p = path.basename(file.path)} = options;
    callback(null, Object.assign(file, {base, path: p}));
  });
}

function javascript(options = {}) {
  const webpackConfig = Object.assign({}, require('../config/webpack.config')(process.env.NODE_ENV), options);
  return gulp.src(['app/components/application.js'])
    .pipe(plugins.plumber())
    .pipe(webpack(webpackConfig))
    .pipe(plugins.tap(restartServer))
    .pipe(rename());
}

function sass({watch = false} = {}) {
  let stream = gulp.src('app/stylesheets/application.scss').pipe(plugins.plumber());
  if (watch) {
    stream = stream
      .pipe(plugins.watch('app/stylesheets/**/*.scss'))
      .pipe(plugins.sassGraphAbs([path.join(__dirname, '..', 'app', 'stylesheets')]));
  }
  return stream
    .pipe(plugins.cond(!isProduction(), () => plugins.sourcemaps.init()))
.pipe(plugins.sass({errLogToConsole: true}))
    .pipe(plugins.autoprefixer())
    .pipe(plugins.cond(!isProduction(), () => plugins.sourcemaps.write()))
.pipe(plugins.cond(isProduction(), () => plugins.minifyCss()))
}

function all({hotModule} = {}) {
  const watch = isDevelopment();
  const streams = compact([
    !hotModule && javascript({watch}),
    sass({watch})
  ]);
  return mergeStream(...streams);
}

gulp.task('assets-stylesheets', () => sass().pipe(gulp.dest('public')));

gulp.task('clean-assets', callback => del(['public/*', '!public/.gitkeep'], callback));

gulp.task('clean-assets-server', callback => del(['tmp/public/**/*'], callback));

gulp.task('assets', ['clean-assets'], function() {
  const stream = all();
  if (!isProduction()) return stream.pipe(gulp.dest('public'));
  const cloneSink = plugins.clone.sink();
  return stream
    .pipe(gulp.dest('public'))
    .pipe(plugins.rev())
    .pipe(plugins.revCssUrl())
    .pipe(cloneSink)
    .pipe(gulp.dest('public'))
    .pipe(plugins.rev.manifest())
    .pipe(gulp.dest('public'))
    .pipe(cloneSink.tap())
    .pipe(plugins.gzip())
    .pipe(gulp.dest('public'));
});

gulp.task('build-assets-server', ['clean-assets-server'], function() {
  all({hotModule: true})
    .pipe(gulp.dest('tmp/public'))
    .pipe(plugins.livereload({start: true}));
});

gulp.task('assets-server', ['build-assets-server'], function() {
  const webpack = require('webpack');
  const WebpackDevServer = require('webpack-dev-server');
  const assetPort = 3001;
  const assetHost = 'localhost';
  const client = `webpack-dev-server/client?http://${assetHost}:${assetPort}`;
  const publicPath = `//${assetHost}:${assetPort}/`;
  let {entry, output, ...webpackConfig} = require('../config/webpack.config')(process.env.NODE_ENV);
  webpackConfig = {...webpackConfig, entry: {...entry, client}, output: {...output, publicPath}};
  const server = new WebpackDevServer(webpack(webpackConfig), {
    contentBase: './tmp/public',
    headers: {'Access-Control-Allow-Origin': '*'},
    hot: true,
    publicPath,
    quiet: true
  });
  server.listen(assetPort, assetHost);
});

module.exports = {
  sass
};

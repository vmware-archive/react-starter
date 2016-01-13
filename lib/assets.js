const del = require('del');
const File = require('vinyl');
const gulp = require('gulp');
const mergeStream = require('merge-stream');
const through2 = require('through2');
const path = require('path');
const plugins = require('gulp-load-plugins')();
/* eslint-disable no-unused-vars */
const React = require('react');
const ReactDOMServer = require('react-dom/server');
/* eslint-enable no-unused-vars */
const webpack = require('webpack-stream');

function isDevelopment() {
  return process.env.NODE_ENV === 'development';
}

function isProduction() {
  return process.env.NODE_ENV === 'production';
}

const Assets = {
  install() {
    gulp.task('clean-assets', Assets.tasks.cleanAssets);

    gulp.task('clean-assets-server', Assets.tasks.cleanAssetsServer);

    gulp.task('foo', function(done){del(['tmp/public/**/*']).then(() => done(), done)});

    gulp.task('assets', ['clean-assets'], Assets.tasks.assets);

    gulp.task('build-assets-server', ['clean-assets-server'], function() {
      Assets.all({hotModule: true})
        .pipe(gulp.dest('tmp/public'))
        .pipe(plugins.livereload({start: true}));
    });

    gulp.task('assets-html', function() {
      return Assets.html().pipe(gulp.dest('tmp/public'));
    });

    gulp.task('watch-html', function(done) {
      gulp.watch(['app/**/*.js'], ['assets-html']);
      done();
    });

    gulp.task('assets-server', ['build-assets-server', 'watch-html'], Assets.tasks.buildAssetsServer);
  },

  all({hotModule} = {}) {
    const watch = isDevelopment();
    const streams = [
      Assets.html(),
      !hotModule && Assets.javascript({watch}),
      Assets.sass({watch})
    ].filter(Boolean);
    return mergeStream(...streams);
  },

  sass({watch = false} = {}) {
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
      .pipe(plugins.cond(isProduction(), () => plugins.cssnano()));
  },

  html() {
    let {entry = ['app/components/application.js'], hotModule, scripts = ['application.js'], stylesheets = ['application.css'], title = 'The default title'} = require('../lib/config');
    const {assetPath} = require('../lib/asset_helper');
    let stream = gulp.src(entry).pipe(plugins.plumber());

    return stream
      .pipe(through2.obj(function(file, enc, callback) {
        delete require.cache[require.resolve(file.path)];
        delete require.cache[require.resolve('../lib/layout')];
        const Layout = require('../lib/layout');
        const assetConfig = isDevelopment() ? {assetHost: 'localhost', assetPort: 3001} : {};
        const stylesheetPaths = stylesheets.map(f => assetPath(f, assetConfig));
        const scriptPaths = [hotModule && 'client.js', ...scripts].filter(Boolean).map(f => assetPath(f, assetConfig));
        const entryComponent = require(file.path);
        const props = {entry: entryComponent, scripts: scriptPaths, stylesheets: stylesheetPaths, title};
        const html = ReactDOMServer.renderToStaticMarkup(<Layout {...props}/>);
        const indexFile = new File({
          path: 'index.html',
          contents: new Buffer(html)
        });
        callback(null, indexFile);
      }));
  },

  javascript(options = {}) {
    const webpackConfig = Object.assign({}, require('../config/webpack.config')(process.env.NODE_ENV), options);
    return gulp.src(['app/components/application.js'])
      .pipe(plugins.plumber())
      .pipe(webpack(webpackConfig));
  },

  tasks: {
    cleanAssets(done){del(['public/*', '!public/.gitkeep']).then(() => done(), done)},

    cleanAssetsServer(done){del(['tmp/public/**/*']).then(() => done(), done)},

    assets() {
      const stream = Assets.all();
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
    },

    buildAssetsServer() {
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
    }
  }
};

module.exports = Assets;
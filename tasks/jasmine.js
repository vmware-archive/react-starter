import webpackCompiler from 'webpack';

const gulp = require('gulp');
const mergeStream = require('merge-stream');
const {jasmine, jasmineBrowser, plumber, processEnv} = require('gulp-load-plugins')();
const webpack = require('webpack-stream');
const pipe = require('multipipe');


const Jasmine = {
  installOptions: {
    browserServerOptions: {},
    browserSpecRunnerOptions: {},
    getAdditionalAppAssets: () => [],
    headlessServerOptions: {},
    headlessSpecRunnerOptions: {},
    serverOptions: {},
    appGlobs: ['spec/app/**/*_spec.js'],
    serverGlobs: ['spec/server/**/*.js', 'spec/lib/**/*.js', 'spec/helpers/**/*.js']
  },

  install(installOptions = {}) {
    Object.assign(Jasmine.installOptions, installOptions);
    gulp.task('jasmine', Jasmine.tasks.jasmine);
    gulp.task('spec-app', Jasmine.tasks.specApp);
    gulp.task('spec-server', Jasmine.tasks.specServer);
  },

  appAssets(options, gulpOptions = {}) {
    //TODO: validate webpack.test exists and throw useful error message
    let javascript = gulp.src(Jasmine.installOptions.appGlobs, gulpOptions).pipe(plumber());
    if (options !== false) {
      const {plugins, ...rest} = options || {};
      const testConfig = {...Jasmine.installOptions.webpack.test(), ...rest};
      const config = {...testConfig, ...rest, ...{plugins: (testConfig.plugins || []).concat(plugins || [])}};
      javascript = javascript.pipe(webpack({config, quiet: true, watch: config.watch}, webpackCompiler));
    }

    return mergeStream(
      javascript,
      ...(Jasmine.installOptions.getAdditionalAppAssets())
    );
  },

  serverAssets(gulpOptions = {}) {
    return gulp.src(Jasmine.installOptions.serverGlobs, gulpOptions)
      .pipe(plumber());
  },

  tasks: {
    jasmine() {
      const plugin = new (require('gulp-jasmine-browser/webpack/jasmine-plugin'))();
      const {browserServerOptions, browserSpecRunnerOptions} = Jasmine.installOptions;
      return Jasmine.appAssets({plugins: [plugin]})
        .pipe(jasmineBrowser.specRunner(browserSpecRunnerOptions))
        .pipe(jasmineBrowser.server({whenReady: plugin.whenReady, ...browserServerOptions}));
    },
    specApp() {
      const {headlessServerOptions, headlessSpecRunnerOptions} = Jasmine.installOptions;
      return Jasmine.appAssets({watch: false})
        .pipe(jasmineBrowser.specRunner({console: true, ...headlessSpecRunnerOptions}))
        .pipe(jasmineBrowser.headless({driver: 'phantomjs', ...headlessServerOptions}));
    },
    specServer() {
      const env = processEnv({NODE_ENV: 'test'});
      return pipe(
        Jasmine.serverAssets(),
        env,
        jasmine({includeStackTrace: true, ...Jasmine.installOptions.serverOptions}),
        env.restore()
      );
    }
  }
};

export default Jasmine;
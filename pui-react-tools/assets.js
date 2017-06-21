const {obj: from} = require('from2');
const File = require('vinyl');

import del from 'del';
import gulp from 'gulp';
import webpackStream from 'webpack-stream';
import webpack from 'webpack';

const Assets = {
  installOptions: {
    appGlobs: ['./app/index.js'],
    buildDirectory: 'public',
    webpack: {}
  },

  install(installOptions = {}) {
    if (!installOptions.webpack) throw new Error('webpack config is required in Assets.install');
    Object.assign(Assets.installOptions, installOptions);
    gulp.task('clean-assets', Assets.tasks.cleanAssets);
    gulp.task('assets', Assets.tasks.assets);
    gulp.task('assets-config', Assets.tasks.assetsConfig);
  },

  config() {
    let configOptions = require('./config')();
    const globalNamespace = configOptions.globalNamespace || 'Application';
    let configOptionsJSON = JSON.stringify(configOptions);
    return from(function() {
      const configContents = new File({
        path: 'config.js',
        contents: new Buffer(`window.${globalNamespace} = {config: ${configOptionsJSON}}`)
      });
      this.push(configContents);
      this.push(null);
    });
  },

  webpack({env = process.env.NODE_ENV || 'development', watch} = {}) {
    const config = Assets.installOptions.webpack[env]();
    return webpackStream({config, quiet: true, watch: config.watch || watch}, webpack);
  },

  tasks: {
    assets() {
      return gulp.src(Assets.installOptions.appGlobs)
        .pipe(Assets.webpack({}))
        .pipe(gulp.dest(Assets.installOptions.buildDirectory));
    },

    assetsConfig() {
      Assets.config().pipe(gulp.dest(Assets.installOptions.buildDirectory));
    },

    cleanAssets(done){
      const {buildDirectory} = Assets.installOptions;
      del([
        `${buildDirectory}/*`,
        `!${buildDirectory}/.gitkeep`
      ]).then(() => done(), done);
    }
  }
};

export default Assets;
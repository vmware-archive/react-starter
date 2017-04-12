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
    gulp.task('assets', Assets.tasks.assets);
  },

  webpack({env = process.env.NODE_ENV || 'development', watch} = {}) {
    const config = Assets.installOptions.webpack[env]();
    return webpackStream({config, quiet: true, watch: config.watch || watch}, webpack);
  },

  tasks: {
    assets() {
      return gulp.src(Assets.installOptions.appGlobs)
        .pipe(Assets.webpack({}))
        .pipe(gulp.dest(Assets.installOptions.buildDirectory))
    }
  }
};

export default Assets;
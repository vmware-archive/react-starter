const {compact} = require('../helpers/application_helper');
const gulp = require('gulp');
const plugins = require('gulp-load-plugins')();
const thenify = require('thenify');
const runSequence = require('run-sequence');
const {killServer} = require('../tasks/server');
const lsof = require('lsof');

const getPort = thenify(require('portfinder').getPort);
const assetPort = 3001;

function rawTcpPort(port) {
  return new Promise(resolve => lsof.rawTcpPort(port, resolve));
}

function buildSequence(processes, env) {
  const {ASSET_HOST, ASSET_PORT, NODE_ENV, PORT} = process.env;
  if (processes.length) env = {...env, ASSET_PORT: assetPort, ASSET_HOST: 'localhost'};
  return {
    sequence: compact([
      !processes.length && 'assets',
      'server',
      'wait-for-server',
      'jasmine-integration'
    ]),
    cleanup: done => () => {
      Object.assign(process.env, {ASSET_HOST, ASSET_PORT, NODE_ENV, PORT});
      killServer();
      done();
    },
    env
  };
}

function runIntegration() {
  return Promise.all([rawTcpPort(assetPort), getPort()])
    .then(([processes, port]) => {
      let environment = {
        NODE_ENV: 'integration',
        PORT: port
      };
      const {env, sequence, cleanup} = buildSequence(processes, environment);
      Object.assign(process.env, env);
      return {sequence, cleanup};
    });
}

gulp.task('jasmine-integration', () => {
  return gulp.src('spec/integration/**/*.js')
    .pipe(plugins.plumber())
    .pipe(plugins.jasmine({includeStackTrace: true}));
});

gulp.task('spec-integration', done => {
  runIntegration().then(({sequence, cleanup}) => runSequence(...sequence, cleanup(done)));
});

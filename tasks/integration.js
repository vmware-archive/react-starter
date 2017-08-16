import portastic from 'portastic';

const {compact} = require('../helpers/application_helper');
const gulp = require('gulp');
const plugins = require('gulp-load-plugins')();
const runSequence = require('run-sequence');
const {killServer} = require('../tasks/server');
const {kill: killDevServer} = require('../tasks/dev_server');
const assetPort = 3000;

function buildSequence(isForemanNotRunning, env) {
  const {ASSET_PORT, NODE_ENV, PORT} = process.env;
  return {
    sequence: compact([
      isForemanNotRunning && 'server',
      isForemanNotRunning && 'dev-server',
      'wait-for-server',
      'jasmine-integration'
    ]),
    cleanup: done => () => {
      Object.assign(process.env, {NODE_ENV, ASSET_PORT, PORT});
      if(isForemanNotRunning) {
        killDevServer();
        killServer();
      }

      done();
    },
    env
  };
}

function runIntegration() {
  return Promise.all([
    portastic.test(assetPort),
    portastic.find({min: 8000, max: 8080, retrieve: 2}),
  ]).then(([isForemanNotRunning, openPorts]) => {
    const port = isForemanNotRunning ? openPorts[0] : assetPort;
    const apiPort = isForemanNotRunning ? openPorts[1] : 3001;
    let environment = {
      NODE_ENV: 'integration',
      PORT: port,
      API_PORT: apiPort
    };

    const {env, sequence, cleanup} = buildSequence(isForemanNotRunning, environment);
    Object.assign(process.env, env);
    return {sequence, cleanup};
  });
}

gulp.task('jasmine-integration', () => {
  return gulp.src('spec/integration/**/*_spec.js')
    .pipe(plugins.plumber())
    .pipe(plugins.jasmine({includeStackTrace: true}));
});

gulp.task('spec-integration', done => {
  runIntegration().then(({sequence, cleanup}) => runSequence(...sequence, cleanup(done)));
});

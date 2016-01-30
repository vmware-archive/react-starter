const {compact} = require('../helpers/application_helper');
const gulp = require('gulp');
const plugins = require('gulp-load-plugins')();
const thenify = require('thenify');
const runSequence = require('run-sequence');
const {killDevServer} = require('../tasks/server');

const getPort = thenify(require('portfinder').getPort);

function buildSequence(env) {
  const {NODE_ENV, PORT} = process.env;
  return {
    sequence: compact([
      'assets',
      'dev-server',
      'wait-for-server',
      'jasmine-integration'
    ]),
    cleanup: done => () => {
      Object.assign(process.env, {NODE_ENV, PORT});
      killDevServer();
      done();
    },
    env
  };
}

function runIntegration() {
  return getPort()
    .then((port) => {
      let environment = {
        NODE_ENV: 'integration',
        PORT: port
      };
      const {env, sequence, cleanup} = buildSequence(environment);
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

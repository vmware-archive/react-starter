const gulp = require('gulp');
const plugins = require('gulp-load-plugins')();
const {spawn} = require('child_process');
const waitUntilListening = require('strong-wait-till-listening');

let node;
function restartServer() {
  if (node) return node.kill('SIGUSR2');
}
function killServer() {
  if (node) return node.kill();
}

process.on('exit', restartServer);

gulp.task('server', function() {
  if (node) return node.kill('SIGUSR2');
  node = spawn('node', ['index.js'], {stdio: 'inherit', env: process.env});
  node.on('close', function(code) {
    if (code === 8) {
      node = null;
      plugins.util.log('Error detected, waiting for changes...');
    }
  });
});

gulp.task('wait-for-server', function(callback) {
  waitUntilListening({port: process.env.PORT, timeoutInMs: 90000}, callback);
});

gulp.task('watch-server', function() {
  gulp.watch(['server/**/*.js', 'helpers/**/*.js', 'lib/**/*.js', 'config/*.json'], ['server']);
});

gulp.task('s', ['server', 'watch-server']);

module.exports = {restartServer, killServer};

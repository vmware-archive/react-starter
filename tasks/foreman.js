const gulp = require('gulp');
const npm = require('npm');
const {spawn} = require('child_process');

gulp.task('foreman', function(callback) {
  npm.load(function(err) {
    if (err) return callback(err);
    const child = spawn(`${npm.bin}/nf`, ['start', '-j', 'Procfile.dev'], {stdio: 'inherit', env: process.env})
      .once('close', callback);
    ['SIGINT', 'SIGTERM'].forEach(e => process.once(e, () => child && child.kill()));
  });
});
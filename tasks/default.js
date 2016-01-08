const gulp = require('gulp');
const runSequence = require('run-sequence');

gulp.task('default', cb => runSequence('lint', 'spec', cb));

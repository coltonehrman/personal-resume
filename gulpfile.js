require('./gulp/tasks/dev');
require('./gulp/tasks/scripts');
require('./gulp/tasks/styles');

const gulp = require('gulp');

gulp.task('default', () => {
  gulp.start('dev');
});

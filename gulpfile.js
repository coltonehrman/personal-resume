require('./gulp/tasks/dev');
require('./gulp/tasks/scripts');
require('./gulp/tasks/styles');
require('./gulp/tasks/build');

const gulp = require('gulp');

gulp.task('default', () => {
  gulp.start('dev');
});

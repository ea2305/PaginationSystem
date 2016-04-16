var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var livereload = require('gulp-livereload');

gulp.task('build', function () {
    return browserify({entries: './components/index.jsx', extensions: ['.jsx'], debug: true})
        .transform('babelify', {presets: ['es2015', 'react']})
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(gulp.dest('build'))
        .pipe(livereload())
});

gulp.task('watch', ['build'], function () {
    livereload.listen();
    gulp.watch('*.jsx', ['build']);
});

gulp.task('default', ['watch']);

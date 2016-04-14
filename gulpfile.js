//Importamos todos los elementos para gulp
var gulp = require('gulp');
var browserify = require('browserify');//Compatibilidad con browsers
var babelify = require('babelify');//Conversion de ECMA 6 -> 5
var source = require('vinyl-source-stream');

gulp.task('build', function () {
    return browserify({entries: './components/index.jsx', extensions: ['.jsx'], debug: true})
        .transform('babelify', {presets: ['es2015', 'react']})
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(gulp.dest('build'));
});

//Handler to changes
/*
    TODOS LOS CAMBIOS SE CONVIERTENE EN UN SOLO ARCHIVO
    UN solo componente
*/
gulp.task('watch', ['build'], function () {
    gulp.watch('*.jsx', ['build']);
});

gulp.task('default', ['watch']);

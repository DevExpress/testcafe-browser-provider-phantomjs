var gulp    = require('gulp');
var eslint  = require('gulp-eslint');
var babel   = require('gulp-babel');
var del     = require('del');
var path    = require('path');
var spawn   = require('./utils/spawn');


var packageParentDir  = path.join(__dirname, '../');
var packageSearchPath = (process.env.NODE_PATH ? process.env.NODE_PATH + path.delimiter : '') + packageParentDir;


gulp.task('clean', function () {
    return del(['lib', '.screenshots']);
});

gulp.task('lint', function () {
    return gulp
        .src([
            'src/**/*.js',
            'test/**/*.js',
            'Gulpfile.js'
        ])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});

gulp.task('build', ['clean', 'lint'], function () {
    return gulp
        .src('src/**/*.js')
        .pipe(babel())
        .pipe(gulp.dest('lib'));
});

gulp.task('test-internal', ['build'], function () {
    var testCafeCmd = path.join(__dirname, 'node_modules/.bin/testcafe');

    return spawn(testCafeCmd, ['phantomjs', 'test/**/*.js', '-s', '.screenshots']);
});

gulp.task('test', function () {
    return spawn('gulp', ['test-internal'], { NODE_PATH: packageSearchPath });
});

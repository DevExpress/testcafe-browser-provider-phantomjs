var gulp        = require('gulp');
var babel       = require('gulp-babel');
var del         = require('del');
var path        = require('path');
var spawn       = require('./utils/spawn');
var nodeVersion = require('node-version');


var PACKAGE_PARENT_DIR  = path.join(__dirname, '../');
var PACKAGE_SEARCH_PATH = (process.env.NODE_PATH ? process.env.NODE_PATH + path.delimiter : '') + PACKAGE_PARENT_DIR;


gulp.task('clean', function () {
    return del('lib');
});

gulp.task('lint', function () {
    // TODO: eslint supports node version 4 or higher.
    // Remove this condition once we get rid of node 0.10 support.
    if (nodeVersion.major === '0')
        return null;

    var eslint = require('gulp-eslint');

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

gulp.task('test', ['build'], function () {
    var testCafeCmd = path.join(__dirname, 'node_modules/.bin/testcafe');

    var testCafeOpts = [
        'phantomjs',
        'test/**/*.js',
        '-s', '.screenshots'
    ];

    return spawn(testCafeCmd, testCafeOpts, { NODE_PATH: PACKAGE_SEARCH_PATH });
});

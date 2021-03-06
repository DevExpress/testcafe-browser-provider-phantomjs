var gulp        = require('gulp');
var babel       = require('gulp-babel');
var del         = require('del');
var path        = require('path');
var spawn       = require('./utils/spawn');
var nodeVersion = require('node-version');


var packageParentDir  = path.join(__dirname, '../');
var packageSearchPath = (process.env.NODE_PATH ? process.env.NODE_PATH + path.delimiter : '') + packageParentDir;


gulp.task('clean', function () {
    return del(['lib', '.screenshots']);
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

gulp.task('test-internal', ['build'], function () {
    var testCafeCmd = path.join(__dirname, 'node_modules/.bin/testcafe');

    return spawn(testCafeCmd, ['phantomjs', 'test/**/*.js', '-s', '.screenshots']);
});

gulp.task('test', function () {
    var gulpCmd = path.join(__dirname, 'node_modules/.bin/gulp');

    return spawn(gulpCmd, ['test-internal'], { NODE_PATH: packageSearchPath });
});

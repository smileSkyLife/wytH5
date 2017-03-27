/**
 * Created by wangxiaobin on 2017/3/15.
 */
var gulp = require('gulp');
var src = './imgs';
var build = './wytpc/';
var imagesmin = require('gulp-imagemin');
var cssmin = require('gulp-minify-css');
var rev = require('gulp-rev');
var revCollector = require('gulp-rev-collector');

var config = {
    js: {
        src: './js/*.js',
        build: build + '/js'
    },
    css: {
        src: './css/*.css',
        build: build + '/css'
    },
    images: {
        src: src + '/**',
        build: build + '/imgs'
    }
};

gulp.task('imagesmin', function (){
    return gulp.src(config.images.src)
        .pipe(imagesmin())
        .pipe(gulp.dest(config.images.build))
});
gulp.task('js', function (){
    return gulp.src(config.js.src)
        .pipe(gulp.dest(config.js.build))
});

gulp.task('css', function (){
    return gulp.src(config.css.src)
        .pipe(cssmin())
        .pipe(gulp.dest(config.css.build))
});
gulp.task('animateCss', function (){
    return gulp.src(['./css/animate/**'])
        .pipe(gulp.dest(config.css.build + '/animate'))
});
gulp.task('html', function () {
    gulp.src(['./*.html'])
        .pipe(gulp.dest('./wytpc/'))
});
gulp.task('test', ['js', 'css', 'imagesmin', 'animateCss', 'html'], function () {
    gulp.watch("./*.html", ['html']);
});


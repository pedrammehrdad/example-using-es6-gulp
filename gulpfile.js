var gulp = require('gulp');
var sass = require('gulp-sass');
var minifyCSS = require('gulp-csso');
var concat = require('gulp-concat');
var babel = require('gulp-babel');
var watch = require('gulp-watch');
rollup = require('gulp-rollup');
var browserSync = require('browser-sync').create();

gulp.task('browserSync', function () {
    browserSync.init({
        server: {
            baseDir: 'build'
        },
    })
})

gulp.task('html', function () {
    return gulp.src('./src/index.html')
            .pipe(gulp.dest('build/'))
});

gulp.task('json', function () {
    return gulp.src('./src/league-data.json')
            .pipe(gulp.dest('build/'))
});

gulp.task('sass', function () {
    return gulp.src(['./src/*/*.css', './src/*/*.scss'])
            .pipe(sass({outputStyle: 'compressed'}))
            .on('error', sass.logError)
            .pipe(concat('app.min.css'))
            .pipe(gulp.dest('./build/css'))
            .pipe(browserSync.reload({
                stream: true
            }));
})


gulp.task('js', function () {
    return gulp.src(["@babel/polyfill", './src/**/*.js'])
            .pipe(rollup({
                format: "iife",
                input: './src/app.js'
            }))
            .pipe(babel())
            .on('error', console.error.bind(console))
            .pipe(concat('app.min.js'))
            .pipe(gulp.dest('build/js'))
            .pipe(browserSync.reload({
                stream: true
            }));
    ;
});

gulp.task('watch', ['sass', 'js', 'html', 'json', 'browserSync'],
        function () {
            gulp.watch('./src/*/*.scss', ['sass']);
            gulp.watch('./src/**/*.js', ['js']);
            gulp.watch('./src/league-data.json', ['json']);
            gulp.watch('./src/index.html', ['html']);
        });

gulp.run("sass");

gulp.task('default', [
    'html',
    'sass',
    'json',
    'js'
]);

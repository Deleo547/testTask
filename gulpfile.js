var gulp         = require('gulp')
var browserSync  = require('browser-sync')
var sass         = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var concatCss    = require('gulp-concat-css');
var ftp          = require('gulp-ftp');


// Static Server + watching scss/html files
gulp.task('serve', ['sass'], function() {

    browserSync.init({
        server: "src/"
    });
    // Отслеживание за изменениями файлов
    gulp.watch("src/sass/*.sass", ['sass']);
    gulp.watch("src/*.html").on('change', browserSync.reload);
});

// компилируется Sass в CSS и обновляется страница
gulp.task('sass', function() {
    return gulp.src("src/sass/*.sass")
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
        	overrideBrowserslist: ['last 2 versions'],
        	cascade: false
        	}))
        .pipe(concatCss('style.css'))
        .pipe(gulp.dest("src/css"))
        .pipe(browserSync.stream());
});

gulp.task('ftp', function(){
    return gulp.src('src/**')
        .pipe(ftp({
            host: 'website.com',
            user: 'johndoe',
            pass: '1234',
            remotePath: 'www/siteName.ru/stream'
        }))
        .pipe(gutil.noop());
});

gulp.task('default', ['serve']);		

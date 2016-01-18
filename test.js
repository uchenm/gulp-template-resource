/**
 * Created by Ming on 2016/1/13.
 */

var gulp = require('gulp');
var htmlmin = require('gulp-htmlmin');
var htmlJsStr = require('js-string-escape');
var templateResource = require('./');

gulp.src('data/**/*.json').pipe(templateResource('build.js', {"standalone": true})).pipe(gulp.dest('output'));

gulp.src('templates/**/*.html').pipe(templateResource('templates.html', {
    "standalone": true,
    "templateBody": "<script type=\"text/ng-template\" id=\"<%= url %>\">\n\n<%= contents %>\n\n</script>",
    "templateHeader": " ",
    "templateFooter": " "
})).pipe(gulp.dest('output'));

gulp.src('templates/**/*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    //.pipe(htmlJsStr())
    .pipe(templateResource('templates.js', {
        "standalone": true,
        "templateBody": "$templateCache.put(\"<%= url %>\",'<%= contents %>');"
    })).pipe(gulp.dest('output'));
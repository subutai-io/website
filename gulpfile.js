// Gulpfile of Subutai website (https://github.com/subutai-io/website)
// 05-11-2018


var gulp = require("gulp");
var sass = require("gulp-sass");
var notify = require("gulp-notify");

//compile css
gulp.task("css-compile", function() {
	return gulp.src("./source/sass/*.scss")
	.pipe(sass({outputStyle:'compressed'}))
	.on('error', notify.onError({title: 'Erro ao compilar css', message: '<%= error.message %>'}))
	.pipe(gulp.dest("./dist/css"));
});

//move js files
gulp.task("move-js", function() {
	return gulp.src([
	'./source/components/jquery/dist/jquery.min.js',
	'./source/components/bootstrap/dist/js/bootstrap.min.js'
	])
	.pipe(gulp.dest("./dist/js"));
});

//build app.js
gulp.task("build-js", function() {
	return gulp.src("./source/js/*.js")
	.pipe(gulp.dest("./dist/js"));
});

//watch files
gulp.task("watch-files", function() {
	gulp.watch("./source/sass/*.scss",["css-compile"]);
	gulp.watch("./source/js/**/*.js",["build-js"]);
});

//default command
gulp.task("default", ["css-compile", "move-js", "build-js", "watch-files"]);
var gulp = require('gulp');
var concat = require('gulp-concat');
var less = require('gulp-less');
var eslint = require('gulp-eslint');
var babel = require('gulp-babel');

var srcPaths = {
	index: './public/src/index.html',
	scripts: [
		'./public/src/character-sheet.module.js',
		'./public/src/**/*.js',
		'!./public/src/socket.io.js'
	],
	vendorScripts: [
		'./node_modules/socket.io/node_modules/socket.io-client/socket.io.js',
		'./public/node_modules/angular/angular.js',
		'./public/node_modules/angular-ui-router/build/angular-ui-router.js',
	],
	less: './public/src/**/*.less'
};

var destPaths = {
	root: './public/dist/',
	scripts: './public/dist/js/',
	styles: './public/dist/styles/'
};

gulp.task('default', [
	'moveIndex',
	'concatScripts',
	'concatVendorScripts',
	'buildStyles'
]);

gulp.task('moveIndex', function() {
	return gulp.src(srcPaths.index)
		.pipe(gulp.dest(destPaths.root));
});

gulp.task('concatScripts', function() {
	return gulp.src(srcPaths.scripts)
		.pipe(babel())
		.pipe(concat('character-sheet.js'))
		.pipe(gulp.dest(destPaths.scripts));
});

gulp.task('concatVendorScripts', function() {
	return gulp.src(srcPaths.vendorScripts)
		.pipe(concat('vendor.js'))
		.pipe(gulp.dest(destPaths.scripts));
});

gulp.task('lintScripts', function() {
	return gulp.src(srcPaths.scripts)
		.pipe(eslint())
		.pipe(eslint.format());
});

gulp.task('buildStyles', function() {
	return gulp.src(srcPaths.less)
		.pipe(less())
		.pipe(concat('styles.css'))
		.pipe(gulp.dest(destPaths.styles))
});

gulp.task('watch', function() {
	gulp.watch(srcPaths.index, ['moveIndex']);
	gulp.watch(srcPaths.scripts, ['concatScripts']);
	gulp.watch(srcPaths.less, ['buildStyles']);
});

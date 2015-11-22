var gulp = require('gulp');
var concat = require('gulp-concat');

var srcPaths = {
	index: './public/src/index.html',
	scripts: [
		'./public/src/character-sheet.module.js', 
		'./public/src/**/*.js', 
		'!./public/src/socket.io.js'
	],
	vendorScripts: [
		'./node_modules/socket.io-client/socket.io.js',
		'./public/node_modules/angular/angular.js',
		'./public/node_modules/angular-ui-router/build/angular-ui-router.js',
	]
};

var destPaths = {
	root: './public/dist/',
	scripts: './public/dist/js/'
};

gulp.task('default', ['moveIndex','concatScripts', 'concatVendorScripts']);

gulp.task('moveIndex', function() {
	return gulp.src(srcPaths.index)
		.pipe(gulp.dest(destPaths.root));
});

gulp.task('concatScripts', function() {
	return gulp.src(srcPaths.scripts)
		.pipe(concat('character-sheet.js'))
		.pipe(gulp.dest(destPaths.scripts));
});

gulp.task('concatVendorScripts', function() {
	return gulp.src(srcPaths.vendorScripts)
		.pipe(concat('vendor.js'))
		.pipe(gulp.dest(destPaths.scripts));
});

gulp.task('watch', function() {
	gulp.watch(srcPaths.index, ['moveIndex']);
	gulp.watch(srcPaths.scripts, ['concatScripts']);
});

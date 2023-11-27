const gulp = require("gulp");
const babel = require("gulp-babel");
const uglify = require("gulp-uglify");
const rename = require("gulp-rename");
const eslint = require("gulp-eslint-new");

gulp.task("lint", () => {
	return gulp.src("src/**/*.js")
		.pipe(eslint())
		.pipe(eslint.format())
		.pipe(eslint.failAfterError());
});

gulp.task("transpile", () => {
	return gulp.src("src/**/*.js")
		.pipe(babel({
			presets: ["@babel/env"]
		}))
		.pipe(gulp.dest("dist"));
});

gulp.task("minify", () => {
	return gulp.src("dist/**/*.js")
		.pipe(uglify())
		.pipe(rename({ suffix: ".min" }))
		.pipe(gulp.dest("dist"));
});

gulp.task("build", gulp.series("lint", "transpile", "minify"));
gulp.task("default", gulp.series("build"));

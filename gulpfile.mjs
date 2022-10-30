import gulp from "gulp"
import gulpTS from 'gulp-typescript'
import terser from "gulp-terser"
import rename from "gulp-rename"
import browserSync from "browser-sync"

browserSync.create()
const tsProject = gulpTS.createProject("tsconfig.json")

function browsersync() {
    return browserSync.init({
        watch: true,
        server: {
            baseDir: './public'
        },
        notify: false
    }, (err, instance) => {
        console.log(err, instance.active)
    })
}

function compileTS() {
    return tsProject.src().pipe(tsProject()).js.pipe(gulp.dest("./public"))
}

function minifyJS() {
    return gulp.src('./public/main.js').pipe(terser()).pipe(rename({ suffix: '.min' })).pipe(gulp.dest("./public"))
}

function tsWatch() {
    return gulp.watch('src/main.ts', gulp.series(compileTS, minifyJS))
}

export default gulp.series(compileTS, minifyJS, gulp.parallel(tsWatch, browsersync))
import gulp from "gulp"
import gulpTS from 'gulp-typescript'
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
    return tsProject.src().pipe(tsProject()).js.pipe(gulp.dest("public"))
}

function tsWatch() {
    return gulp.watch('src/main.ts', compileTS)
}

export default gulp.series(compileTS, gulp.parallel(tsWatch, browsersync))
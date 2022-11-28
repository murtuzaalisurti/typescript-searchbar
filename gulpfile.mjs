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
        reloadDelay: 3000,
        notify: false
    }, (err, instance) => {
        console.log(`Error:- ${err}, \n${instance.active ? `An instance is active` : `No active instance`}\n`)
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

export const watch = gulp.parallel(tsWatch, browsersync)
export default gulp.series(compileTS, minifyJS, browsersync)
// export default gulp.series(compileTS, minifyJS, gulp.parallel(tsWatch, browsersync))
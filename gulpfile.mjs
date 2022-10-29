import gulp from "gulp"
import browserSync from "browser-sync"
browserSync.create()

gulp.task('default', () => {
    browserSync.init({
        watch: true,
        server: {
            baseDir: './public'
        },
        notify: false
    }, (err, instance) => {
        console.log(err, instance.active)
    })
})
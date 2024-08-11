//compilador de TypeScript lo compila en varios archivos js en la carpeta build
//se puede hacer que todo se compile en un solo archivo minificado. con tersel y map. Mas una confifuracion del json de ts

var gulp = require('gulp');
var ts = require('gulp-typescript');
var terser = require('gulp-terser');
var  concat  = require ( 'gulp-concat'); 
var sourcemaps = require('gulp-sourcemaps');

//imagenes 
const webp = require('gulp-webp');
const imagemin = require('gulp-imagemin');
const cache = require('gulp-cache');
var imageResize = require('gulp-image-resize');

var postcss = require('gulp-postcss');
var gulp = require('gulp');
var autoprefixer = require('autoprefixer');
var cssnano = require('cssnano');

gulp.task('css', function () {
    var plugins = [
        autoprefixer(),
        cssnano()
    ];
    return gulp.src('./src/**/*.css')
        .pipe(postcss(plugins))
        .pipe(gulp.dest('./styles/'));
});

gulp.task('ts', function () {

    gulp.watch('ts/**/*.ts', function(){
        return gulp.src('ts/**/*.ts')
        .pipe(ts({
            noImplicitAny: true,
            //para que compile import y export debe tener es6 y type="module" en html
            target: 'es6',
            outFile: 'app.js'
        }))
        .pipe(gulp.dest('src/')); 
    })
   
});

gulp.task('mini', function(){

    gulp.watch('./src/**/*.js', function(){
        return gulp.src('src/**/*.js')
    
        .pipe(sourcemaps.init())
        // .pipe(concat('main.js'))
        .pipe(terser())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('build/'));
    })
    
    
});

function imagenes (){
    return gulp.src('src/img/*.*')
    .pipe(imagemin([
        imagemin.gifsicle({interlaced: true}),
        imagemin.mozjpeg({quality: 75, progressive: true}),
        imagemin.optipng({optimizationLevel: 5}),
        imagemin.svgo({
            plugins: [
                {removeViewBox: true},
                {cleanupIDs: false}
            ]
        })
    ]))
    .pipe(gulp.dest('build/img'))
        
}

function versionWebp(){
    return gulp.src('src/img/*.*')
        .pipe(webp())
        .pipe(gulp.dest('build/img'))
        .pipe(gulp.src('src/img/*.*'))
        .pipe(cache(imagemin({ optimizationLevel: 3})))
        .pipe(gulp.dest('build/img'))
        
}

gulp.task('img', imagenes);
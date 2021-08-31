//* Archivo creado por alejandro, para min de archivos js sin muchos cambios.*//
//* Recordar correr el comando: npx gulp generate-wp-content luego de npm run build*//

var gulp = require('gulp');
var rename = require('gulp-rename');
var replace = require('gulp-replace');
var async = require('async');
var spsave = require("gulp-spsave");

gulp.task('generate-wp-content', function(cb){
   async.series([
      function(next){
        gulp.src('./build/index.html')
        .pipe(rename('wpcontent.txt'))     
        .pipe(replace('<!doctype html>', ''))
        .pipe(replace('<html>',''))
        .pipe(replace('<head>',''))
        .pipe(replace(/<title>.*<\/title>/,''))  //regex-replace     
        //.pipe(replace(/<meta.*><style/,'<style'))  //regex-replace
        .pipe(replace('</head>',''))
        .pipe(replace('<body>',''))
        .pipe(replace('</body>',''))
        //.pipe(replace('/static/js/','../siteassets/scripts/'))
        .pipe(replace('/static/js/','../siteassets/priceswithusd/'))
        .pipe(replace('</html>',''))
        .pipe(gulp.dest('./build/static/js/'))         
        .on('end',next);
      },
      function(next){
        gulp.src('./build/static/js/2*chunk.js')
        .pipe(rename('2.chunk.js'))
        .pipe(gulp.dest('./build/static/js/'))
        .on('end', next);              
      },
      function(next){
        gulp.src('./build/static/js/2*chunk.js.map')
        .pipe(rename('2.chunk.js.map'))
        .pipe(gulp.dest('./build/static/js/'))
        .on('end', next);              
      },
      function(next){
        gulp.src('./build/static/js/main*chunk.js')
        .pipe(rename('main.chunk.js'))
        .pipe(gulp.dest('./build/static/js/'))
        .on('end', next);
      },
      function(next){
        gulp.src('./build/static/js/main*chunk.js.map')
        .pipe(rename('main.chunk.js.map'))
        .pipe(gulp.dest('./build/static/js/'))
        .on('end', next);
      }
   ], cb);
});

var spsaveCredential = {
    username: "agarcia@arturos.com.ve",
    password: "Jul14$Tk7_"
};

(function () {
    "use strict";
    
    var spsaveCoreOption = {
        siteUrl: "http://ve-spfe2:86/sites/ArturosLink/InventoryControl",
        folder: "SiteAssets/scripts",
        checkin: true,
        checkinType: 1,
        flatten: true,
        domainThrown : true,
        notification: true
    };
        
    gulp.task("upload", function () {
        return gulp.src(["E:/Desarrollo/lnieto/PreciosEmpleado/build/static/js/*.*"])
        .pipe(spsave(spsaveCoreOption, spsaveCredential));
    });
})();

gulp.task("spsave", function () {
    return gulp.src(["E:/Desarrollo/lnieto/PreciosEmpleado/build/static/js/hola.txt"])
       .pipe(spsave({
           username: "agarcia@arturos.com.ve",
           password: "Jul14$Tk7_",
           siteUrl: "http://ve-spfe2:86/sites/ArturosLink/InventoryControl",
           folder: "SiteAssets/scripts"
        }));
});

gulp.task('observar',function(){
    gulp.watch('build/index.html',gulp.series('generate-wp-content'));
})
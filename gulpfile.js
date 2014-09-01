var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var browserSync = require('browser-sync');
var jade = require("gulp-jade");
var stylus = require("gulp-stylus");

//パスの設定とか
var config = {
  "path":{
    "public": "./web_public/",
    "pages": "./src/pages/**/*.jade",
    "layout": "./src/layout/**/*.jade",
    "style": "./src/style/**/*.styl"
  }
};

//サーバ立ち上げ
gulp.task("browserSync",function(){
  browserSync({
    server: {
      baseDir: config.path.public
    }
  });
});


//ファイルの監視とブラウザーシンクの更新
gulp.task("watch",function(){
  gulp.watch([config.path.public + "**/*"],function(){
    browserSync.reload();
  });
});

//jade（pages）
gulp.task("pages", function() {
  gulp.watch(config.path.pages,function(){
    console.log("pages rebuild");
    gulp.src(config.path.pages)
      .pipe(jade({
        pretty: true
      }))
      .pipe(gulp.dest(config.path.public));
  });
});

//jade（layout）
gulp.task("layout", function() {
  gulp.watch(config.path.layout,function(){
    console.log("change layout, pages rebuild");
    gulp.src(config.path.pages)
      .pipe(jade({
        pretty: true
      }))
      .pipe(gulp.dest(config.path.public));
  });
});

//stylus
gulp.task("stylus",function(){
  gulp.watch(config.path.style,function(){
    console.log("stylesheets rebuild");
    gulp.src(config.path.style)
      .pipe(stylus())
      .pipe(gulp.dest(config.path.public + "css/"));
  });
});

//起動
gulp.task("default", ["browserSync","watch","pages","layout","stylus"]);
var gulp = require("gulp");
var browserSync = require("browser-sync").create();
var proxy = require("http-proxy-middleware");
var reload = browserSync.reload;
var path = require("path");

/**
 * Configure proxy middleware
 */
var jsonPlaceholderProxy = proxy("/crud", {
    target: "http://localhost:333",
    changeOrigin: true, // for vhosted sites, changes host header to match to target's host
    logLevel: "debug"
});

browserSync.init({
    server: {
        baseDir: "./app",
        port: 3000,
        middleware: [jsonPlaceholderProxy]
    },
    startPath: "/index.html"
});

// 监视文件改动并重新载入
gulp.watch(["./app/**"], {
    cwd: "app"
}, reload);
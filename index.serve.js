let browserSync = require("browser-sync").create();
// let reload = browserSync.reload;
let proxy = require("http-proxy-middleware");

/**
 * Configure proxy middleware
 */
let jsonPlaceholderProxy = proxy("/crud", {
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
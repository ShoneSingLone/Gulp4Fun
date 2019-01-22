requirejs.config({
    "baseUrl": "js/lib",
    "paths": {
        "app": "../index",
    }
});
// Load the main app module to start the app
requirejs(["app"]);
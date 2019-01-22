define(["vue"], function (Vue) {
    //the jquery.alpha.js and jquery.beta.js plugins have been loaded.
    window.app = new Vue({
        el: "#app",
        template: `<div id="app">
        {{ message }}
      </div>`,
        data: {
            message: "Hello Vue!"
        }
    });
});
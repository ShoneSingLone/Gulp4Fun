let path = require("path");
let Tools = require("./src/utils/file");

const Loader = function (code) {
    function getSource(source, type) {
        const regex = new RegExp(`<${type}[^>]*>`);
        let openingTag = source.match(regex);
        if (!openingTag) return "";
        else openingTag = openingTag[0];
        return source.slice(source.indexOf(openingTag) + openingTag.length, source.lastIndexOf(`</${type}>`));
    }
    let js = getSource(code, "script").replace(/export default/, "return ");
    let css = getSource(code, "style");
    let html = "<div id=\"app\">" + getSource(code, "template") + "</div>";

    if (this.html !== "" && this.js !== "") {
        /*  const parseStrToFunc = new Function(this.js)();
        parseStrToFunc.template = this.html;
               const Component = Vue.extend(parseStrToFunc);
                this.component = new Component().$mount();
                this.$refs.display.appendChild(this.component.$el);
         */

    }

    return {
        js,
        css,
        html
    };
};

(async () => {
    try {
        let res = await Tools.readFile(path.resolve(__dirname, "app/vue/test.vue"));
        let loader = new Loader(res);



        loader.js = loader.js.replace("template: \"#template\"", `template: \`${loader.html}\``);

        await Tools.writeFile(path.resolve(__dirname, "app/vue/loader.js"), loader.js);
        await Tools.writeFile(path.resolve(__dirname, "app/vue/loader.css"), loader.css);
        await Tools.writeFile(path.resolve(__dirname, "app/vue/loader.html"), loader.html);
    } catch (error) {
        console.warn(error);
    }
})();
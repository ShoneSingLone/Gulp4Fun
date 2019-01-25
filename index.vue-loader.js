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
    let html = getSource(code, "template");
    js = js.replace("template: \"#template\",", `template: ${JSON.stringify(html)},`);

    return {
        js,
        css,
        html
    };
};

(async (fileName) => {
    try {
        let res = await Tools.readFile(path.resolve(__dirname, `app/vue/${fileName}.vue`));
        let loader = new Loader(res);
        await Tools.writeFile(path.resolve(__dirname, `app/vue/split/${fileName}.js`), loader.js);
        await Tools.writeFile(path.resolve(__dirname, `app/vue/split/${fileName}.css`), loader.css);
        await Tools.writeFile(path.resolve(__dirname, `app/vue/split/${fileName}.html`), loader.html);
    } catch (error) {
        console.warn(error);
    }
})("test");
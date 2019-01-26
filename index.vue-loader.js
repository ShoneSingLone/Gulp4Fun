let path = require("path");
let Tools = require("./src/utils/file");
let gulp = require("gulp");
let babel = require("@babel/core");
let sass = require('gulp-sass');
let postcss = require('gulp-postcss');
let autoprefixer = require('autoprefixer');


const Loader = function (code) {

    function getSource(source, type) {
        const regex = new RegExp(`<${type}[^>]*>`);
        let openingTag = source.match(regex);
        if (!openingTag) return "";
        else openingTag = openingTag[0];
        return source.slice(source.indexOf(openingTag) + openingTag.length, source.lastIndexOf(`</${type}>`));
    }

    let js = getSource(code, "script");
    let css = getSource(code, "style");
    let html = getSource(code, "template");

    const regex = new RegExp(`template: "#template",`);
    js = js.replace(regex, `template: \`${html}\`,`);

    return {
        js,
        css,
        html
    };
};

const get_CSS_JS = async (fileName) => {
    try {
        let res = await Tools.readFile(path.resolve(__dirname, `app/vue/${fileName}.vue`));
        let loader = new Loader(res);
        /* css */
        let scssPath = path.resolve(__dirname, `app/vue/scss/${fileName}.scss`);
        await Tools.writeFile(scssPath, loader.css);
        let plugins = [autoprefixer({
            browsers: ['last 2 versions', 'last 2 Explorer versions'],
        })];
        await gulp.src([scssPath])
            .pipe(sass())
            .pipe(postcss(plugins))
            .pipe(gulp.dest(path.resolve(__dirname, `app/style/vue`)));
        /* html */
        await Tools.writeFile(path.resolve(__dirname, `app/html/template/${fileName}.html`), loader.html);
        /* JavaScript */
        /* es6=>es5 */
        let {
            code
        } = await babel.transformAsync(loader.js, {
            "presets": [
                ["@babel/preset-env", {
                    "useBuiltIns": "entry"
                }]
            ]
        });
        await Tools.writeFile(path.resolve(__dirname, `app/js/lib/vue/${fileName}.js`), code);
    } catch (error) {
        console.warn(error);
    }
};

get_CSS_JS("test");
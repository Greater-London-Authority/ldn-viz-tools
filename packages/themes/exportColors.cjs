const resolveConfig = require("tailwindcss/resolveConfig.js");
const fs = require('fs');


const tailwindConfig = {
    presets: [require("./ldn-theme.js")],

    theme: {
        extend: {},
    },

    plugins: [],
};

const fullConfig = resolveConfig(tailwindConfig);

const tokens = {color: fullConfig.theme.colors};

const categories = ["core", "gla", "perceptual"];

const extractColors = () => {
    const colors = {};
    for (const catName of Object.keys(tokens.color)) {
        if (categories.includes(catName)) {

            const cat = tokens.color[catName];
            for (let color of Object.keys(cat)) {
                for (let val of Object.keys(cat[color])) {
                    colors[`${catName}-${color}-${val}`] = cat[color][val];
                }
            }

        }
    }
    return colors;
}


const exportToCSS = (colors) => {
    const stream = fs.createWriteStream("./colors.css",)

    stream.write(":root{\n")

    for (let colorName of Object.keys(colors)) {
        stream.write(`  --${colorName}: ${colors[colorName]};\n`)
    }

    stream.write("}\n")
    stream.end()
}

const colors = extractColors();
exportToCSS(colors);
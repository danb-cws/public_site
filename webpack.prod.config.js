var webpack = require("webpack"),
    path = require("path"),
    ExtractTextPlugin = require("extract-text-webpack-plugin"),
    autoprefixer = require("autoprefixer"),
    precss = require("precss");

module.exports = {
    context: __dirname,
    entry:[
        "./src/js/client.js"
    ],
    output: {
        path: path.join(__dirname, "/dist/js"),
        publicPath: "/dist/js/",
        filename: "bundle.js"
    },
    //devtool: "eval",//eval breaks sass sourcemap?
    module: {
        loaders: [
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract("style", "css?sourceMap!postcss?sourceMap!sass?sourceMap")
            }
        ]
    },
    postcss: function () {
        return [autoprefixer({ browsers: ["last 2 versions"] }), precss];
    },
    plugins: [
        new ExtractTextPlugin("../css/[name].css")
    ],
    resolve: {
        extensions: ['', '.js', '.json']
    }
};

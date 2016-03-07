var webpack = require('webpack'),
    path = require('path'),
    ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    debug: true,
    entry:'./src/js/client.js',
    output: {
        path: path.join(__dirname, 'dist/js'),
        filename: 'bundle.js'
    },
    devtool: "source-map",
    module: {
        loaders: [{
            test: /\.scss$/,
            //loader: "style!css?sourceMap!sass?sourceMap"
            loader: ExtractTextPlugin.extract("style", "css?sourceMap!sass?sourceMap")
        }]
    },
    plugins: [
        new ExtractTextPlugin('../css/[name].css')
    ]
};
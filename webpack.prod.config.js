var webpack = require('webpack'),
    path = require('path'),
    CleanWebpackPlugin = require('clean-webpack-plugin'),
    ExtractTextPlugin = require('extract-text-webpack-plugin'),
    autoprefixer = require('autoprefixer'),
    precss = require('precss');

module.exports = {
    context: __dirname,
    entry:[
        './src/js/client.js'
    ],
    output: {
        path: path.join(__dirname, '/dist/js'),
        publicPath: '/dist/js/',
        filename: '[name].[hash].js'
        //filename: '[name].js'
    },
    //devtool: "eval",//eval breaks sass sourcemap?
    module: {
        loaders: [
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract('style', 'css?sourceMap!postcss?sourceMap!sass?sourceMap')
            }
        ]
    },
    postcss: function () {
        return [autoprefixer({ browsers: ['last 2 versions'] }), precss];
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new ExtractTextPlugin('../css/[name].[hash].css'),
        new webpack.optimize.UglifyJsPlugin({minimize: true})
    ],
    resolve: {
        extensions: ['', '.js', '.json']
    }
};

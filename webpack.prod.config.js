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
    },
    module: {
        loaders: [
            {
                test: /\.scss$/,
                include: /src/,
                loader: ExtractTextPlugin.extract('style', 'css?sourceMap!postcss?sourceMap!sass?sourceMap')
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel',
                query: {
                    presets: ['es2015']
                }
            }
        ]
    },
    postcss: function () {
        return [autoprefixer({ browsers: ['last 2 versions'] }), precss];
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new ExtractTextPlugin('../css/[name].[hash].css'),
        //new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({minimize: true})
    ],
    resolve: {
        extensions: ['', '.js', '.json']
    }
};

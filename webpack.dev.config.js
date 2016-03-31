const webpack = require('webpack');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const autoprefixer = require('autoprefixer');
const precss = require('precss');

module.exports = {
  context: path.resolve(__dirname, 'src'),
  entry: [
    'webpack-hot-middleware/client',
    './js/client.js',
  ],
  output: {
    path: '/', // must have some val here
    publicPath: 'http://localhost:5000/', // absolute path req here for images in css to work with sourcemaps on. TODO: assign port from env
    filename: 'js/[name].js',
  },
  devtool: 'source-map',
  eslint: {
    configFile: './.eslintrc',
  },
  module: {
    preLoaders: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'eslint-loader',
      },
    ],
    loaders: [
      {
        test: /\.scss$/,
        include: /sass/,
        loader: 'style!css?sourceMap!sass?sourceMap',
      },
      {
        test: /.*\.(gif|png|jpe?g|svg)$/i,
        exclude: /(node_modules|bower_components)/,
        loaders: [
          'url?limit=8192&name=[path][name].[ext]?[hash]',
          'image-webpack?{progressive:true, optimizationLevel: 7, interlaced: false, pngquant:{quality: "65-90", speed: 4}}',
        ],
      },
      {
        test: /\.(js|jsx)$/,
        include: /js/,
        loader: 'babel',
        query: {
          presets: ['es2015'],
        },
      },
    ],
  },
  postcss() {
    return [autoprefixer({ browsers: ['last 2 versions'] }), precss];
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'main', // Move dependencies to our main file
      children: true, // Look for common dependencies in all children,
      minChunks: 2, // How many times a dependency must come up before being extracted
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
  ],
  resolve: {
    extensions: ['', '.js', '.json', '.sass'],
  },
};

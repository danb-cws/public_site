const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const postcssImport = require('postcss-import');
const postcssNext = require('postcss-cssnext');
const precss = require('precss');

module.exports = {
  context: `${__dirname}/src`,
  entry: [
    './js/client.js',
  ],
  output: {
    path: `${__dirname}/dist`,
    publicPath: '/',
    filename: 'js/[name].[hash].js',
    chunkFilename: 'js/[name].[chunkhash].js',
  },
  debug: false,
  module: {
    loaders: [
      {
        test: /\.s?css$/,
        include: /sass/,
        loader: ExtractTextPlugin.extract('style', 'css!postcss'),
      },
      {
        test: /.*\.(gif|png|jpe?g|svg)$/i,
        exclude: /node_modules/,
        loaders: [
          'url?limit=8192&name=[path][name].[ext]?[hash]',
          'image-webpack?{progressive:true, optimizationLevel: 5, interlaced: false, pngquant:{quality: "65-90", speed: 4}}',
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
  postcss(wp) {
    return [
      postcssImport({ addDependencyTo: wp }), // Must be first item in list
      precss,
      postcssNext({ browsers: ['last 2 versions'] }),
    ];
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new ExtractTextPlugin('./css/[name].[hash].css', { allChunks: true }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'main', // Move dependencies to our main file
      children: true, // Look for common dependencies in all children,
      minChunks: 2, // How many times a dependency must come up before being extracted
    }),
    new webpack.optimize.MinChunkSizePlugin({
      minChunkSize: 51200, // ~50kb
    }),
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
    }),
  ],
  resolve: {
    extensions: ['', '.js', '.json'],
  },
};

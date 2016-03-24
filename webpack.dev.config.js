const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const precss = require('precss');

module.exports = {
  context: __dirname,
  entry: [
    'webpack-hot-middleware/client',
    './src/js/client.js',
  ],
  output: {
    path: '/', // must have some val here
    publicPath: 'http://localhost:5000/', // absolute path req here for images in css to work with sourcemaps on
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
        include: /src/,
        loader: 'style!css?sourceMap!sass?sourceMap',
      },
      {
        test: /.*\.(gif|png|jpe?g|svg)$/i,
        loaders: [
          'file?name=img/[name].[hash].[ext]',
          'image-webpack?{progressive:true, optimizationLevel: 7, interlaced: false, pngquant:{quality: "65-90", speed: 4}}',
        ],
      },
      {
        test: /\.(js|jsx)$/,
        include: /src/,
        loader: 'babel',
        query: {
          cacheDirectory: !(process.env.NODE_ENV === 'production'),
          presets: ['es2015'],
        },
      },
    ],
  },
  postcss() {
    return [autoprefixer({ browsers: ['last 2 versions'] }), precss];
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
  ],
  resolve: {
    extensions: ['', '.js', '.json'],
  },
};

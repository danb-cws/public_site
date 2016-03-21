'use strict';
const express = require('express');
const path = require('path');
const adaro = require('adaro'); // dust template engine
const webpack = require('webpack');
let webpackConfig;
let compiler;
const templateConfig = {
  devMode: false,
  fileHash: null,
};

// app setup
const app = express();
app.set('port', (process.env.PORT || 5000));
app.set('views', path.join(__dirname, '/src/views'));
app.engine('dust', adaro.dust());
app.set('view engine', 'dust');
app.use(express.static('dist'));

if (process.env.NODE_ENV !== 'production') {
  console.log('*** Dev build');
  templateConfig.devMode = true;
  webpackConfig = require('./webpack.dev.config.js');
  compiler = webpack(webpackConfig);
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');

  app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath,
    stats: { colors: true },
  }));

  app.use(webpackHotMiddleware(compiler, {
    log: console.log,
    path: '/__webpack_hmr',
    heartbeat: 10 * 1000,
    reload: true,
  }));
} else {
  console.log('*** Prod build');
  webpackConfig = require('./webpack.prod.config.js');
  compiler = webpack(webpackConfig);
  compiler.run((err, stats) => {
    if (err) {
      console.log('*** error webpack prod build: ', err);
    }
    // console.log( stats.toJson().assetsByChunkName);
    templateConfig.fileHash = stats.toJson().hash;
  });
}

/* routes */
app.get('/hello', (req, res) => {
  let result = '';
  result = '<h1>hulloo wurld</h1>';
  res.send(result);
});

app.get('/', (req, res) => {
  res.render('index', {
    config: templateConfig,
    pageTitle: ' - index page',
    title: 'dan',
    job: 'fe dev',
    techs: [
      'Node',
      'Express',
      'Dust',
      'Webpack',
      'Tooling and boilerplate',
    ],
  });
});

app.listen(app.get('port'), () => {
  console.log('*** Running on port', app.get('port'));
  console.log('*** process.env.NODE_ENV:' + process.env.NODE_ENV);
});

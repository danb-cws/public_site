var express = require('express');
var path = require('path');
var adaro = require('adaro');//dust template engine

var webpack = require('webpack');
var webpackConfig, compiler, isDev = false, webpackHash = null;

var app = express();

app.set('port', (process.env.PORT || 5000));
app.set('views', path.join(__dirname, '/src/views'));
app.engine('dust', adaro.dust());
app.set('view engine', 'dust');

if ( process.env.NODE_ENV !== 'production' ) {
    console.log('*** Dev build');
    isDev = true;
    webpackConfig = require('./webpack.dev.config.js');
    compiler = webpack(webpackConfig);

    var webpackDevMiddleware = require('webpack-dev-middleware');
    var webpackHotMiddleware = require('webpack-hot-middleware');

    app.use(webpackDevMiddleware(compiler, {
        noInfo: true,
        publicPath: webpackConfig.output.publicPath,
        stats:{colors: true}
    }));

    app.use(webpackHotMiddleware(compiler, {
        log: console.log,
        path: '/__webpack_hmr',
        heartbeat: 10 * 1000
    }));

} else {
    console.log('*** Prod build');
    webpackConfig = require('./webpack.prod.config.js');
    compiler = webpack(webpackConfig);
    compiler.run(function(err, stats) {
        if(err) {
            console.log('*** error webpack prod build: ', err);
        }
        console.log( stats.toJson().assetsByChunkName);
        webpackHash =  stats.toJson().hash;
    });
}

app.use(express.static('dist'));

/* routes */
app.get('/hello', function(req, res) {
  var result = '';
  result = '<h1>hulloo wurld</h1>';
  res.send(result);
});

app.get('/', function(req, res) {
  res.render('index', {
      devMode: isDev,
      fileHash: webpackHash,
      pageTitle: ' - index page',
      title: 'dan',
      job: 'fe dev',
      "techs": [
          'Node',
          'Express',
          'Dust',
          'Webpack',
          'Tooling and boilerplate'
      ]
  });
});

app.listen(app.get('port'), function() {
  console.log('*** Running on port', app.get('port'));
  console.log('*** process.env.NODE_ENV:' + process.env.NODE_ENV);
});
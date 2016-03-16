var express = require("express");
var path = require("path");
var adaro = require("adaro");//dust template engine

var webpack = require("webpack");
var webpackConfig, compiler;

var app = express();

app.set("port", (process.env.PORT || 5000));
app.set("views", path.join(__dirname, "/src/views"));
app.engine("dust", adaro.dust());
app.set("view engine", "dust");

if ( app.get('env') !== 'production' ) {
    console.log("*** Dev build ");
    webpackConfig = require("./webpack.dev.config.js");

    compiler = webpack(webpackConfig);

    var webpackDevMiddleware = require("webpack-dev-middleware");
    var webpackHotMiddleware = require("webpack-hot-middleware");

    app.use(webpackDevMiddleware(compiler, {
        noInfo: true,
        publicPath: webpackConfig.output.publicPath,
        stats:{colors: true}
    }));
    app.use(webpackHotMiddleware(compiler, {
        log: console.log,
        path: "/__webpack_hmr",
        heartbeat: 10 * 1000
    }));

} else {
    console.log("*** Prod build");
    webpackConfig = require("./webpack.prod.config.js");
    compiler = webpack(webpackConfig);
    compiler.run(function(err, stats) {
        if(err) {
            console.log('error webpack prod: ', err);
        }
    });
}

app.use(express.static(__dirname));

/* routes */
app.get("/hello", function(req, res) {
  var result = '';
  result = '<h1>hulloo wurld</h1>';
  res.send(result);
});

app.get("/index", function(req, res) {
  res.render("index", {
      title: "dan",
      job: "fe dev",
      "techs": [
          {"tech": "Node"},
          {"tech": "Express"},
          {"tech": "Dust"},
          {"tech": "Webpack"},
          {"tech": "Tooling and boilerplate"}
      ]
  });
});

app.listen(app.get("port"), function() {
  console.log('Running on port', app.get("port"));
  console.log("process.env.NODE_ENV:" + app.get("env"));
});
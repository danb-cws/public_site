var express = require("express");
var path = require("path");
var adaro = require("adaro");//dust template engine
var webpackDevMiddleware = require("webpack-dev-middleware");
var webpackHotMiddleware = require("webpack-hot-middleware");

var app = express();
app.use(express.static(__dirname, "/dist/"));
app.set("port", (process.env.PORT || 5000));
app.set("views", path.join(__dirname, "/src/views"));
app.engine("dust", adaro.dust());
app.set("view engine", "dust");

var webpack = require("webpack");
//var webpackConfig = require(process.env.WEBPACK_CONFIG ? process.env.WEBPACK_CONFIG : './webpack.config');
var webpackConfig = require("./webpack.config.js");
var compiler = webpack(webpackConfig);

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
  //console.log("process.env.NODE_ENV: ",app.get("process.env.NODE_ENV"));
});
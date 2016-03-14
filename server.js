var express = require("express");

var path = require("path");
var adaro = require("adaro");

//var webpackDevMiddleware = require("webpack-dev-middleware");
//var webpackHotMiddleware = require("webpack-hot-middleware");
var webpack = require("webpack");
var webpackConfig = require("./webpack.config.js");

var app = express();
var compiler = webpack(webpackConfig);

app.set("port", (process.env.PORT || 5000));

//app.use(webpackDevMiddleware(compiler, {
//    //filename: "bundle.js",
//    //path: webpackConfig.output.path,
//    //publicPath: webpackConfig.output.publicPath,
//    stats: {
//        colors: true
//    }
//}));
//
//app.use(webpackHotMiddleware(compiler, {
//    log: console.log,
//    path: "/__webpack_hmr",
//    heartbeat: 10 * 1000
//}));


app.use(express.static(__dirname, "/dist/js"));

(function() {
    console.log("###starting iefe in server.js");
    var webpack = require("webpack");
    //var webpackConfig = require("./webpack.config.js");
    var webpackConfig = require(process.env.WEBPACK_CONFIG ? process.env.WEBPACK_CONFIG : './webpack.config');
    var compiler = webpack(webpackConfig);
    console.log("###publicPath in index dev mw: " + webpackConfig.output.publicPath);
    app.use(require("webpack-dev-middleware")(compiler, {
        //hot: true,
        noInfo: false,
        //filename: "bundle.js",
        publicPath: webpackConfig.output.publicPath,
        stats:{colors: true}
        //historyApiFallback: true
    }));
    app.use(require("webpack-hot-middleware")(compiler, {
        log: console.log,
        path: "/__webpack_hmr",
        heartbeat: 10 * 1000
    }));
})();

app.set("views", path.join(__dirname, "/dist/views"));

app.engine("dust", adaro.dust());
app.set("view engine", "dust");

app.get("/hello", function(req, res) {
  var result = '';
  result = '<h1 style="font-size: 72px; margin-top: 100px; text-align: center">hulloo wurld</h1>';
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

app.get("/test", function(req, res) {
    res.sendFile(__dirname + '/test.html');
});

app.listen(app.get("port"), function() {
  console.log('Running on port', app.get("port"));
  //console.log("process.env.NODE_ENV: ",app.get("process.env.NODE_ENV"));
});
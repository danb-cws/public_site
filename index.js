var express = require('express');
var app = express();
var path = require('path');
var adaro = require('adaro');

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname));


app.set('views', path.join(__dirname, '/dist/views'));

app.engine('dust', adaro.dust());
app.set('view engine', 'dust');

app.get('/hello', function(req, res) {
  var result = '';
  result = '<h1 style="font-size: 72px; margin-top: 100px; text-align: center">hulloo wurld</h1>';
  res.send(result);
});

app.get('/', function(req, res) {
  res.render('index', {
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

app.listen(app.get('port'), function() {
  console.log('Running on port', app.get('port'));
  console.log('process.env.NODE_ENV: ',app.get('process.env.NODE_ENV'));
});

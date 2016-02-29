var express = require('express');
var app = express();
//var cool = require('cool-ascii-faces');

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));

/*app.get('/', function(request, response) {
  var result = '';
  var times = process.env.TIMES || 5;
  for (i=0; i < times; i++)
    result += cool() + '</br>';
  response.send(result);
});*/

app.get('/', function(request, response) {
  var result = '';
  result = '<h1 style="font-size: 72px; margin-top: 100px; text-align: center">hello there world</h1>';
  response.send(result);
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

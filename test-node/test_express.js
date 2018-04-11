let express = require('express');

let app = express();

app.get('/', function(req, res) {
  res.setHeader('Content-Type', 'text/plain');
  res.send('You are on the Home Page.');
});

app.get('/second', function(req, res) {
  res.setHeader('Content-Type', 'text/pmain');
  res.send('Hey, you\'re on the second page huh');
});

app.get('/third/deeper', function(req, res) {
  res.setHeader('Content-Type', 'text/pmain');
  res.send('Psst, don\'t go any further or you\'ll be lost !');
});

app.get('/fourth/:stagenum/deepest', function(req, res) {
  res.setHeader('Content-Type', 'text/pmain');
  if (isNaN(req.params.stagenum)) {
    res.send('Please specify a number in the url bar');
  } else {
    res.send('You are on the last page... but from which stage ?\nStage n°' + req.params.stagenum);
  }
});

app.use(function(req, res, next) {
  res.setHeader('Content-Type', 'text/plain');
  res.status(404).send('Page 404, please try another root...');
});

app.listen(8080);

// You can write all the .get() and .use() together, they are all applied on the same variable ==> app
// ==> app.get(... ).get(... ).get(... ).use(... );

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

//-------USING EJS----------//

app.get('/fifth/:stagename/hidden', function(req ,res) {
  res.render('chambre.ejs', {stage: req.params.stagename});
});

app.get('/count/:number', function(req, res) {
  let names = ['Robert', 'Jacques', 'David'];
  res.render('page.ejs', {count: req.params.number, names: names})
});

app.use(function(req, res, next) {
  res.setHeader('Content-Type', 'text/plain');
  res.status(404).send('Page 404, please try another root...');
});

//-------USING MIDDLEWARES----------//
let morgan = require('morgan');

app.use(morgan('combined'));
app.use(express.static(__dirname + '/public'));
app.use(function(req, res) {
  res.send('Hello');
});

app.listen(8080);

// You can write all the .get() and .use() together, they are all applied on the same variable ==> app
// ==> app.get(... ).get(... ).get(... ).use(... );




//-------------EXPRESS AND MIDDLEWARES------------//
// Express est un framework basé sur le concept de middlewares.
// Ce sont des petits morceaux d'application qui rendent chacun un service spécifique.
// Vous pouvez charger uniquement les middlewares dont vous avez besoin.

// - compression : permet la compression gzip de la page pour un envoi plus rapide au navigateur
// - cookie-parser : permet de manipuler les cookies
// - cookie-session : permet de gérer des informations de session (durant la visite d'un visiteur)
// - serve-static : permet de renvoyer des fichiers statiques contenus dans un dossier (images, fichiers à télécharger...)
// - serve-favicon : permet de renvoyer la favicon du site
// - csrf : fournit une protection contre les failles CSRF
// - etc.

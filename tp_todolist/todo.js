let express = require('express');
let session = require('cookie-session');
let bodyParser = require('body-parser');
let urlencodedParser = bodyParser.urlencoded({extended: false});

let app = express();

app.use(session({secret: 'todosecret'}));

app.get('/', function(req, res) {
  res.setHeader('Content-Type', 'text/plain');
  res.send('Welcome on the Home Page');
});

app.get('/todo', function(req, res) {
  res.setHeader('Content-Type', 'text/plain');
  res.send('Todo Page');
});

app.post('/todo/add', function(req, res) {
  let oneTask = req.body.task;
  let tasks = ['Manger des céréales', 'Faire les courses'];
  tasks.push(oneTask);
  res.setHeader('Content-Type', 'text/plain');
  res.render('todo.ejs', {alltasks: req.params.tasks})
  res.send(`you sent ${oneTask} to Express`)
});

app.get('/todo/delete/:id', function(req, res) {

});

app.use(function(req, res, next) {
  res.setHeader('Content-Type', 'text/plain');
  res.status(404).send('Page 404, please try another root...');
});

app.listen(8080);

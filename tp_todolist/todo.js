let express = require('express');
let session = require('express-session');
let bodyParser = require('body-parser');
let urlencodedParser = bodyParser.urlencoded({ extended: false });

let app = express();

app.use(express.static('public'));
app.use(session({secret: 'todosecret'}));
app.use(urlencodedParser);


app.get('/', function(req, res) {
  res.setHeader('Content-Type', 'text/html');
  res.redirect('/todo');
});


//Initialize todo page with ejs
app.get('/todo', function(req, res) {
  res.setHeader('Content-Type', 'text/html');
  if (req.session.task != undefined) {
    res.render("todo.ejs", {tasks: req.session.task});
  } else {
    res.render("todo.ejs", {tasks: []});
  }
  console.log(req.session.task);
});


//Add tasks to the body
app.post('/todo/add', function(req, res) {
  res.setHeader('Content-Type', 'text/html');
  let tasks = {name: req.body.task};
  if (req.session.task == undefined) {
    req.session.task = [];
  }
  req.session.task.push({name: req.body.task, done: false}); 
  
  console.log(req.session.task);
  res.redirect('/todo');
});


//Delete tasks from the array/page
app.get('/todo/delete/:id', function(req, res) {
  res.setHeader('Content-Type', 'text/html');
  if (req.params.id != '') {
    req.session.task.splice(req.params.id, 1);
  }
  res.redirect('/todo');
});


//Choose what to do when the route is not right
app.use(function(req, res, next) {
  res.setHeader('Content-Type', 'text/html');
  res.status(404).send('Page 404, please try another root...');
});


//Set which port to use
app.listen(8080);

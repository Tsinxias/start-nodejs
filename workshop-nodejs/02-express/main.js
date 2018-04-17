// let express = require('express');
// let app = express();
// let path = require('path');
// let session = require('express-session');
// let bodyParser = require('body-parser');

// app.use(session({secret:'hidden'}));
// app.use(express.static('public'));
// app.use(bodyParser.urlencoded({extended:false}));

// app.get('/', function(req, res) {
//     console.log(req.session.tasks);
//     // res.sendFile(path.join(__dirname + '/views/index.html'));
// });

// app.post('/add', function(req, res) {
//     console.log(req.body.tasks);
//     if (req.session.tasks == undefined) {
//         req.session.tasks = [];
//     }
//     req.session.tasks.push({name: req.body.taskName, done: false});
//     res.redirect('/');
// });

// app.listen(8080);


//USING EJS
let express = require('express');
let app = express();
let path = require('path');
let session = require('express-session');
let bodyParser = require('body-parser');
let mongoStore = require('connect-mongo');
let mgStore = mongoStore(session);
let mongoClient = require('mongodb').MongoClient;

let url = 'mongodb://localhost:27017/testNode';

app.use(session({secret:'hidden', 
                 store: new mgStore({url: 'mongodb://localhost:27017/testNode'})
                }
            ));
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:false}));

app.get('/', function(req, res) {
    console.log(req.session.tasks);
    // if (req.session.tasks != undefined) {
    //     res.render("index.ejs", {tasks: req.session.tasks});
    // } else {
    //     res.render("index.ejs", {tasks: []});
    // }
    mongoClient.connect(url, function(err, client) {
        let db = client.db('testNode');
        db.collection('tasks').find().toArray(function(err, data) {
            res.render('index.ejs', {tasks: data});
        });
    })
});

app.post('/add', function(req, res) {
    console.log(req.body.tasks);
    // if (req.session.tasks == undefined) {
    //     req.session.tasks = [];
    // }
    // req.session.tasks.push({name: req.body.taskName, done: false});
    let tasks = {name: req.body.taskName, done: false};
    let expressRes = res;
    mongoClient.connect(url, function(err, client) {
        let db = client.db('testNode');
        db.collection('tasks').insertOne(tasks, function(err, res) {
            console.log(err, res);
            expressRes.redirect('/');
        });
    });
    // res.redirect('/');
});

app.listen(8080);
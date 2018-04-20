//https://zellwk.com/blog/crud-express-mongodb/
//https://zellwk.com/blog/crud-express-and-mongodb-2/

const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb');
let db;

const app = express();

MongoClient.connect('mongodb://localhost:27017/star-wars-quotes', (err, client) => {
    if (err) return console.log(err);
    db = client.db('star-wars-quotes');
    app.listen(8080);
});

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use(bodyParser.json());


app.get('/', (req, res) => {
    db.collection('quotes').find().toArray((err, result) => {
        console.log(result);
        res.render('index.ejs', {quotes: result});
    })
});

app.post('/quotes', (req, res) => {
    console.log(req.body);
    db.collection('quotes').save(req.body, (err, result) => {
        if (err) return console.log(err);
        console.log('Saved to the DataBase');
        res.redirect('/');
    })
});


app.put('/quotes', (req, res) => {
    db.collection('quotes').findOneAndUpdate({name: 'Yoda'}, {
        $set: {
            name: req.body.name,
            quote: req.body.quote
        }
    }, {
        sort: {_id: -1},
        upsert: true
    }, (err, result) => {
        if (err) return res.send(err);
        res.send(result);
    })
})

app.delete('/quotes', (req, res) => {
    db.collection('quotes').findOneAndDelete({name: req.body.name}),
    (err, result) => {
        if (err) return res.send(500, err);
        res.send({message: 'A Darth Vador quote got deleted'});
    }
})
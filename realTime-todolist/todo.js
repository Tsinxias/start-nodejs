const express = require('express');
let app = express();

const http = require('http');
const server = http.createServer(app);
const io = require('socket.io').listen(server);


app.use(express.static('public'));

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/public/todo.html');
})

io.sockets.on('connection', (socket) => {
    console.log('socket connected');
})



server.listen(8080);
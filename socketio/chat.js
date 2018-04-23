const http = require('http');
const fs = require('fs');
const express = require('express');

let app = express();

app.use(express.static('public'));


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/chat.html');
});

const server = http.createServer(app);
server.listen(8080);
const io = require('socket.io').listen(server);

io.sockets.on('connection', (socket, pseudo) => {
    socket.on('new_pseudo', (pseudo) => {
        socket.pseudo = pseudo;
        console.log(socket.pseudo);
    })

    socket.on('new_message', (message) => {
        socket.message = message;
        socket.broadcast.emit('message', {pseudo: socket.pseudo, message: socket.message})
        console.log(socket.message);
    })
})

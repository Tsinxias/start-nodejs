const express = require('express');
let app = express();
const http = require('http');
const server = http.createServer(app);
const io = require('socket.io').listen(server);
const ent = require('ent');
const encode = require('ent/encode');
const decode = require('ent/decode');


app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/chat.html');
});

io.sockets.on('connection', (socket, pseudo) => {
    console.log("socket connecté");

    socket.on('pseudo', (pseudo) => {
        pseudo = ent.encode(pseudo);
        socket.pseudo = pseudo
        socket.broadcast.emit('new_pseudo', pseudo);
    })

    socket.on('message', (data) => {
        console.log(data);
        socket.emit('new_message', {message: data.message, pseudo: data.pseudo});
        socket.broadcast.emit('new_message', {message: data.message, pseudo: socket.pseudo});
    })
})

server.listen(8080);
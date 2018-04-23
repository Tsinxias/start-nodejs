const http = require('http');
const fs = require('fs');

let server = http.createServer((req, res) => {
    fs.readFile('./index.html', 'utf-8', (err, content) => {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(content);
    });
});

const io = require('socket.io').listen(server);

io.sockets.on('connection', (socket) => {
    socket.emit('message',  {content: 'You are here with us !', value: '1'});

    //emit message to all clients
    socket.broadcast.emit('message', {content: 'Say hello to our new nakama !', value: '2'});

    //REALLY simplified session(keep in a variable)
    socket.on('new_guy', (pseudo) => {
        socket.pseudo = pseudo;
        console.log(socket.pseudo)
    })

    //retrieve message when button pressed
    socket.on('message', (message) => {
        console.log(socket.pseudo + ' told me : ' + message);
    });

});

server.listen(8080);
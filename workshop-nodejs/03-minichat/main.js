let express = require('express');
let app = express();
let http = require('http').Server(app);
let io = require('socket.io')(http);

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket) {
    console.log('socket connecté');
    socket.on('messageChat', function(data) {
        console.log(data);
        io.emit('sendMessage', data);
    });
    socket.on('disconnect', function(data) {
        console.log('socket closed');
    });
});

http.listen(8080);
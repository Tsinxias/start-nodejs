const express = require('express');
let app = express();

const http = require('http');
const server = http.createServer(app);
const io = require('socket.io').listen(server);
// const session = require('express-session')({
//     secret: 'hidden', 
//     resave: true,
//     saveUninitialized: true
// });
// const sharedsession = require('express-socket.io-session');

let todolist = [];


app.use(express.static('public'));
// app.use(session);

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/public/todo.html');
})

// io.use(sharedsession(session));

io.sockets.on('connection', (socket) => {
    console.log('Socket connected');
    // let sessions = socket.handshake.session;
    // console.log(sessions);

    socket.emit('todolist', todolist);

    socket.on('new_task', (data) => {
        // console.log(data);
        // if (socket.handshake.session == '') {
        //     socket.handshake.session.data = data;
        // } else {
        //     socket.handshake.session.data = data;
        // }
        // socket.handshake.session.save();
        // console.log(socket.handshake)
        todolist.push(data);
        socket.emit('add_task', todolist[todolist.length-1]);
        socket.broadcast.emit('add_task', todolist[todolist.length-1]);
    })

    socket.on('disconnect', (data) => {
        console.log('Socket disconnected');
        // delete socket.handshake.session.data;
        // socket.handshake.session.save();
    })
})

server.listen(8080);

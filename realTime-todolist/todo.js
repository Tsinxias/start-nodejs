const express = require('express');
let app = express();

const http = require('http');
const server = http.createServer(app);
const io = require('socket.io').listen(server);

let todolist = [];
let index;

app.use(express.static('public'));

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/public/todo.html');
})


io.sockets.on('connection', (socket) => {
    console.log('Socket connected');

    socket.emit('todolist', todolist);

    socket.on('new_task', (inputValue) => {
        todolist.push(inputValue);
        index = todolist.length-1;

        console.log(inputValue);
        console.log(index);
        socket.emit('add_task', {task: inputValue, index: index});
        socket.broadcast.emit('add_task', {task: inputValue, index: index});
        console.log(todolist);
    })

    socket.on('delete_task', (taskID) => {
        todolist.splice(taskID, 1);
        socket.emit('todolist', todolist);
        socket.broadcast.emit('todolist', todolist);
    })

    socket.on('disconnect', (data) => {
        console.log('Socket disconnected');
    })
})

server.listen(8060);

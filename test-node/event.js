//-------------EVENT CLOSE----------------//
// let http = require('http');
//
// let server = http.createServer(function(req, res) {
//   res.writeHead(200);
//   res.end('Hello people');
// });
//
// server.on('close', function() {
//   console.log('Server CLOSED!');
// });
//
// server.listen(8080);
//
// server.close();


//--------------CREATE EVENTS--------------//
// let http = require('http');
// let EventEmitter = require('events').EventEmitter;
//
//
// let server = http.createServer(function(req, res) {
//   res.writeHead(200);
//   res.end('Hello people');
// });
//
// let jeu = new EventEmitter();
//
// jeu.on('gameover', function(message) {
//   console.log(message);
// });
//
// jeu.emit('gameover', 'Vous avez perdu !');
//
// server.listen(8080);


//-----------GET OWN CREATED MODULE IN NODE_MODULES--------------//
let monmodule = require('01_monmodule');

monmodule.sayHello();
monmodule.sayBye();

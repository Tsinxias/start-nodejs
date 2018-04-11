//-----------------FIRST--------------//
// let http = require('http');
//
// let server = http.createServer(function(req, res) {
//   res.writeHead(200, {'Content-Type': 'text/html'});
//   res.write('<!DOCTYPE html>'+
//   '<html lang="en">'+
//   '<head>'+
//   '<meta charset="UTF-8" />'+
//   '<meta name="viewport" content="width=device-width, initial-scale=1.0" />'+
//   '<meta http-equiv="X-UA-Compatible" content="ie=edge" />'+
//   '<title>Document</title>'+
//   '</head>'+
//   '<body>'+
//   '<p>Hello World!</p>'+
//   '</body>'+
//   '</html>');
//   res.end();
// });
//
// server.listen(8080);


//-----------------SECOND-----------------//
// let http = require('http');
// let url = require('url');
//
// let server = http.createServer(function(req, res) {
//   let page = url.parse(req.url).pathname;
//   console.log(page);
//   res.writeHead(200, {'Content-Type': 'text/plain'});
//   if (page == '/') {
//     res.write('Hello ! You are on the home page.');
//   } else if (page == '/second') {
//     res.write('Ooooh you went on the second page. Congrats !');
//   } else if (page == '/third/deeper') {
//     res.write('Pssst, you are going deeper into my website, be careful...');
//   } else if (page != '/' || page != '/second' || page != '/third/deeper') {
//
//   }{
//     res.writeHead(404, {'Content-Type': 'text/plain'});
//     res.write("Sorry but this page doesn't exists ...");
//   }
//   res.end();
// });
//
// server.listen(8080);



//---------------THIRD-----------------//
// let http = require('http');
// let url = require('url');
// let querystring = require('querystring');
//
// let server = http.createServer(function(req, res) {
//   let params = querystring.parse(url.parse(req.url).query);
//   res.writeHead(200, {'Content-Type': 'text/plain'});
//   if ('firstname' in params && 'lastname' in params) {
//     res.write('Your name is ' + params['firstname'] + ' ' + params['lastname']);
//   } else {
//     res.write('Hey, what\'s your name ?');
//   }
//   res.end();
// });
//
// server.listen(8080);


//-----------------FINAL VERSION-------------------//
let http = require('http');
let url = require('url');
let querystring = require('querystring');

let server = http.createServer(function(req, res) {
  let page = url.parse(req.url).pathname;
  let params = querystring.parse(url.parse(req.url).query);
  res.writeHead(200, {'Content-Type': 'text/plain'});
  if ('firstname' in params && 'lastname' in params) {
    if (page == '/') {
      res.write('Welcome ' + params['firstname'] + ' ' + params['lastname'] + ' !\nYou are on the Welcome page.');
    } else if (page == '/second') {
      res.write('Oh ' + params['firstname'] + ', you got to the second page. Congrats !');
    } else if (page == '/third/deeper') {
      res.write('Be careful ' + params['firstname'] + ', you are going deeper into my website...');
    } else if (page != '/' || page != '/second' || page != '/third/deeper') {
      res.write('Euh hey ' + params['firstname'] + ', I think you got the wrong URL...');
    }
  } else {
    res.write('Hey, what\'s your name ?');
  }
  res.end();
});

server.listen(8080);

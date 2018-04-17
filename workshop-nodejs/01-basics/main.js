const http = require('http');

let server = http.createServer(function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    console.log('page');
    console.log(req.url);
    if (req.url == '/cadeau') {
        let message = 'This is a message in cadeau';    
    }
    let message = 'This is a message';    
    

    
    res.write(`<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Document</title>
    </head>
    <body>
        <h1>My title h1</h1>
        <p>${message}</p>
    </body>
    </html>`);
    res.write('Hello people<br>');
    res.write('How\'s it going ?<br>' );
    res.write('hi !\n');
    res.end();
})

server.listen(8080);

// chrome://inspect/#devices ->check inspector
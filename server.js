'use strict';
const http = require('http');
const port = process.env.PORT || 1337;
const fs = require('fs')

http.createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/html' });

    if(req.url == '/'){
        let html = fs.readFileSync('./frontend/index.html');
        res.write(html); 
    }else if(req.url == '/create'){
        let html = fs.readFileSync('./frontend/create.html');
        res.write(html); 
    }else if(req.url == '/search'){
        let html = fs.readFileSync('./frontend/search.html');
        res.write(html); 
    }
}).listen(port);
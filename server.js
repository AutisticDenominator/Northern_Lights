'use strict';
const http = require('http');
const port = process.env.PORT || 1337;
const fs = require('fs')
const utils = require('./utils')

http.createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    let aux_url = req.url[0] + req.url[1] + req.url[2] + req.url[3] + req.url[4] + req.url[5];

    if(req.url == '/'){
        let html = fs.readFileSync('./frontend/index.html');
        res.write(html); 
    }else if(req.url == '/create'){
        let html = fs.readFileSync('./frontend/create.html');
        res.write(html); 
    }else if(req.url == '/search'){
        let html = fs.readFileSync('./frontend/search.html');
        res.write(html); 
    }else if(aux_url == '/query'){
        let html = fs.readFileSync('./frontend/index.html');
        res.write(html);
        
        let state = 0;
        let values = new Object({'filter-check' : 'off'});
        let temp = '';
        let temp_name = '';

        for(let i = 7; i < length(req.url); i++){
            if(req.url == '&' || req.url == '='){
                state = state + 1;

                if((state % 2) == 0){
                    temp_name = temp;
                }else{
                    values[temp_name] = temp;
                }

                temp = '';
            }else{
                temp = temp + req.url[i];
            }
        }

        utils.Search(values['keyword'], values['filtercheck'], values['filter']);
    }

    res.end();
}).listen(port);
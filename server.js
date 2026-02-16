'use strict';
const http = require('http');
const port = process.env.PORT || 1337;
const fs = require('fs');
const qs = require('querystring');
const utils = require('./utils');

http.createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    let aux_url = req.url[0] + req.url[1] + req.url[2] + req.url[3] + req.url[4] + req.url[5];
    let ter_url = req.url[0] + req.url[1] + req.url[2] + req.url[3] + req.url[4];

    if(req.url == '/'){
        let html = fs.readFileSync('./frontend/index.html');
        res.write(html); 
    }else if(req.url == '/create'){
        let html = fs.readFileSync('./frontend/create.html');
        res.write(html); 
    }else if(req.url == '/search'){
        let html = fs.readFileSync('./frontend/search.html');
        res.write(html); 
    }else if(req.url == '/creation'){
        let RequestBody = '';
        let valid = true;
        req.on('data', function(data){
            RequestBody = RequestBody + data;

            if(RequestBody.length > 1e7){
                valid = false;
                req.url = '/tldr';
            }
        });

        if (valid){
            req.end('end', function(){
                let form_data = qs.parse(RequestBody);
                utils.Create_Save(form_data.title, form_data.content, form_data.filter_check, form_data.filter);

                let html = fs.readFileSync('./frontend/index.html');
                res.write(html);    
            });
        }
    }else if(aux_url == '/query'){
        let html = '';
        let state = 0;
        let values = new Object({'filter-check' : 'off'});
        let temp = '';
        let temp_name = '';
        let query_filepaths = new Array();

        for(let i = 7; i < req.url.length; i++){
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

        query_filepaths = utils.Search(values['keyword'], values['filtercheck'], values['filter']);
        html = utils.Query_Output(query_filepaths);
        res.write(html);

    }else if(ter_url == '/view'){
        let path = '';

        for(let i = 6; i < req.url.length; i++){
            path = path + req.url[i];
        }

        let html = utils.View(path);
        res.write(html);
    }

    res.end();
}).listen(port);
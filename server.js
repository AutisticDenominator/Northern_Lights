'use strict';
const http = require('http');
const port = process.env.PORT || 1337;
const fs = require('fs');
const qs = require('querystring');
const url = require('url');
const utils = require('./utils');

http.createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    let view_url = req.url[0] + req.url[1] + req.url[2] + req.url[3] + req.url[4];

    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;
    const query = parsedUrl.query;

    if(pathname == '/'){
        let html = fs.readFileSync('./frontend/index.html');
        res.write(html); 
    }else if(pathname == '/create'){
        let html = fs.readFileSync('./frontend/create.html');
        res.write(html); 
    }else if(pathname == '/search'){
        let html = fs.readFileSync('./frontend/search.html');
        res.write(html); 
    }else if(pathname == '/creation'){
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
    }else if(pathname == '/query'){
        let html = '';
        let state = 0;
        let values = new Object();
        let temp = '';
        let temp_name = '';
        let query_filepaths = new Array();

        values['filter-check'] = query['filter-check'];
        values['keyword'] = query['keyword'];
        values['filter'] = query['filter'];

        try{
            console.log(values['filter-check'].length);
        }catch{
            values['filter-check'] = 'off';
        }

        query_filepaths = utils.Search(values['keyword'], values['filter-check'], values['filter']);
        html = utils.Query_Output(query_filepaths);
        res.write(html);

    }else if(view_url == '/view'){
        let path = '';

        for(let i = 6; i < req.url.length; i++){
            path = path + req.url[i];
        }

        let html = utils.View(path);
        res.write(html);
    }

    res.end();
}).listen(port);
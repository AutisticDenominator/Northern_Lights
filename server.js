'use strict';
const http = require('http');
const port = process.env.PORT || 8080;
const fs = require('fs')

class Tools{
    constructor(){
    }

    Search(prompt, filtercheck, filter){
        //finish later example: actually output the list then render and such
        if(filtercheck == 'off'){
            let index = 0;
            let valid = true;
            let files_list = new Object();;
            let list_length = 0;
            
            while(valid == true){
                try{
                    let temp_content = '';

                    fs.readFile(String(index) + '.txt', 'utf-8', (err, data) => {
                        if(err){
                            valid = false;
                        }  
                        else{
                            temp_content = data;
                        }
                    })

                    //code for filtering out files based on prompt
                    
                    for(let i = 0; i < length(temp_content); i++){
                        let temp_search = '';

                        for(let j = i; j < (length(prompt) + i); j++){
                            if(j >= length(temp_content)){
                                break;
                            }
                            else{
                                temp_search = temp_search + temp_content[j];
                            }
                        }

                        if(prompt == temp_search){
                            files_list[list_length] = String(index) + '.txt';
                            list_length = list_length + 1;
                        }
                    }

                    index = index + 1;
                }
                catch(err){
                    valid = false;
                }
            }

            return files_list;
        }
        else{
            let index = 0;
            let valid = true;
            let file = '';

            while(valid == true){
                try{
                    let temp_content = '';

                    fs.readFile(filter + '-' + String(index) + '.txt', 'utf-8', (err, data) => {
                        if(err){
                            valid = false;
                        }  
                        else{
                            temp_content = data;
                        }
                    })

                    for (let i = 0; i < length(temp_content); i++) {
                        let temp_search = '';

                        for (let j = i; j < (length(prompt) + i); j++) {
                            if (j >= length(temp_content)) {
                                break;
                            }
                            else {
                                temp_search = temp_search + temp_content[j];
                            }
                        }

                        if (prompt == temp_search) {
                            files_list[list_length] = filter + String(index) + '.txt';
                            list_length = list_length + 1;
                        }
                    }

                    index = index + 1;
                }
                catch(err){
                    valid = false;
                }
            }
            return files_list;
        }
    }
}

const Toolbox = new Tools();

http.createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    let html = fs.readFileSync('./frontend/index.html');
    res.write(html); 

    let path = req.url[0] + req.url[1] + req.url[2] + req.url[3] + req.url[4] + req.url[5] + req.url[6];

    if(path == '/search'){
        //parse the GET request
        //todo: implement checking for charcters that are not nums, chars in all(because of a plausible exploit)
        let attributes_values = [''];
        let values;
        let temp_index = 0;
        let temp_string = '';

        for(let i = 8; i < length(req.url); i++){
            if(req.url[i] == '&'){
                attributes_values[temp_index] = temp_string;
                temp_index = temp_index + 1;
                temp_string = '';
            }
            else{
                temp_string = temp_string + req.url[i];
            }
        }

        temp_string = '';

        for(let i = 0; i < length(attributes_values); i++){
            let condition = false;

            for(let j = 0; j < length(attributes_values[i]); j++){
                if(condition == true){
                    temp_string = temp_string + attributes_values[i][j];
                }
                else{
                    if(attributes_values[i][j] == '='){
                        condition = true;
                    }
                }
            }

            values[i] = temp_string;            
        }

        let search_list = new Object();

        //btw radio has values on or off
        if(length(values) != 4){
            search_list = Toolbox.Search(values[0], 'off', values[1]);
        }
        else{
            search_list = Toolbox.Search(values[0], values[1], values[2]);
        }
    }
}).listen(port);

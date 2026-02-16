const fsys = require('fs');

function Search(keyword, filter_check, filter){
    let results = new Array();
    let results_len = 0;

    if(filter_check == 'on'){
        let file_content;
        let index = 0;
        let next = true;

        while(next){
            fsys.readFileSync('./articles/' + String(filter) + String(index) + '.txt', 'utf-8', (err, data) =>{
                if(err){
                    next = false;
                }else{
                    file_content = data;
                }
            });

            for(let i = 0; i < (file_content.length - keyword.length); i++){
                let search_temp = '';

                for(let c = i; c < (c + length(keyword)); c++){
                    search_temp = search_temp + file_content[c];
                }

                if(search_temp.toLowerCase() == keyword.toLowerCase()){
                    results[results_len] = './articles/' + String(index) + '.txt';
                    results_len = results_len + 1;
                    break;
                }
            }

            index = index + 1;
        }
    }else{
        let file_content;
        let index = 0;
        let next = true;

        while(next){
            fsys.readFileSync('./articles/' + String(index) + '.txt', 'utf-8', (err, data) =>{
                if(err){
                    next = false;
                }else{
                    file_content = data;
                }
            });

            for(let i = 0; i < (file_content.length - keyword.length); i++){
                let search_temp = '';

                for(let c = i; c < (c + length(keyword)); c++){
                    search_temp = search_temp + file_content[c];
                }

                if(search_temp.toLowerCase() == keyword.toLowerCase()){
                    results[results_len] = './articles/' + String(index) + '.txt';
                    results_len = results_len + 1;
                    break;
                }
            }

            index = index + 1;
        }
    }
    return results;
}

function Query_Output(...args){
    let html = '';

    fsys.readFileSync('./frontend/query-begin.hmtl', 'utf-8', (err, data) => {
        if(err){
            return 'Error'
        }else{
            html = data;
        }
    });

    for(let i = 0; i < args.length; i++){
        html = html + '\n' + '<a href="/view/' + String(args[i]) + '" class="w3-container">' + String(args[i]) + '</a>'
    }

    fsys.readFileSync('./frontend/query-end.hmtl', 'utf-8', (err, data) => {
        if(err){
            return 'Error'
        }else{
            html = data;
        }
    });

    return html;
}

function Clean_Text(text){
    let counter = 0;
    let title = '';
    let body = '';

    for(let i = 0; i < text.length; i++){
        if(counter == 2 && text[i] != '=' && text[i] != '['){
            title = title + text[i];
        }else if(counter == 4 && text[i] != '=' && text[i] != '['){
            body = body + text[i];
        }

        if(text[i] == '[' || text[i] == ']'){
            counter = counter + 1;
        }
    }

    let output = new Array();
    output[0] = title;
    output[1] = body;

    return output;
}

function View(path){
    let raw_text = '';
    let html = '';

    fsys.readFileSync('./articles/' + String(path), 'utf-8', (err, data) => {
        if(err){
            return 'Error'
        }else{
            raw_text = data;
        }
    });

    let clean_text = Clean_Text(text);

    fsys.readFileSync('./frontend/view-begin.hmtl', 'utf-8', (err, data) => {
        if(err){
            return 'Error'
        }else{
            html = data;
        }
    });

    html = html + '<h1 class="w3-container">' + clean_text[0] + '</h1>\n';
    html = html + '<p class="w3-container">' + clean_text[1] + '</p>\n';

    fsys.readFileSync('./frontend/view-end.hmtl', 'utf-8', (err, data) => {
        if(err){
            return 'Error'
        }else{
            html = data;
        }
    });

    return html;
}

function Create_Save(title, content, filter_check, filter){
    if (filter_check == 'on'){
        let index = 0;
        let created = true;

        while(created){
            fsys.readFile('./articles/' + String(filter) + '-' + String(index), 'utf-8', (err, data) => {
                if(err){
                    created = false;
                }else{
                    index = index + 1;
                }
            })
        }

        let text = '[name]=' + String(title) + '\n[content]=' + String(content);
        fsys.writeFile('./articles/' + index, text, 'utf-8');
        
    }else{
        let index = 0;
        let created = true;

        while(created){
            fsys.readFile('./articles/' + String(index), 'utf-8', (err, data) => {
                if(err){
                    created = false;
                }else{
                    index = index + 1;
                }
            })
        }

        let text = '[name]=' + String(title) + '\n[content]=' + String(content);
        fsys.writeFile('./articles/' + String(index), text, 'utf-8');
    }
}

module.exports = {Search, Create_Save ,Query_Output, View};

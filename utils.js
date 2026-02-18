const fsys = require('fs');

class Utilities{
    order = {
        '' : 0,
        'CJL' : 1,
        'FYZ' : 2,
        'HRW' : 3,
        'MAT' : 4,
        'POS' : 5,
        'PRG' : 6,
    }
}

const Utility = new Utilities();

function Limit(filter){
    let order = Utility.order[filter];
    let content = fsys.readFileSync('./limits.txt', 'utf-8');
    let state = -1;
    let num = '';

    for(let i = 0; i < content.length; i++){
        if(content[i] == 'm'){
            state = state + 1;
            continue;
        }

        if(state == order && content[i] != 'm'){
            num = num + content[i];
        }   
    }

    num = Number(num);

    return num;
};

function Search(keyword, filter_check, filter){
    let results = new Array();
    let results_len = 0;

    if(filter_check == 'on'){
        let file_content = '';
        let search_temp = '';

        let limit = Limit(filter);

        for(let g = 0; g < limit; g++){
            file_content = fsys.readFileSync('./articles/' + String(filter) + '-' +  String(g) + '.txt', 'utf-8')

            for(let i = 0; i < (file_content.length - keyword.length); i++){
                search_temp = '';

                for(let c = i; c < (i + keyword.length); c++){
                    search_temp = search_temp + file_content[c];
                }

                if(search_temp.toLowerCase() == keyword.toLowerCase()){
                    results[results_len] = './articles/' + String(filter) + '-' +  String(g) + '.txt';
                    results_len = results_len + 1;
                    break;
                }
            }      
        }
    }else{
        let file_content = '';
        let search_temp = '';

        let limit = Limit('');

        for(let g = 0; g < limit; g++){
            file_content = fsys.readFileSync('./articles/' + String(g) + '.txt', 'utf-8')
            //the above functions

            for(let i = 0; i < (file_content.length - keyword.length); i++){
                search_temp = '';

                for(let c = i; c < (i + keyword.length); c++){
                    search_temp = search_temp + file_content[c];
                }

                if(search_temp.toLowerCase() == keyword.toLowerCase()){
                    results[results_len] = './articles/' + String(g) + '.txt';
                    results_len = results_len + 1;
                    break;
                }
            }
        }
        
    }

    //passing an empty list -- todo I guess
    return results;
}

function Query_Output(...args){
    let html = fsys.readFileSync('./frontend/query-begin.html', 'utf-8');
        

    for(let i = 0; i < args.length; i++){
        html = html + '\n' + '<a href="/view/' + String(args[i]) + '" class="w3-container">' + String(args[i]) + '</a>';
    }

    html = html + fsys.readFileSync('./frontend/query-end.html', 'utf-8');

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
    let raw_text = fsys.readFileSync(String(path), 'utf-8');
    let html = '';

    let clean_text = Clean_Text(raw_text);

    html = html + fsys.readFileSync('./frontend/view-begin.html', 'utf-8');

    html = html + '<h1 class="w3-container">' + clean_text[0] + '</h1>\n';
    html = html + '<p class="w3-container">' + clean_text[1] + '</p>\n';

    html = html + fsys.readFileSync('./frontend/view-end.html', 'utf-8');

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

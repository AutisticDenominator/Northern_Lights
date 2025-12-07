const fsys = require('fs');

function Search(keyword, filter_check, filter){
    let results = new Object();
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

            for(let i = 0; i < (length(file_content) - length(keyword)); i++){
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

            for(let i = 0; i < (length(file_content) - length(keyword)); i++){
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
        }
    }
    return results;
}

function Create(title, content, filter_check, filter){
    return;
}

module.exports = {Search, Create};

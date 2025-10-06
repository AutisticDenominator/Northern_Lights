class Routing{
    constructor(){
        this.page = 'Home';
    }

    Nav_Change(){
        let nav01 = document.getElementById('nav-01');
        let nav02 = document.getElementById('nav-02');
        let nav03 = document.getElementById('nav-03');
        nav01.className = 'w3-button';
        nav02.className = 'w3-button';
        nav03.className = 'w3-button';
        

        if(this.page == 'Home'){
            nav01.className = 'w3-button w3-teal';
        }else if( this.page == 'Search' ){
            nav02.className = 'w3-button w3-teal';
        }else{
            nav03.className = 'w3-button w3-teal';
        }
    }

    Route_01(){
        this.page = 'Home';
        this.Nav_Change();

        let main_page = document.getElementById('mainsite');
        main_page.innerHTML = '<section id="Home-article-01">'+
                            '<div id="header-01-01" class="w3-container">Home</div>' +
                            '<div id="text-01-01" class="w3-container" align="justify">Welcome to Northern Lights! A site for our school, on which you may share notes, sources and other things in a wikipidea like format. This project was developed solely by me. Thank you for visiting.</div>' +     
                            '</section>'+
                            '<section id="SC-buttons">'+
                            '<div id="Home-Search-button" class="w3-button w3-border-white w3-hover-white w3-bottombar w3-hover-border-teal w3-hover-text-teal" onclick="Router.Route_02()">Search</div>' +
                            '<div id="Home-Create-button" class="w3-button w3-border-white w3-hover-white w3-bottombar w3-hover-border-teal w3-hover-text-teal" onclick="Router.Route_03()">Create</div>' +
                            '</section>' +
                            '<section id="Home-article-02">'+
                            '<div id="header-01-02" class="w3-container">Community note</div>' +                
                            '<div id="text-01-02" class="w3-container">No community note as of now.</div>' +
                            '</section>' +
                            '<section id="Home-article-03">' +
                            '<div id="header-01-03" class="w3-container">Disclaimer</div>' +
                            '<div id="text-01-03" class="w3-container">This is not a credible source. Do not cite from this. Anything here can be incorrect.</div>' +
                            '</section>';
    }

    Route_02(){
        this.page = 'Search';
        this.Nav_Change();
        //option: AddEventListener('submit', function)
        let main_page = document.getElementById('mainsite');
        main_page.innerHTML = '<div id="header-01-01">Search</div>' + 
                            '<form class="w3-container" action="search" method="GET">' +
                            '<section id="prompt">' + 
                            '<input class="w3-container w3-border w3-input" type="text" name="prompt" placeholder="one word or it wont find anything">' +
                            '</section>' +
                            '<section id="filtercheck">' +
                            '<input class="w3-radio w3-container" type="radio" name="filtercheck">' +
                            '<label class="w3-container" for="radiocheck">Filter?</label>' +
                            '</section>' +
                            '<section id="filter">' +
                            '<select class="w3-container w3-select" name="filter">'+
                            '<option value="CJL">Cesky Jazyk</option>'+
                            '<option value="MAT">Matematika</option>'+
                            '<option value="PRG">Programovani</option>'+
                            '<option value="FYZ">Fyzika</option>'+
                            '</select>' +
                            '<label class="w3-container" for="filter">Filter</label>'+
                            '</section>' +
                            '<section id="submit-btn">' +
                            '<input class="w3-container w3-btn w3-teal" type="submit" id="submit-btn" name="submit-btn">' +
                            '</section>' +
                            '</form>';
    }

    Route_03(){
        this.page = 'Create';
        this.Nav_Change();
        //add character amount limit and a limit to what they can input to search and edit as well
        let main_page = document.getElementById('mainsite');
        main_page.innerHTML = '<div id="header-01-01">Create</div>' + 
                            '<form action="create" method="GET">' + 
                            '<section id="name">' +
                            '<input class="w3-container w3-input w3-border" type="text" name="name" placeholder="name of thecreaed article">' +
                            '</section>' +
                            '<section id="Subject">' +
                            '<select class="w3-container w3-select" name="Subject">'+
                            '<option value="CJL">Cesky Jazyk</option>'+
                            '<option value="MAT">Matematika</option>'+
                            '<option value="PRG">Programovani</option>'+
                            '<option value="FYZ">Fyzika</option>'+
                            '</select>' +
                            '<label class="w3-container" for="Subject">Subject</label>' +
                            '</section>' +
                            '<section id="content">' +
                            '<input class="w3-container w3-input w3-border" type="text" name="content" placeholder="content of said article">' +
                            '</section>' +
                            '<section id="submit-btn-create">' +
                            '<input class="w3-container w3-btn w3-teal" type="submit" name="submit-btn">' +
                            '</section>' +
                            '</form>';
    }
}

let Router = new Routing();
class MovieModal{
    constructor(page){
        this.page=page;
    }

    get movieName(){
        return this.page.getByRole('textbox',{name:'* Movie Name'})
    }

    get description(){
        return this.page.getByRole('textbox',{name:'* Description'})
    }
    
    get movieDuration(){
        return this.page.getByRole('spinbutton',{name:'* Movie Duration (in min)'})
    }
    
    get selectMovieLanguage(){
        return this.page.getByRole('combobox',{name:'* Select Movie Language'});
    }
    
    get releaseDate(){
        return this.page.getByRole('textbox',{name:'* Release Date'})
    }
    
    get selectMovieGenre(){
        return this.page.getByRole('combobox',{name:'* Select Movie Genre'})
    }
    
    get posterURL(){
        return this.page.getByRole('textbox',{name:'* Poster URL'})
    }    

    get submitButton(){
        return this.page.getByRole('button',{name:'Submit the Data'});
    }

    get cancelButton(){
        return this.page.getByRole('button',{name:'Cancel'});
    }

    get closeButton(){
        return this.page.getByRole('button',{name:'Close'});
    }
}

export default MovieModal;
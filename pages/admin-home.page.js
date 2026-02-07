import DeleteMovieDialog from "./delete-movie-dialog.page";
import MovieModal from "./movie-modal.page";

class AdminHomePage{
    constructor(page){
        this.page=page;
    }

    get heading(){
        return this.page.getByRole('heading',{name:'Admin Page'});
    }

    get moviesTab(){
        return this.page.getByRole('tab',{name:'Movies'});
    }

    get theatresTab(){
        return this.page.getByRole('tab',{name:'Theatres'});
    }

    get addMovieButton(){
        return this.page.getByRole('button',{name:"Add Movie"});
    }

    get movieTable(){
        return this.page.getByRole('table');
    }

    get editMovieButton(){
        return this.page.getByRole('button', { name: 'edit' }).first();
    }

    get deleteMovieButton(){
        return this.page.getByRole('button',{ name: 'delete' }).first();
    }

    async openEditMovieModal(){
        await this.editMovieButton.click();

        return new MovieModal(this.page);
    }

    async openDeleteMovieDialog(){
        await this.deleteMovieButton.click();

        return new DeleteMovieDialog(this.page);
    }

    async openTheatresTab(){
        await this.theatresTab.click();
    }

    get theatresTable(){
        return this.page.getByRole('table');
    }
}

export default AdminHomePage;
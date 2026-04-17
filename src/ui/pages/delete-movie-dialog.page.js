class DeleteMovieDialog{
    constructor(page){
        this.page=page;
    }

    get deleteMsg(){
        return this.page.getByText('Are you sure you want to');
    }

    get deleteYesButton(){
        return this.page.getByRole('button',{name:'Yes'});
    }

    get deleteNoButton(){
        return this.page.getByRole('button',{name:'No'});
    }

    get closeButton(){
        return this.page.getByRole('button',{name:'Close'})
    }
}

export default DeleteMovieDialog;
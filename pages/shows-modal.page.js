class ShowsModal{
    constructor(page){
        this.page=page;
    }

    get heading(){
        return this.page.getByRole('heading',{name:'List of Shows'});
    }

    get addShowButton(){
        return this.page.getByRole('button',{name:'Add Show'});
    }

    get showsTable(){
        return this.page.getByRole('dialog').getByRole('table');
    }
}

export default ShowsModal;
import DeleteTheatreDialog from "./delete-theatre-dialog.page";
import ShowsModal from "./shows-modal.page";
import TheatreModal from "./theatre-modal.page";

class PartnerPage{
    constructor(page){
        this.page=page;
    }

    get heading(){
        return this.page.getByRole('heading',{name:'Partner Page'});
    }

    get theatresTab(){
        return this.page.getByRole('tab',{name:'Theatres'});
    }

    get addTheatre(){
        return this.page.getByRole('button',{name:'Add Theatre'});
    }

    get prevArrowButton(){
        return this.page.getByRole('button',{name:'left'});
    }

    get nextArrowButton(){
        return this.page.getByRole('button',{name:'right'});
    }

    get theatreTable(){
        return this.page.locator('.ant-spin-container');//ant-table-content
    }

    get editTheate(){
        return this.page.getByRole('button', { name: 'edit' }).first();
    }

    get deleteTheatre(){
        return this.page.getByRole('button',{ name: 'delete' }).first();
    }

    get showsTheatre(){
        return this.page.getByRole('button',{ name: '+ Shows' }).first();
    }

    async openAddTheatreModal(){
        await this.addTheatre.click();

        return new TheatreModal(this.page);
    }

    async openEditTheatreModal(){
        await this.editTheate.click();

        return new TheatreModal(this.page);
    }

    async openDeleteTheatreDialog(){
        await this.deleteTheatre.click();

        return new DeleteTheatreDialog(this.page);
    }

    async openShowsDialog(){
        await this.showsTheatre.click();

        return new ShowsModal(this.page);
    }

    async clickShowsByTheatre(theatreName){
        const row = this.page.locator('tr.ant-table-row',{
            has: this.page.locator('td:first-child',{hasText:theatreName})
        });

        await row.getByRole('button',{name:'+ Shows'}).click();

        return new ShowsModal(this.page);
    }
    
}

export default PartnerPage
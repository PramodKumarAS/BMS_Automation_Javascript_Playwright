import AddShowModalPage from "./add-show-modal.page";

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

    get closeShowDialogButton(){
        return this.page.getByRole('button', { name: 'Close' })
    }

    get showsRows() {
        return this.page.locator(
            '.ant-modal-body tbody tr'
        );
    }

    async openAddShowModal(){
        await this.addShowButton.click();

        return new AddShowModalPage(this.page);
    }

    async getShowsRowCount() {
        await this.page.locator('.ant-table-placeholder')
                       .waitFor({state:'detached'});

        return await this.showsRows.count();
    }

    async getRowData(showName){
        return this.page.locator('.ant-modal-body table tbody tr').filter({hasText:showName,exact:true});
    }
}

export default ShowsModal;
class MovieDetailsPage{
    constructor(page){
        this.page=page;
    }

    get bookShowButton(){
        return this.page.getByRole('button',{name:'Book Show'});
    }

    async chooseTheDate() {
        const today = new Date().toISOString().split('T')[0];
        await this.page.getByPlaceholder('default size').fill(today);
    }
}

export default MovieDetailsPage
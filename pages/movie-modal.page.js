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
    
    async selectMovieLanuage(language) {
        // Open dropdown
        await this.page.getByRole('combobox', { name: '* Select Movie Language' }).click();

        const dropdown = this.page.locator('.rc-virtual-list-holder');
        const option = this.page.locator('.ant-select-item-option', { hasText: language });

        // Scroll until visible
        while (!(await option.isVisible())) {
            await dropdown.evaluate(el => {
                el.scrollTop += 200;   // adjust scroll step if needed
            });
            await this.page.waitForTimeout(200); // small wait for virtual render
        }

        await option.click();
    }
    
    get releaseDate(){
        return this.page.getByRole('textbox',{name:'* Release Date'})
    }
    
    async selectMovieGenre(genre) {
        // Open dropdown
        await this.page.getByRole('combobox', { name: '* Select Movie Genre' }).click();

        const dropdown = this.page.locator('.rc-virtual-list-holder');
        const option = this.page.locator('.ant-select-item-option', { hasText: genre });

        // Scroll until visible
        while (!(await option.isVisible())) {
            await dropdown.evaluate(el => {
                el.scrollTop += 200;   // adjust scroll step if needed
            });
            await this.page.waitForTimeout(200); // small wait for virtual render
        }

        await option.click();
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
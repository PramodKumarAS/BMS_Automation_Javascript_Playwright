class AddShowModalPage{
    constructor(page){
        this.page=page;
    }

    get showName(){
        return this.page.getByRole('textbox', { name: '* Show Name' });
    }

    get showDate(){
        return this.page.getByRole('textbox', { name: '* Show Date' });
    }

    get showTime(){
        return this.page.getByRole('textbox', { name: '* Show Timing' });
    }

    async selectMovie(movieName) {
        // Open dropdown
        await this.page.getByRole('combobox', { name: '* Select the Movie' }).click();

        const dropdown = this.page.locator('.rc-virtual-list-holder');
        const option = this.page.locator('.ant-select-item-option', { hasText: movieName });

        // Scroll until visible
        while (!(await option.isVisible())) {
            await dropdown.evaluate(el => {
                el.scrollTop += 200;   // adjust scroll step if needed
            });
            await this.page.waitForTimeout(200); // small wait for virtual render
        }

        await option.click();
    }

    get ticketPrice(){
        return this.page.getByRole('spinbutton', { name: '* Ticket Price' });
    }

    get totalSeats(){
        return this.page.getByRole('spinbutton', { name: '* Total Seats' });
    }

    get saveShow(){
        return this.page.getByRole('button', { name: 'Add the Show' });
    }
}

export default AddShowModalPage
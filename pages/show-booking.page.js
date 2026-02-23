class ShowBookingPage{
    constructor(page){
        this.page=page;
    }

    get payNowButton(){
        return this.page.getByRole('button', { name: 'Pay Now', exact: true });
    }

    get showName(){
        return this.page.getByRole('heading',{name:'Show Name'});
    }
    get showDateTime(){
        return this.page.getByRole('heading',{name:'Date & Time'});
    }
    get showTicketPrice(){
        return this.page.getByRole('heading',{name:'Ticket Price'});
    }
    get showTotalSeats(){
        return this.page.getByRole('heading',{name:'Total Seats'});
    }
    get showAvailableSeats(){
        return this.page.getByRole('heading',{name:'Available Seats'});
    }

    async selectSeatNumber(number){
        await this.page.getByRole('button', { name: number, exact: true }).click();
    }

    selectedSeat(seatNumber){
       return this.page.getByRole('button', { name: seatNumber, exact: true });
    }
}

export default ShowBookingPage;
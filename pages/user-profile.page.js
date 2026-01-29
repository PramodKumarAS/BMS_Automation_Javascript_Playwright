class UserProfilePage{
    constructor(page){
        this.page=page;
    }

    get userProfileImage(){
        return this.page.locator('img');
    }

    get userName(){
        return this.page.getByRole('main').getByText('User').first();
    }

    get userMail(){
        return this.page.getByText('@gmail.com');
    }

    get myBookings(){
          return this.page.locator('div').filter({ hasText: /^My Bookings$/ }).first();
    }

    get settings(){
        return this.page.locator('div').filter({ hasText: /^Settings$$/ }).first();
    }
}

export default UserProfilePage;
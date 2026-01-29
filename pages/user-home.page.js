import UserProfilePage from "./user-profile.page";

class HomePage{
    constructor(page){
        this.page=page;
    }
   
    get searchBox(){
        return this.page.getByRole('textbox', { name: 'Type here to search for movies' });
    }

    async openUserMenu(){
        await this.page.getByRole('menuitem', { name: 'user' }).click();
    }

    get profileLink(){
        return this.page.getByRole('menuitem', { name: 'profile My Profile' });
    }

    get logoutLink(){
        return this.page.getByRole('link', { name: 'Log Out' });
    }
    get banner(){
        return this.page.getByRole('banner');
    }
    
    get bannerHeader(){
        return this.page.getByRole('heading', { name: '🎬 Book Our Show' });
    }

    async goToProfile(){
        await this.openUserMenu();
        await this.profileLink.click();
        return new UserProfilePage(this.page);
    }
}

export default HomePage;
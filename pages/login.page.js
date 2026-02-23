class LoginPage{
    constructor(page){
        this.page=page;
        this.email=page.getByRole('textbox', { name: '* Email' });
        this.password=page.getByRole('textbox', { name: '* Password' });
        this.loginButton = this.page.getByRole('button', { name: 'Login' });
    }

    get heading(){
        return this.page.getByRole('heading',{name:'🎬 BookMyShow'});
    }

    get registerLink(){
        return this.page.getByRole('link',{name:'Register'});
    }

    get forgotPasswordButton(){
        return this.page.getByRole('link',{name:'Forgot Password?'});
    }    

    get leftCarouselImage(){
        return this.page.getByRole('img',{name:'carousel-left'});
    }

    get rightCarouselImage(){
        return this.page.getByRole('img',{name:'carousel-right'});
    }

    get errorMessageForInvalidCred(){
        return this.page.getByText('Invalid email or password!');
    }

    get emailFieldErrorMessage(){
        return this.page.getByText('Please enter your email!');
    }

    get passwordFieldErrorMessage(){
        return this.page.getByText('Please enter your password!');
    }

    async open(){
        await this.page.goto('/login');
    }

    async login(email,password){
        await this.open();
        await this.email.fill(email);
        await this.password.fill(password);
        await this.loginButton.click();
    }

}

export default LoginPage
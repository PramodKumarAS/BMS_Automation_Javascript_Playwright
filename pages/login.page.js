class LoginPage{
    constructor(page){
        this.page=page;
        this.email=page.getByRole('textbox', { name: '* Email' });
        this.password=page.getByRole('textbox', { name: '* Password' });
        this.loginButton = this.page.getByRole('button', { name: 'Login' });
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
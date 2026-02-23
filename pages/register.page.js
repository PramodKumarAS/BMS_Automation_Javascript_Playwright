class RegisterPage{
    constructor(page){
        this.page=page;
    }

    get heading(){
        return this.page.getByRole('heading',{name:'Register to BookMyShow'});
    }

    get fullName(){
        return this.page.getByRole('textbox', { name: '* Full Name' });
    }

    get email(){
        return this.page.getByRole('textbox', { name: '* Email' });
    }

    get password(){
        return this.page.getByRole('textbox', { name: '* Password' });
    }

    get registerButton(){
        return this.page.getByRole('button', { name: 'Register' });
    }

    get loginLink(){
        return this.page.getByRole('link', { name: 'Login now' });
    }

    get registerAsAdminRadioButton(){
        return this.page.getByText('Register as an Admin?');
    }
 
    get registerAsPartnerRadioButton(){
        return this.page.getByText('Register as a Partner?');
    }

    get fullNameErrorMessage(){
        return this.page.getByText('Name is required');
    }

    get emailErrorMessage(){
        return this.page.getByText('Email is required');
    }

    get passwordErrorMessage(){
        return this.page.getByText('Password is required');
    }

    async open(){
        await this.page.goto('/register');
    }
}

export default RegisterPage;
class StripeCheckoutFramePage{
    constructor(page){
        this.page=page;
    }

    get email(){
        return this.page.locator('iframe[name="stripe_checkout_app"]').contentFrame().getByRole('textbox', { name: 'Email' });
    }

    get cardnumber(){
        return this.page.locator('iframe[name="stripe_checkout_app"]').contentFrame().getByRole('textbox', { name: 'Card number' });
    }

    get cardExpireDate(){
        return this.page.locator('iframe[name="stripe_checkout_app"]').contentFrame().getByRole('textbox', { name: 'MM / YY' });
    }

    get cvc(){
        return this.page.locator('iframe[name="stripe_checkout_app"]').contentFrame().getByRole('textbox', { name: 'CVC' });
    }    

    get payButton(){
        return this.page.locator('iframe[name="stripe_checkout_app"]').contentFrame().getByRole('button', { name: 'Pay $' });
    }    
}

export default StripeCheckoutFramePage;
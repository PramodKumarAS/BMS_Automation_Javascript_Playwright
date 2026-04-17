class TheatreModal{
    constructor(page){
        this.page=page;
    }
   
    get theatreName(){
        return this.page.getByRole('textbox',{name:'* Theatre Name'});
    }
    get theatreAddress(){
        return this.page.getByRole('textbox',{name:'* Theatre Address'});
    }
    get email(){
        return this.page.getByRole('textbox',{name:'* Email'});
    }
    get phoneNumber(){
        return this.page.getByRole('spinbutton',{name:'* Phone Number'});
    }
    get submitButton(){
        return this.page.getByRole('button',{name:'Submit the Data'});
    }
    get cancelButton(){
        return this.page.getByRole('button',{name:'Cancel'});
    }
}

export default TheatreModal;
import {test as base} from "@playwright/test";
import LoginPage from "../ui/pages/login.page";
import RegisterPage from "../ui/pages/register.page";
import ForgetPasswordPage from "../ui/pages/forget-password.page";
import MovieDetailsPage from "../ui/pages/movie-details.page";
import ShowBookingPage from "../ui/pages/show-booking.page";
import StripeCheckoutFramePage from "../ui/pages/stripe-checkout-frame.page";
import HomePage from "../ui/pages/user-home.page";
import PartnerPage from "../ui/pages/partner-home.page";
import AdminHomePage from "../ui/pages/admin-home.page";

export const test=base.extend({

    loginPage:async({page},use)=>{
        const loginPage = new LoginPage(page);
        await loginPage.open();
        await use(loginPage);
    },

    homePage:async({page},use)=>{
        const homePage = new HomePage(page);
        await use(homePage);
    },

    partnerHomePage:async({page},use)=>{
        const partnerPage = new PartnerPage(page);
        await use(partnerPage);
    },

    adminHomePage:async({page},use)=>{
        const adminPage = new AdminHomePage(page);
        await use(adminPage);
    },

    registerPage:async({page},use)=>{
        const registerPage = new RegisterPage(page);
        await registerPage.open();
        await use(registerPage);
    },

    movieDetailsPage:async({page},use)=>{
        const movieDetailsPage = new MovieDetailsPage(page);
        await use(movieDetailsPage);
    },

    bookingDetailsPage:async({page},use)=>{
        await use(new ShowBookingPage(page));
    },

    stripeCheckoutPage:async({page},use)=>{
        await use(new StripeCheckoutFramePage(page));
    },

    forgetPasswordPage:async({page},use)=>{
        const forgetPasswordPage = new ForgetPasswordPage(page);
        await forgetPasswordPage.open();
        await use(forgetPasswordPage);
    },

});

export {expect} from "@playwright/test";
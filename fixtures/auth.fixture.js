import {test as base} from "@playwright/test";
import LoginPage from "../pages/login.page";
import HomePage from "../pages/user-home.page";
import PartnerPage from "../pages/partner-home.page";
import AdminHomePage from "../pages/admin-home.page";
import RegisterPage from "../pages/register.page";
import ForgetPasswordPage from "../pages/forget-password.page";
import MovieDetailsPage from "../pages/movie-details.page";
import ShowBookingPage from "../pages/show-booking.page";
import StripeCheckoutFramePage from "../pages/stripe-checkout-frame.page";

export const test=base.extend({

    loginPage:async({page},use)=>{
        const loginPage = new LoginPage(page);
        await loginPage.open();
        await use(loginPage);
    },

    registerPage:async({page},use)=>{
        const registerPage = new RegisterPage(page);
        await registerPage.open();
        await use(registerPage);
    },

    movieDetailsPage:async({page},use)=>{
        const moveDetailsPage = new MovieDetailsPage(page);
        await use(moveDetailsPage);
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

    loggedInUserPage:async ({page},use)=>{
        const loginPage = new LoginPage(page);
        await loginPage.login(process.env.USER_EMAIL,process.env.PASSWORD);
        await use(new HomePage(page));
    },

    loggedInPartnerPage:async ({page},use)=>{
        const loginPage = new LoginPage(page);
        await loginPage.login(process.env.PARTNER_EMAIL,process.env.PASSWORD);
        await use(new PartnerPage(page));
    },

    loggedInAdminPage:async ({page},use)=>{
       const loginPage = new LoginPage(page);
       await loginPage.login(process.env.ADMIN_EMAIL,process.env.PASSWORD);
       await use(new AdminHomePage(page));
    }


});

export {expect} from "@playwright/test";    
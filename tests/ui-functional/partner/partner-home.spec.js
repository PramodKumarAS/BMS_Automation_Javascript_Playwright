import { test,expect } from "../../../fixtures/auth.fixture";

test('User should see action buttons and tabs on the partner home page',async({loggedInPartnerPage})=>{
    await expect(loggedInPartnerPage.heading).toBeVisible();
    await expect(loggedInPartnerPage.theatresTab).toBeVisible();
    await expect(loggedInPartnerPage.addTheatre).toBeVisible();
    await expect(loggedInPartnerPage.prevArrowButton).toBeVisible();
    await expect(loggedInPartnerPage.nextArrowButton).toBeVisible();
    await expect(loggedInPartnerPage.theatreTable).toBeVisible();
});

test('User should see required fields on Add Theatre modal',async({loggedInPartnerPage})=>{
    const theatreModalPage = await loggedInPartnerPage.openAddTheatreModal();

    await expect(theatreModalPage.theatreName).toBeVisible();
    await expect(theatreModalPage.theatreAddress).toBeVisible();
    await expect(theatreModalPage.email).toBeVisible();
    await expect(theatreModalPage.phoneNumber).toBeVisible();
    await expect(theatreModalPage.submitButton).toBeVisible();
    await expect(theatreModalPage.cancelButton).toBeVisible();
});

test('User should see required fields on the Edit Theatre modal',async({loggedInPartnerPage})=>{
    const editTheatreModalPage=await loggedInPartnerPage.openEditTheatreModal();

    await expect(editTheatreModalPage.theatreName).toBeVisible();
    await expect(editTheatreModalPage.theatreAddress).toBeVisible();
    await expect(editTheatreModalPage.email).toBeVisible();
    await expect(editTheatreModalPage.phoneNumber).toBeVisible();
    await expect(editTheatreModalPage.submitButton).toBeVisible();
    await expect(editTheatreModalPage.cancelButton).toBeVisible();
});

test('User should see required buttons on Delete Theatre dialog',async({loggedInPartnerPage})=>{
    const deleteTheatreDialogPage = await loggedInPartnerPage.openDeleteTheatreDialog();

    await expect(deleteTheatreDialogPage.deleteMsg).toBeVisible();
    await expect(deleteTheatreDialogPage.deleteYesButton).toBeVisible();
    await expect(deleteTheatreDialogPage.deleteNoButton).toBeVisible();
});

test('User should see shows table on Shows tab',async ({loggedInPartnerPage})=>{
    const showsTheatreDialogPage = await loggedInPartnerPage.openShowsDialog();

    await expect(showsTheatreDialogPage.heading).toBeVisible();
    await expect(showsTheatreDialogPage.addShowButton).toBeVisible();
    await expect(showsTheatreDialogPage.showsTable).toBeVisible();
});
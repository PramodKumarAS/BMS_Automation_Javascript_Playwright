import { test,expect } from "../../../../src/fixtures/auth.fixture";

test('User should see action buttons and tabs on the partner home page',{tag:["@smoke"]},async({loginAsPartner})=>{
    await expect(loginAsPartner.heading).toBeVisible({timeout:15000});
    await expect(loginAsPartner.theatresTab).toBeVisible();
    await expect(loginAsPartner.addTheatre).toBeVisible();
    await expect(loginAsPartner.prevArrowButton).toBeVisible();
    await expect(loginAsPartner.nextArrowButton).toBeVisible();
    await expect(loginAsPartner.theatreTable).toBeVisible();
});

test('User should see required fields on Add Theatre modal',async({loginAsPartner})=>{
    const theatreModalPage = await loginAsPartner.openAddTheatreModal();

    await expect(theatreModalPage.theatreName).toBeVisible();
    await expect(theatreModalPage.theatreAddress).toBeVisible();
    await expect(theatreModalPage.email).toBeVisible();
    await expect(theatreModalPage.phoneNumber).toBeVisible();
    await expect(theatreModalPage.submitButton).toBeVisible();
    await expect(theatreModalPage.cancelButton).toBeVisible();
});

test('User should see required fields on the Edit Theatre modal',async({loginAsPartner})=>{
    const editTheatreModalPage=await loginAsPartner.openEditTheatreModal();

    await expect(editTheatreModalPage.theatreName).toBeVisible();
    await expect(editTheatreModalPage.theatreAddress).toBeVisible();
    await expect(editTheatreModalPage.email).toBeVisible();
    await expect(editTheatreModalPage.phoneNumber).toBeVisible();
    await expect(editTheatreModalPage.submitButton).toBeVisible();
    await expect(editTheatreModalPage.cancelButton).toBeVisible();
});

test('User should see required buttons on Delete Theatre dialog',async({loginAsPartner})=>{
    const deleteTheatreDialogPage = await loginAsPartner.openDeleteTheatreDialog();

    await expect(deleteTheatreDialogPage.deleteMsg).toBeVisible();
    await expect(deleteTheatreDialogPage.deleteYesButton).toBeVisible();
    await expect(deleteTheatreDialogPage.deleteNoButton).toBeVisible();
});

test('User should see shows table on Shows tab',async ({loginAsPartner})=>{
    const showsTheatreDialogPage = await loginAsPartner.openShowsDialog();

    await expect(showsTheatreDialogPage.heading).toBeVisible();
    await expect(showsTheatreDialogPage.addShowButton).toBeVisible();
    await expect(showsTheatreDialogPage.showsTable).toBeVisible();
});
import { test,expect } from "../../../../src/fixtures/auth.fixture";

test('User should see tabs and open Theatre tabs on admin home page',{tag:["@smoke"]},async({loginAsAdmin})=>{
    await expect(loginAsAdmin.heading).toBeVisible();
    await expect(loginAsAdmin.moviesTab).toBeVisible();
    await expect(loginAsAdmin.theatresTab).toBeVisible();
    await expect(loginAsAdmin.addMovieButton).toBeVisible();
    await expect(loginAsAdmin.movieTable).toBeVisible();
    await expect(loginAsAdmin.editMovieButton).toBeVisible();
    await expect(loginAsAdmin.deleteMovieButton).toBeVisible();

    await loginAsAdmin.openTheatresTab();
    await expect(loginAsAdmin.theatresTable).toBeVisible();
});

test('User should see required fields Edit movie modal' ,async ({loginAsAdmin})=>{
    const editMovieModal = await loginAsAdmin.openEditMovieModal();

    await expect(editMovieModal.movieName).toBeVisible();
    await expect(editMovieModal.description).toBeVisible();
    await expect(editMovieModal.movieDuration).toBeVisible();
    await expect(editMovieModal.slctMovieLanguage).toBeVisible();
    await expect(editMovieModal.releaseDate).toBeVisible();
    await expect(editMovieModal.slctMovieGenre).toBeVisible();
    await expect(editMovieModal.posterURL).toBeVisible();
    await expect(editMovieModal.submitButton).toBeVisible();
    await expect(editMovieModal.cancelButton).toBeVisible();
    await expect(editMovieModal.closeButton).toBeVisible();
});

test('User should see action buttons on Delete Movie dialog',async ({loginAsAdmin})=>{
    const deleteMovieModal = await loginAsAdmin.openDeleteMovieDialog();

    await expect(deleteMovieModal.deleteMsg).toBeVisible();
    await expect(deleteMovieModal.deleteYesButton).toBeVisible();
    await expect(deleteMovieModal.deleteNoButton).toBeVisible();
    await expect(deleteMovieModal.closeButton).toBeVisible();
}); 
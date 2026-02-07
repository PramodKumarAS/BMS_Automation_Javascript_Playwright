import { test,expect } from "../../../fixtures/auth.fixture";

test('User should see tabs and open Theatre tabs on admin home page',async({loggedInAdminPage})=>{
    await expect(loggedInAdminPage.heading).toBeVisible();
    await expect(loggedInAdminPage.moviesTab).toBeVisible();
    await expect(loggedInAdminPage.theatresTab).toBeVisible();
    await expect(loggedInAdminPage.addMovieButton).toBeVisible();
    await expect(loggedInAdminPage.movieTable).toBeVisible();
    await expect(loggedInAdminPage.editMovieButton).toBeVisible();
    await expect(loggedInAdminPage.deleteMovieButton).toBeVisible();

    await loggedInAdminPage.openTheatresTab();
    await expect(loggedInAdminPage.theatresTable).toBeVisible();
});

test('User should see required fields Edit movie modal' ,async ({loggedInAdminPage})=>{
    const editMovieModal = await loggedInAdminPage.openEditMovieModal();

    await expect(editMovieModal.movieName).toBeVisible();
    await expect(editMovieModal.description).toBeVisible();
    await expect(editMovieModal.movieDuration).toBeVisible();
    await expect(editMovieModal.selectMovieLanguage).toBeVisible();
    await expect(editMovieModal.releaseDate).toBeVisible();
    await expect(editMovieModal.selectMovieGenre).toBeVisible();
    await expect(editMovieModal.posterURL).toBeVisible();
    await expect(editMovieModal.submitButton).toBeVisible();
    await expect(editMovieModal.cancelButton).toBeVisible();
    await expect(editMovieModal.closeButton).toBeVisible();
});

test('User should see action buttons on Delete Movie dialog',async ({loggedInAdminPage})=>{
    const deleteMovieModal = await loggedInAdminPage.openDeleteMovieDialog();

    await expect(deleteMovieModal.deleteMsg).toBeVisible();
    await expect(deleteMovieModal.deleteYesButton).toBeVisible();
    await expect(deleteMovieModal.deleteNoButton).toBeVisible();
    await expect(deleteMovieModal.closeButton).toBeVisible();
}); 
import {test,expect} from '../../../fixtures/auth.fixture';
import { deleteOne, MongoConnect } from '../../../services/mongo.service';
import {newMovie} from '../../../test-data/movie.json';

test.afterAll(async ()=>{
    await MongoConnect('test','movies');
    await deleteOne('movieName',newMovie.Name)
});

test('Admin should be able to add a new movie e2e',async({loggedInAdminPage})=>{
    await expect(loggedInAdminPage.movieTable).toBeVisible({timeout:15000});
  
    const beforeCount = await loggedInAdminPage.getRecordCount();
    const addMoiveModalPage = await loggedInAdminPage.openAddMovieModal();

    await addMoiveModalPage.movieName.fill(newMovie.Name);
    await addMoiveModalPage.description.fill(newMovie.Description);
    await addMoiveModalPage.movieDuration.fill(newMovie.MovieDuration);
    await addMoiveModalPage.selectMovieLanuage(newMovie.Language);
    await addMoiveModalPage.releaseDate.fill(new Date().toISOString().split('T')[0]);
    await addMoiveModalPage.selectMovieGenre(newMovie.MovieGenre);
    await addMoiveModalPage.posterURL.fill(newMovie.PosterURL);
    await addMoiveModalPage.submitButton.click();

    loggedInAdminPage.page.reload()    
    const AfterCount = await loggedInAdminPage.getRecordCount();
    await expect(beforeCount+1).toBe(AfterCount);
    
    const data =await loggedInAdminPage.getRowData(newMovie.Name);
    await expect(data).toContainText(newMovie.Name);
    await expect(data).toContainText(newMovie.Description);
    await expect(data).toContainText(newMovie.MovieDuration);
    await expect(data).toContainText(newMovie.MovieGenre);
    await expect(data).toContainText(newMovie.Language);
    await expect(data).toContainText(new Date().toLocaleDateString('en-us'));
});
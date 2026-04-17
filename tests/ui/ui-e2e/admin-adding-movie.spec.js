import {test,expect} from '../../../src/fixtures/auth.fixture'
import { deleteOne, MongoConnect } from '../../../src/utils/mongoDBHelper';
import {newMovie} from '../../../src/test-data/movie.json';

test.afterAll(async ()=>{
    await MongoConnect('test','movies');
    await deleteOne('movieName',newMovie.Name)
});

test('Admin should be able to add a new movie e2e',async({loginAsAdmin})=>{
    await expect(loginAsAdmin.movieTable).toBeVisible({timeout:15000});
  
    const beforeCount = await loginAsAdmin.getRecordCount();
    const addMoiveModalPage = await loginAsAdmin.openAddMovieModal();

    await addMoiveModalPage.movieName.fill(newMovie.Name);
    await addMoiveModalPage.description.fill(newMovie.Description);
    await addMoiveModalPage.movieDuration.fill(newMovie.MovieDuration);
    await addMoiveModalPage.selectMovieLanuage(newMovie.Language);
    await addMoiveModalPage.releaseDate.fill(new Date().toISOString().split('T')[0]);
    await addMoiveModalPage.selectMovieGenre(newMovie.MovieGenre);
    await addMoiveModalPage.posterURL.fill(newMovie.PosterURL);
    await addMoiveModalPage.submitButton.click();

    loginAsAdmin.page.reload()    
    const AfterCount = await loginAsAdmin.getRecordCount();
    await expect(AfterCount).toBeGreaterThan(beforeCount);
    
    const data =await loginAsAdmin.getRowData(newMovie.Name);
    await expect(data).toContainText(newMovie.Name);
    await expect(data).toContainText(newMovie.Description);
    await expect(data).toContainText(newMovie.MovieDuration);
    await expect(data).toContainText(newMovie.MovieGenre);
    await expect(data).toContainText(newMovie.Language);
    await expect(data).toContainText(new Date().toLocaleDateString('en-us'));
});
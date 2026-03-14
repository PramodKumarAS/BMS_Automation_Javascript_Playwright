import {test,expect} from '../../../fixtures/auth.fixture';
import { deleteOne, MongoConnect } from '../../../services/mongoDB.service';
import {shows} from '../../../test-data/show.json';

test.afterAll(async ()=>{
    await MongoConnect('test','shows');
    await deleteOne("name",shows.show.showName);
});

test('partner should be able to add a show e2e',async({loggedInPartnerPage})=>{
    const partnerPage = await loggedInPartnerPage;

    const showsModalPage = await partnerPage.clickShowsByTheatre('PVR');
    const beforeAddShowsCount = await showsModalPage.getShowsRowCount();

    await expect(beforeAddShowsCount).toBeGreaterThan(0);
    const addShowModalPage = await showsModalPage.openAddShowModal();

    await  addShowModalPage.showName.fill(shows.show.showName);
    await  addShowModalPage.showDate.fill(new Date().toISOString().split('T')[0]);
    await  addShowModalPage.showTime.fill(shows.show.showTime);
    await  addShowModalPage.selectMovie(shows.show.movie);
    await  addShowModalPage.ticketPrice.fill(shows.show.ticketPrice);
    await  addShowModalPage.totalSeats.fill(shows.show.totalSeats);
    await  addShowModalPage.saveShow.click();

    await showsModalPage.closeShowDialogButton.click();
    await partnerPage.clickShowsByTheatre('PVR');
    const afterAddShowsCount = await showsModalPage.getShowsRowCount();
    
    await expect(afterAddShowsCount).toBe(beforeAddShowsCount+1);

    const showRowData = await showsModalPage.getRowData(shows.show.showName);

    await expect(showRowData).toContainText(shows.show.showName);
    await expect(showRowData).toContainText(new Date().toISOString().split('T')[0]);
    await expect(showRowData).toContainText(shows.show.showTime);
    await expect(showRowData).toContainText(shows.show.movie);
    await expect(showRowData).toContainText(shows.show.ticketPrice);
    await expect(showRowData).toContainText(shows.show.totalSeats);
}); 
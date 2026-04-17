import {test,expect} from '../../../src/fixtures/auth.fixture'
import { deleteOne, MongoConnect } from '../../../src/utils/mongoDBHelper';
import {shows} from '../../../src/test-data/show.json';

let showName =`${shows.show.showName} ${Date.now()}`;

test.afterAll(async ()=>{
    await MongoConnect('test','shows');
    await deleteOne("name",showName);
});

test('partner should be able to add a show e2e',async({loginAsPartner})=>{
    const partnerPage = await loginAsPartner;

    const showsModalPage = await partnerPage.clickShowsByTheatre('PVR');
    const beforeAddShowsCount = await showsModalPage.getShowsRowCount();

    await expect(beforeAddShowsCount).toBeGreaterThan(0);
    const addShowModalPage = await showsModalPage.openAddShowModal();

    await  addShowModalPage.showName.fill(showName);
    await  addShowModalPage.showDate.fill(new Date().toISOString().split('T')[0]);
    await  addShowModalPage.showTime.fill(shows.show.showTime);
    await  addShowModalPage.selectMovie(shows.show.movie);
    await  addShowModalPage.ticketPrice.fill(shows.show.ticketPrice);
    await  addShowModalPage.totalSeats.fill(shows.show.totalSeats);
    await  addShowModalPage.saveShow.click();

    await showsModalPage.closeShowDialogButton.click();
    await partnerPage.clickShowsByTheatre('PVR');
    const afterAddShowsCount = await showsModalPage.getShowsRowCount();
    
    await expect(afterAddShowsCount).toBeGreaterThan(beforeAddShowsCount);

    const showRowData = await showsModalPage.getRowData(showName);

    await expect(showRowData).toContainText(showName);
    await expect(showRowData).toContainText(new Date().toISOString().split('T')[0]);
    await expect(showRowData).toContainText(shows.show.showTime);
    await expect(showRowData).toContainText(shows.show.movie);
    await expect(showRowData).toContainText(shows.show.ticketPrice);
    await expect(showRowData).toContainText(shows.show.totalSeats);
}); 
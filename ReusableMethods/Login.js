/**
 * @param {import('@playwright/test').Page} page - Playwright page object
 */

async function login(page, email, password) {
  await page.goto('https://bookmyshow0101.netlify.app/login');
  await page.getByRole('textbox', { name: '* Email' }).fill(email);
  await page.getByRole('textbox', { name: '* Password' }).fill(password);
  await page.getByRole('button', { name: 'Login' }).click();   
  
  await page.waitForTimeout(5000); // wait 5 seconds
}

module.exports = { login };
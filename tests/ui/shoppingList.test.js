const { test, expect } = require('@playwright/test');

test('Check shopping list page', async ({ page }) => {
  await page.goto('http://localhost:3001/shopping-list');



  const list = await page.waitForSelector('ul', { timeout: 30000 });
  expect(list).not.toBeNull();
});

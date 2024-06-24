const { test, expect } = require('@playwright/test');

test('Check header', async ({ page }) => {
  await page.goto('http://localhost:3001');

  try {
    const homeLink = await page.waitForSelector('header a[href="/"]', { timeout: 30000 });
    expect(homeLink).not.toBeNull();

    const text = await homeLink.textContent();
    expect(text).toBe('Home');
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
});
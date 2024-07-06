import { test } from "@playwright/test";

test.skip("TC02 Browser Fixture Test", async ({ browser }) => {
    const objContext = await browser.newContext()
    const objPage = await objContext.newPage();
    await objPage.goto("http://localhost:2221/");
    await objPage.pause();
});

test("TC02 Page Fixture Test", async ({ page }) => {
    await page.goto("http://localhost:2221/");
    await page.pause();
});
import { test, expect } from "@playwright/test";

test("TC04 Multiple Window Test", async ({ context }) => {
    await test.step("Open login page and open second page", async () => {
        const page = await context.newPage();
        await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
        await page.locator("xpath=//a[contains(@href, 'documents-request')]").waitFor();
        //Open a new page
        const [newPage] = await Promise.all([
            context.waitForEvent("page"),
            page.locator("xpath=//a[contains(@href, 'documents-request')]").click()
        ]);
        //Switch to new page and validate the heading
        let varHeading = await newPage.locator("xpath=//div/h1").innerText();
        expect(varHeading).toBe("DOCUMENTS REQUEST");
        await newPage.close();
        //Switch back to first page
        await page.bringToFront();
        await page.locator("xpath=//input[@id = 'username']").fill("ABC");
        await page.pause();
    });
});
import { test, expect } from "@playwright/test";

test("TC03 Basket Counter Test", async ({ page }) => {
    await test.step("Open Home page", async () => {
        await page.goto("/");
        await page.locator("xpath=//div[contains(@class, 'product-card') and div[text() = 'Astronaut dabbing']]//div/button").waitFor();

    });

    await test.step("Validate texts before click", async () => {
        expect(page.locator("xpath=//div[contains(@class, 'product-card') and div[text() = 'Astronaut dabbing']]//div/button")).toHaveText("Add to Basket");
        expect(page.locator("xpath=//div[@data-qa = 'header-basket-count']")).toHaveText("0");
        await page.locator("xpath=//div[contains(@class, 'product-card') and div[text() = 'Astronaut dabbing']]//div/button").click();
    });

    await test.step("Validate texts after click", async () => {
        expect(page.locator("xpath=//div[contains(@class, 'product-card') and div[text() = 'Astronaut dabbing']]//div/button")).toHaveText("Remove from Basket");
        expect(page.locator("xpath=//div[@data-qa = 'header-basket-count']")).toHaveText("1");
    });

    await test.step("Validate Basket page URL", async()=>{
        await page.locator("xpath=//p[@data-qa = 'desktop-nav-link']/a[text() = 'Checkout']").click();
        await page.waitForURL("/basket");
    });
});
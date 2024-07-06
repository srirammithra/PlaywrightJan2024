import { test } from "@playwright/test";

test("TC05 Alert test", async ({ page }) => {
    await page.goto("https://letcode.in/alert");
    await page.waitForLoadState("networkidle");
    await page.on("dialog", (dialog) => {
        console.log("Message: " + dialog.message());
        console.log("Default: " + dialog.defaultValue());
        console.log("Type: " + dialog.type());
        dialog.accept("SIYA")
    });
    await page.locator("xpath=//button[@id='prompt']").click();
    await page.pause();
});
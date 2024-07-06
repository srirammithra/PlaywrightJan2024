import { test } from "@playwright/test";
test("TC06 File upload test", async ({ page }) => {
    const varFile1 = "../resources/1.jpg";
    const varFile2 = "../resources/2.jpg";

    await test.step("Navigate to page", async () => {
        await page.goto("https://the-internet.herokuapp.com/upload");
        await page.waitForLoadState("networkidle");
    });

    await test.step("Upload file", async () => {
        await page.locator("xpath=//input[@id='file-upload']").setInputFiles(varFile1);
        await page.pause();
    });

    await test.step("Upload files with listener", async () => {
        page.on("filechooser", (filechooser) => {
            filechooser.setFiles([varFile1, varFile2]);
        });
        await page.locator("xpath=//div[@id='drag-drop-upload']").click({ force: true });
        await page.pause();
    });
});
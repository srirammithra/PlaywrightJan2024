import { chromium, test } from "@playwright/test";

test("TC01 First Test", async () => {
    const objBrowser = await chromium.launch({ headless: false, channel: "chrome" });
    const objContext = await objBrowser.newContext();
    const objPage = await objContext.newPage();
    await objPage.goto("http://localhost:2221/");
    await objPage.pause();
});
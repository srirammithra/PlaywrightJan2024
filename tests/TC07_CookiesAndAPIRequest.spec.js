import { test } from "@playwright/test";
import { getLoginToken } from "../utils/APIUtils.js";
import { UserDetails } from "../test-data/UserDetails.js";

test("TC07 Cookies and API request example", async ({ page }) => {
    await test.step("Navigate directly to My Accounts page", async () => {
        const varLoginToken = await getLoginToken(UserDetails.Username, UserDetails.Password);
        console.log({ varLoginToken });
        await page.goto("/my-account");
        await page.waitForLoadState("networkidle");
        await page.pause();
        await page.evaluate(([varToken]) => {
            document.cookie = `token=${varToken}`;
        }, [varLoginToken]);
        await page.goto("/my-account");
        await page.waitForLoadState("networkidle");
        await page.pause();
    });
});
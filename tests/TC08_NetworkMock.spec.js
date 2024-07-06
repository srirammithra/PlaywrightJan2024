import { test } from "@playwright/test";
import { getLoginToken } from "../utils/APIUtils";
import { UserDetails } from "../test-data/UserDetails";

test("TC08 Network request mock example", async ({ page }) => {
    let varLoginToken = "";
    await test.step("Get Login token", async () => {
        varLoginToken = await getLoginToken(UserDetails.Username, UserDetails.Password);
    });

    await test.step("Navigate to My Account page", async () => {
        await page.route("**/api/user**", async (route, request) => {
            await route.fulfill({
                status: 500,
                contentType: "application/json",
                body: JSON.stringify({ message: "PLAYWRIGHT ERROR FROM MOCKING" })
            })
        })

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
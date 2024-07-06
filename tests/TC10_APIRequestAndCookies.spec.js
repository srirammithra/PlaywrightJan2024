import { test } from "@playwright/test";
import { UserDetails } from "../test-data/UserDetails";

test("TC10 API request using Playwright", async ({ page }) => {
    let varResponse = "";
    let varResponseJSON = "";
    let varToken = "";
    await test.step("Get token", async () => {
        varResponse = await page.request.post("http://localhost:2221/api/login", {
            data: {
                username: UserDetails.Username,
                password: UserDetails.Password
            }
        });
        varResponseJSON = await varResponse.json();
        varToken = varResponseJSON.token;
        console.log(varToken);
    });
})
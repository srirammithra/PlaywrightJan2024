import { test } from "@playwright/test";
import { getLoginToken } from "../utils/APIUtils";
import { UserDetails } from "../test-data/UserDetails";

test("TC08 Network request mock example", async ({ page }) => {
    let varLoginToken = "";
    await test.step("Get Login token", async () => {
        varLoginToken = await getLoginToken(UserDetails.Username, UserDetails.Password);
    });

    await test.step("Navigate to My Account page", async () => {
        await page.route("**/api/address**", async (route, request) => {
            await route.fulfill({
                status: 200,
                contentType: "application/json",
                body: JSON.stringify([
                    {
                        "id": "SRM-1",
                        "userId": "SRM",
                        "firstName": "Sriram Mithra",
                        "lastName": "G",
                        "street": "N Block, Kuvempunagar",
                        "postcode": "570023",
                        "city": "Mysore",
                        "country": "India",
                        "created": 1688072908
                    },

                    {
                        "id": "SRM-2",
                        "userId": "SM",
                        "firstName": "Siya Mithra",
                        "lastName": "S",
                        "street": "N Block, Kuvempunagar",
                        "postcode": "570023",
                        "city": "Mysore",
                        "country": "India",
                        "created": 1688072909
                    },

                ])
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
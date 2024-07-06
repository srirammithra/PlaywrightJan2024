import { expect } from "@playwright/test";

class ProductsPage {
    constructor(page) {
        this.page = page;
        this.objProductCards = page.locator("xpath=//div[contains(@class, 'product-card')]");
        this.objSortDirection = page.locator("xpath=//select[@class = 'sort-dropdown']");
    }

    async OpenApp() {
        await this.page.goto("/");
    }

    async AddProductToBasket(varProductName) {
        for (let i = 0; i < (await this.objProductCards.count()); i++) {
            await this.objProductCards.nth(i).waitFor();
            if (await this.objProductCards.nth(i).locator("xpath=//div[@data-qa = 'product-title']").textContent() === varProductName) {
                expect(await this.objProductCards.nth(i).locator("xpath=//div/button")).toHaveText("Add to Basket");
                await this.objProductCards.nth(i).locator("xpath=//div/button").click();
                expect(await this.objProductCards.nth(i).locator("xpath=//div/button")).toHaveText("Remove from Basket");
            }
        }
    }

    async SelectSortOption(varDirection) {
        await this.objSortDirection.selectOption(varDirection);
    }
}

module.exports = { ProductsPage };
import { expect } from "@playwright/test";

class BasketPage {
    constructor(page) {
        this.page = page;
        this.objBasketItemPrice = page.locator("xpath=//div[@data-qa = 'basket-item-price']");
        this.objBasketItem = page.locator("xpath=//div[@data-qa = 'basket-card']");
        this.objBasketItemRemoveButton = page.locator("xpath=//button[@data-qa = 'basket-card-remove-item']");
        this.objCheckoutButton = page.locator("xpath=//button[@data-qa = 'continue-to-checkout']");
    }

    async RemoveCheapestProduct() {
        await this.objBasketItem.first().waitFor();
        let varBasketItemsBefore = await this.objBasketItem.count();
        let varAllPrices = await this.objBasketItemPrice.allInnerTexts();
        let varAllPricesInt = varAllPrices.map((element) => {
            let varPricesDollarRemoved = element.replace("$", "");
            return parseInt(varPricesDollarRemoved);
        });
        let varSmallestNumber = Math.min(...varAllPricesInt);
        let varSmallestPriceIndex = varAllPricesInt.indexOf(varSmallestNumber);
        await this.objBasketItemRemoveButton.nth(varSmallestPriceIndex).click();
        await expect(this.objBasketItem).toHaveCount(varBasketItemsBefore - 1);
    }

    async GoToCheckoutPage() {
        await this.objCheckoutButton.waitFor();
        await this.objCheckoutButton.click();
        await this.page.waitForURL(/\/login/, { timeOut: 3000 });
    }
}

module.exports = { BasketPage };
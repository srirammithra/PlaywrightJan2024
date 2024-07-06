import { expect } from "@playwright/test";
import { IsDesktopMode } from "../utils/TestUtils";

class NavigationBar {
    constructor(page) {
        this.page = page;
        this.objBasketCounter = page.locator("xpath=//div[@data-qa = 'header-basket-count']");
        this.objCheckoutLink = page.locator("xpath=//p[@data-qa = 'desktop-nav-link']/a[text() = 'Checkout']");
        this.objMobileCheckoutLink = page.locator("xpath=(//p/a[text() = 'Checkout'])[1]");
        this.objBurgerButton = page.locator("xpath=//div[@data-qa = 'burger-button']");
    }

    async VerifyBasketCount(varBasketCount) {
        expect(await this.objBasketCounter).toHaveText(varBasketCount);
    }

    async GotoCheckout() {
        if (!IsDesktopMode(this.page)) {
            await this.objBurgerButton.waitFor();
            await this.objBurgerButton.click();
            await this.objMobileCheckoutLink.waitFor();
            await this.objMobileCheckoutLink.click();
        }
        else {
            await this.objCheckoutLink.waitFor();
            await this.objCheckoutLink.click();
        }
        await this.page.waitForURL("/basket");
    }
}

module.exports = { NavigationBar };
import { expect } from "@playwright/test";

class PaymentPage {
    constructor(page) {
        this.page = page;
        this.objDiscountCodeField = page.frameLocator("xpath=//iframe[@data-qa = 'active-discount-container']").locator("xpath=//p[@data-qa ='discount-code']");
        this.objDiscountCodeTextbox = page.locator("xpath=//input[@data-qa = 'discount-code-input']");
        this.objSubmitDiscountButton = page.locator("xpath=//button[@data-qa = 'submit-discount-button']");
        this.objDiscountAppliedField = page.locator("xpath=//p[@data-qa = 'discount-active-message']");
        this.objTotalWithDiscountField = page.locator("xpath=//span[@data-qa = 'total-with-discount-value']");
        this.objTotalWithoutDiscountField = page.locator("xpath=//span[@data-qa = 'total-value']");
        this.objCCNametextbox = page.locator("xpath=//input[@data-qa = 'credit-card-owner']");
        this.objCCNumberTextbox = page.locator("xpath=//input[@data-qa = 'credit-card-number']");
        this.objCCValidUntilTextbox = page.locator("xpath=//input[@data-qa = 'valid-until']");
        this.objCCCVVTextbox = page.locator("xpath=//input[@data-qa = 'credit-card-cvc']");
        this.objPayButton = page.locator("xpath=//button[@data-qa = 'pay-button']");
    }

    async ActivateDiscountCode() {
        await this.objDiscountCodeField.waitFor();
        const varCode = await this.objDiscountCodeField.innerText();
        await this.objDiscountCodeTextbox.waitFor();
        //Option 1 - Use fill with toHavevalue
        await this.objDiscountCodeTextbox.fill(varCode);
        await expect(this.objDiscountCodeTextbox).toHaveValue(varCode);
        //Otion 2 - Use Playwright keyboard
        //await this.objDiscountCodeTextbox.focus();
        //await this.page.keyboard.type(varCode, {delay:1000});
        //expect(await this.objDiscountCodeTextbox.inputvalue()).toBe(varCode);
        await this.objSubmitDiscountButton.waitFor();
        await this.objSubmitDiscountButton.click();
        await this.objDiscountAppliedField.waitFor();
        await this.objTotalWithDiscountField.waitFor();
        let varTotalWithDiscountText = await this.objTotalWithDiscountField.innerText();
        varTotalWithDiscountText = varTotalWithDiscountText.replace("$", "");
        let varTotalWithDiscountValue = parseInt(varTotalWithDiscountText, 10);
        await this.objTotalWithoutDiscountField.waitFor();
        let varTotalWithoutDiscountText = await this.objTotalWithoutDiscountField.innerText();
        varTotalWithoutDiscountText = varTotalWithoutDiscountText.replace("$", "");
        let varTotalWithoutDiscountValue = parseInt(varTotalWithoutDiscountText, 10);
        expect(varTotalWithDiscountValue).toBeLessThan(varTotalWithoutDiscountValue);
    }

    async FillPaymentDetails(PaymentDetails) {
        await this.objCCNametextbox.waitFor();
        await this.objCCNametextbox.fill(PaymentDetails.CCName);
        await this.objCCNumberTextbox.waitFor();
        await this.objCCNumberTextbox.fill(PaymentDetails.CCNumber);
        await this.objCCValidUntilTextbox.waitFor();
        await this.objCCValidUntilTextbox.fill(PaymentDetails.ValidUntil);
        await this.objCCCVVTextbox.waitFor();
        await this.objCCCVVTextbox.fill(PaymentDetails.CVV);
    }

    async CompletePayment() {
        await this.objPayButton.waitFor();
        await this.objPayButton.click();
        await this.page.waitForURL(/\/thank-you/gm, { timeOut: 3000 });
    }
}

module.exports = { PaymentPage };   
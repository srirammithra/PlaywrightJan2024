import { expect } from "@playwright/test";

class DeliverDetailsPage {
    constructor(page) {
        this.page = page;
        this.objFirstnameTextbox = page.locator("xpath=//input[@data-qa = 'delivery-first-name']");
        this.objLastnameTextbox = page.locator("xpath=//input[@data-qa = 'delivery-last-name']");
        this.objStreetTextbox = page.locator("xpath=//input[@data-qa = 'delivery-address-street']");
        this.objPostcodeTextbox = page.locator("xpath=//input[@data-qa = 'delivery-postcode']");
        this.objCityTextbox = page.locator("xpath=//input[@data-qa = 'delivery-city']");
        this.objCountyDropdown = page.locator("xpath=//select[@data-qa = 'country-dropdown']");
        this.objContinueToPaymentButton = page.locator("xpath=//button[@data-qa = 'continue-to-payment-button']");
        this.objSaveAddressButton = page.locator("xpath=//button[@data-qa = 'save-address-button']");
        this.objSavedAddressContainer = page.locator("xpath=//div[@data-qa = 'saved-address-container']");
        this.objSavedFirstNameField = page.locator("xpath=//div[@data-qa = 'saved-address-container']/p[@data-qa = 'saved-address-firstName']");
        this.objSavedLastNameField = page.locator("xpath=//div[@data-qa = 'saved-address-container']/p[@data-qa = 'saved-address-lastName']");
        this.objSavedStreetField = page.locator("xpath=//div[@data-qa = 'saved-address-container']/p[@data-qa = 'saved-address-street']");
        this.objSavedPostCodeField = page.locator("xpath=//div[@data-qa = 'saved-address-container']/p[@data-qa = 'saved-address-postcode']");
        this.objSavedCityField = page.locator("xpath=//div[@data-qa = 'saved-address-container']/p[@data-qa = 'saved-address-city']");
        this.objSavedCountryField = page.locator("xpath=//div[@data-qa = 'saved-address-container']/p[@data-qa = 'saved-address-country']");
    }

    async FillDeliveryDetails(DeliveryDetails) {
        await this.objFirstnameTextbox.waitFor();
        await this.objFirstnameTextbox.fill(DeliveryDetails.FirstName);
        await this.objLastnameTextbox.waitFor();
        await this.objLastnameTextbox.fill(DeliveryDetails.LastName);
        await this.objStreetTextbox.waitFor();
        await this.objStreetTextbox.fill(DeliveryDetails.Street);
        await this.objPostcodeTextbox.waitFor();
        await this.objPostcodeTextbox.fill(DeliveryDetails.Postcode);
        await this.objCityTextbox.waitFor();
        await this.objCityTextbox.fill(DeliveryDetails.City);
        await this.objCountyDropdown.waitFor();
        await this.objCountyDropdown.selectOption(DeliveryDetails.Country);
    }

    async AddAndVerifySavedAddress() {
        const varSavedAddressCount = await this.objSavedAddressContainer.count();
        await this.objSaveAddressButton.waitFor();
        await this.objSaveAddressButton.click();
        await expect(this.objSavedAddressContainer).toHaveCount(varSavedAddressCount + 1);
        await this.objSavedFirstNameField.waitFor();
        expect(await this.objSavedFirstNameField.innerText()).toBe(await this.objFirstnameTextbox.inputValue());
        await this.objSavedLastNameField.waitFor();
        expect(await this.objSavedLastNameField.innerText()).toBe(await this.objLastnameTextbox.inputValue());
        await this.objSavedStreetField.waitFor();
        expect(await this.objSavedStreetField.innerText()).toBe(await this.objStreetTextbox.inputValue());
        await this.objSavedPostCodeField.waitFor();
        expect(await this.objSavedPostCodeField.innerText()).toBe(await this.objPostcodeTextbox.inputValue());
        await this.objSavedCityField.waitFor();
        expect(await this.objSavedCityField.innerText()).toBe(await this.objCityTextbox.inputValue());
        await this.objSavedCountryField.waitFor();
        expect(await this.objSavedCountryField.innerText()).toBe(await this.objCountyDropdown.inputValue());

    }

    async ContinueToPayment() {
        await this.objContinueToPaymentButton.waitFor();
        await this.objContinueToPaymentButton.click();
        await this.page.waitForURL(/\/payment/gm, { timeout: 5000 });
    }
}
module.exports = { DeliverDetailsPage };
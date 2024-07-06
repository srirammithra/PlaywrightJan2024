class SignUpPage {
    constructor(page) {
        this.page = page;
        this.objEmailTextbox = page.locator("xpath=//input[@placeholder = 'E-Mail']");
        this.objPasswordTextbox = page.locator("xpath=//input[@placeholder = 'Password']");
        this.objRegisterButton = page.locator("xpath=//button/div[text() = 'Register']");
    }

    async RegisterUser(varEmail, varPassword) {
        await this.objRegisterButton.waitFor();
        await this.objEmailTextbox.fill(varEmail);
        await this.objPasswordTextbox.fill(varPassword);
        await this.objRegisterButton.click();
        await this.page.waitForURL(/\/delivery-details/gm, { timeout: 3000 });
    }
}

module.exports = { SignUpPage };
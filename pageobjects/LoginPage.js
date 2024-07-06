import { expect } from "@playwright/test";

class LoginPage {
    constructor(page) {
        this.page = page;
        this.objRegisterButton = page.locator("xpath=//button[@data-qa = 'go-to-signup-button']");
    }

    async GotoRegisterPage() {
        await this.objRegisterButton.waitFor();
        await this.objRegisterButton.click();
        await this.page.waitForURL(/\/signup/gm, { timeOut: 3000 });
    }
}

module.exports = { LoginPage };
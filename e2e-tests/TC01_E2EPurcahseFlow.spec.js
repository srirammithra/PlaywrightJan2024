import { test } from "@playwright/test";
import { v4 as uuidv4 } from "uuid";
import { ProductsPage } from "../pageobjects/ProductsPage";
import { NavigationBar } from "../pageobjects/NavigationBar";
import { BasketPage } from "../pageobjects/BasketPage";
import { LoginPage } from "../pageobjects/LoginPage";
import { SignUpPage } from "../pageobjects/SingUpPage";
import { DeliverDetailsPage } from "../pageobjects/DeliveryDetailsPage";
import { PaymentPage } from "../pageobjects/PaymentPage";
import { DeliveryDetails } from "../test-data/DeliveryDetails";
import { PaymentDetails } from "../test-data/PaymentDetails";

test("TC04 E2E Purchase Flow Test", async ({ page }) => {
    await test.step("Launch the App and Add three products", async () => {
        const objProductsPage = new ProductsPage(page);
        await objProductsPage.OpenApp();
        await objProductsPage.SelectSortOption("price-asc");
        await objProductsPage.AddProductToBasket("Astronaut dabbing");
        await objProductsPage.AddProductToBasket("Mountain Landscape");
        await objProductsPage.AddProductToBasket("Baby Zebra with butterfly");
    });

    await test.step("Verify Basket count and Goto Basket page", async () => {
        const objNavigationBar = new NavigationBar(page);
        await objNavigationBar.VerifyBasketCount("3");
        await objNavigationBar.GotoCheckout();
    });

    await test.step("Remove cheapest in Basket page and Goto Login page", async () => {
        const objBasketPage = new BasketPage(page);
        await objBasketPage.RemoveCheapestProduct();
        await objBasketPage.GoToCheckoutPage();
    });

    await test.step("Navigate to SignUp page", async () => {
        const objLoginPage = new LoginPage(page);
        await objLoginPage.GotoRegisterPage();
    });

    await test.step("Create a new user", async () => {
        const objSignUpPage = new SignUpPage(page);
        const varEmailID = uuidv4() + "xyz.com";
        const varPassword = uuidv4();
        await objSignUpPage.RegisterUser(varEmailID, varPassword);
    });

    await test.step("Fill Delivery Details", async () => {
        const objDeliveryDetailsPage = new DeliverDetailsPage(page);
        await objDeliveryDetailsPage.FillDeliveryDetails(DeliveryDetails);
        await objDeliveryDetailsPage.AddAndVerifySavedAddress();
        await objDeliveryDetailsPage.ContinueToPayment();
    });

    await test.step("Fill Payment details and complete payment", async () => {
        const objPaymentPage = new PaymentPage(page);
        await objPaymentPage.ActivateDiscountCode();
        await objPaymentPage.FillPaymentDetails(PaymentDetails);
        await objPaymentPage.CompletePayment();
    });

});
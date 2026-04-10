import {test,expect} from '../../fixtures/base.fixture'
import { pageMatchers } from '../../utils/routes';

test.describe("Testing checkout related test case",{tag: ['@checkout']}, ()=>{
  test("User can cancel the checkout process and navigate back to the cart", async ({inventoryPage, checkoutPage, cartPage, page}) =>{
    await test.step("Add item and go to checkout", async () => {
      await inventoryPage.goto();
      await inventoryPage.assertInventoryPageIsVisible();

      await inventoryPage.addInventoryItemToCart('Sauce Labs Backpack');
      await inventoryPage.assertShoppingCartBadgeCount(1);

      await inventoryPage.clickOnCartLink();
      await cartPage.assertCartPageIsVisible();

      await cartPage.clickOnCheckoutButton();
      await expect(page).toHaveURL(pageMatchers.checkout);

      await checkoutPage.assertTitle("Checkout: Your Information");
    });

    await test.step("Fill form and cancel checkout", async () => {
      await checkoutPage.fillCheckoutForm("John", "Doe", "12345");
      await checkoutPage.clickOnCancelButton();
      await expect(page).toHaveURL(pageMatchers.cart);
      await cartPage.assertCartPageIsVisible();
      await cartPage.assertCartItemCount(1);
    });
  })
})

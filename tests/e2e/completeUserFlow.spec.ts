import { test, expect } from '../../fixtures/base.fixture';
import {env} from '../../utils/env';
import { pageMatchers } from '../../utils/routes';

test.describe('E2E Complete User Flow', {tag: ['@e2e']}, () => {

  test('User completes checkout with 3 random items', async ({
    inventoryPage,
    cartPage,
    checkoutPage,
    page
  }) => {

    let selectedItems: { name: string; price: number }[] = [];
    let expectedTotalItemPrice = 0;

    await test.step('User login and navigate to inventory', async () => {
      await inventoryPage.goto();
      await expect(page).toHaveURL(pageMatchers.inventory);
      await inventoryPage.assertInventoryPageIsVisible();
      await inventoryPage.filterProductsBy('lohi'); //filtering product by low to high
    });

    await test.step('User add 3 random items to cart', async () => {
      selectedItems = await inventoryPage.addRandomItemsToCart(3) ?? [];
      await inventoryPage.assertShoppingCartBadgeCount(3);
      expectedTotalItemPrice = selectedItems.reduce((total, item) => total + item.price, 0);
    });

    await test.step('Navigate to cart and verify items', async () => {
      await inventoryPage.clickOnCartLink();
      await expect(page).toHaveURL(pageMatchers.cart);
      await cartPage.assertCartPageIsVisible();
      await cartPage.assertCartItemCount(3);

      const cartItems = await cartPage.getCartItemsWithNameAndPrice();

      const cartNames = cartItems.map(item => item.name);
      for(const item of selectedItems){
        expect(cartNames).toContain(item.name);
      }
    });

    await test.step('User proceed to checkout', async () => {
      await cartPage.clickOnCheckoutButton();
    });

    await test.step('User fill checkout form', async () => {
      await expect(page).toHaveURL(pageMatchers.checkout);
      await checkoutPage.assertTitle("Checkout: Your Information");
      await checkoutPage.fillCheckoutForm("Test", "Test", "55555");
      await checkoutPage.clickOnContinueButton();
    });

    await test.step('User is verifying the summary and completes order', async () => {
      await expect(page).toHaveURL(pageMatchers.checkoutOverview);
      await checkoutPage.assertTitle("Checkout: Overview");
      await checkoutPage.assertSummaryInfo();
      const { itemTotalPrice, taxTotalPrice, totalPrice } = await checkoutPage.fetchSummaryValues();
      expect(itemTotalPrice).toBeCloseTo(expectedTotalItemPrice, 2);
      expect(taxTotalPrice).toBeCloseTo(totalPrice - itemTotalPrice, 2);
      expect(totalPrice).toBeCloseTo(itemTotalPrice + taxTotalPrice, 2);
      await checkoutPage.clickOnFinishButton();
    });

    await test.step('User is verifying order completion', async () => {
      await expect(page).toHaveURL(pageMatchers.checkoutComplete);
      await checkoutPage.assertCheckoutCompleteHeader("Thank you for your order!");
      await checkoutPage.assertCheckoutCompleteText("Your order has been dispatched, and will arrive just as fast as the pony can get there!");
      await checkoutPage.assertBackToHomeButtonAndClicked();
      await inventoryPage.assertInventoryPageIsVisible();
    });

  });

});

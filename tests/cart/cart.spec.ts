import {test} from '../../fixtures/base.fixture'

test.describe("Testing cart related test case",{tag: ['@cart']}, ()=>{
  test("User can remove item from cart and continue shopping", async ({inventoryPage, cartPage, }) => {
    await test.step("User is able to remove the item from cart and continue shopping and cart count is reduced", async () => {
      await inventoryPage.goto();
      await inventoryPage.assertInventoryPageIsVisible();
    });
    await test.step("Add item to cart and navigate to cart page", async () => {
      await inventoryPage.addInventoryItemToCart('Sauce Labs Backpack');
      await inventoryPage.assertShoppingCartBadgeCount(1);
      await inventoryPage.clickOnCartLink();
      await cartPage.assertCartPageIsVisible();
    });
    await test.step("Remove item from cart and continue shopping", async () => {
      await cartPage.removeItemFromCart('Sauce Labs Backpack');
      await cartPage.assertCartItemCount(0);
      await cartPage.clickOnContinueShoppingButton();
      await inventoryPage.assertInventoryPageIsVisible();
      await inventoryPage.assertShoppingCartBadgeCount(0);
    });
  })
})

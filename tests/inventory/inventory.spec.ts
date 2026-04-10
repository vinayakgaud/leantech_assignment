import {test} from '../../fixtures/base.fixture'

test.describe("Testing inventory related test case",{tag: ['@inventory']}, ()=>{
  test("User is navigated to inventory and all the inventory items are visible", async({inventoryPage}) => {
    await test.step('Navigate to inventory page', async () => {
      await inventoryPage.goto();
    });

    await test.step('Verify inventory page is visible', async () => {
      await inventoryPage.assertInventoryPageIsVisible();
    });

    await test.step('Verify all inventory items are present', async () => {
      await inventoryPage.assertInventoryItemCount(6);
    });
  })
  test("User can add item to cart from inventory page and cart badge count is increased", async({inventoryPage}) => {
    await test.step('Navigate to inventory page', async () => {
      await inventoryPage.goto();
      await inventoryPage.assertInventoryPageIsVisible();
    });

    await test.step('Add item to cart', async () => {
      await inventoryPage.addInventoryItemToCart('Sauce Labs Backpack');
    });

    await test.step('Verify cart badge count', async () => {
      await inventoryPage.assertShoppingCartBadgeCount(1);
    });
  })

  test("User can add item to cart from inventory page or remove item from the cart and cart badge count is increased or decreased accordingly", async({inventoryPage}) => {
    await test.step('Navigate to inventory page', async () => {
      await inventoryPage.goto();
      await inventoryPage.assertInventoryPageIsVisible();
    });

    await test.step('Add item to cart', async () => {
      await inventoryPage.addInventoryItemToCart('Sauce Labs Backpack');
    });

    await test.step('Verify cart badge count', async () => {
      await inventoryPage.assertShoppingCartBadgeCount(1);
    });
  })
})

import { Page, expect } from "@playwright/test";
import { pageRoutes } from "../utils/routes";

export class CartPage{
  constructor(private page: Page){}

  private selectors = {
    titleText: '.title',
    cartList: '.cart_list',
    inventoryItemName: '.inventory_item_name',
    inventoryItemPrice: '.inventory_item_price',
    checkoutButton: "#checkout",
    continueShoppingButton: "#continue-shopping",
  }

  private get titleText() {
    return this.page.locator(this.selectors.titleText);
  }
  private get cartList() {
    return this.page.locator(this.selectors.cartList);
  }
  private get inventoryItemName() {
    return this.page.locator(this.selectors.inventoryItemName);
  }
  private get inventoryItemPrice() {
    return this.page.locator(this.selectors.inventoryItemPrice);
  }
  private get checkoutButton() {
    return this.page.locator(this.selectors.checkoutButton);
  }
  private get continueShoppingButton() {
    return this.page.locator(this.selectors.continueShoppingButton);
  }

  async goto(){
    await this.page.goto(pageRoutes.cart);
  }

  async assertCartPageIsVisible(){
    await expect(this.titleText).toHaveText("Your Cart");
    await expect(this.cartList).toBeVisible();
    await expect(this.checkoutButton).toBeVisible();
    await expect(this.continueShoppingButton).toBeVisible();
  }

  async assertCartItemCount(expectedCount: number){
    await expect(this.cartList.locator('.cart_item')).toHaveCount(expectedCount);
  }

  async getCartItemsWithNameAndPrice() {
    const items = this.cartList.locator('.cart_item');
    const itemCount = await items.count();
    const cartItems: {name: string, price: number}[] = [];
    for(let index = 0; index < itemCount; index++){
      const item = items.nth(index);
      const name = await item.locator(this.inventoryItemName).textContent();
      const priceTextFromDescription = await item.locator(this.inventoryItemPrice).textContent();
      const price = priceTextFromDescription ? parseFloat(priceTextFromDescription.replace('$', '')) : 0;
      if(name) {
        cartItems.push({name, price});
      }
    }
    return cartItems;
  }

  async clickOnCheckoutButton(){
    await this.checkoutButton.click();
  }

  async clickOnContinueShoppingButton(){
    await this.continueShoppingButton.click();
  }

  async removeItemFromCart(itemName: string){
    const item = this.cartList
    .locator('.cart_item')
    .filter({ hasText: itemName });
    await item.locator('button').click();
  }
}


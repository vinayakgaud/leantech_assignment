import { Page, expect } from "@playwright/test";
import { pageRoutes } from "../utils/routes";

export class InventoryPage{
  constructor(private page: Page){}

  private selectors = {
    headingText: '.app_logo',
    titleText: '.title',
    shoppingCartLink: '.shopping_cart_link',
    shoppingCartBadge: '.shopping_cart_badge',
    inventoryList: '.inventory_list',
    productFilter: '.product_sort_container',
  }

  private get headingText() {
    return this.page.locator(this.selectors.headingText);
  }

  private get titleText() {
    return this.page.locator(this.selectors.titleText);
  }

  private get shoppingCartLink() {
    return this.page.locator(this.selectors.shoppingCartLink);
  }

  private get shoppingCartBadge() {
    return this.page.locator(this.selectors.shoppingCartBadge);
  }

  private get inventoryList() {
    return this.page.locator(this.selectors.inventoryList);
  }

  private get productFilter() {
    return this.page.locator(this.selectors.productFilter);
  }

  async goto(){
    await this.page.goto(pageRoutes.inventory);
  }

  async assertInventoryPageIsVisible(){
    await expect(this.headingText).toHaveText("Swag Labs");
    await expect(this.titleText).toHaveText("Products");
    await expect(this.shoppingCartLink).toBeVisible();
    await expect(this.inventoryList).toBeVisible();
    await expect(this.productFilter).toBeVisible();
  }

  async assertInventoryItemCount(expectedCount: number){
    if(expectedCount <= 0) {
      throw new Error(`Expected count cannot be negative. Received: ${expectedCount}`);
    }
    if(expectedCount > await this.inventoryList.locator('.inventory_item').count()){
      throw new Error(`Expected count ${expectedCount} exceeds total inventory items available.`);
    }
    await expect(this.inventoryList.locator('.inventory_item')).toHaveCount(expectedCount);
  }

  async filterProductsBy(filterOption: string){
    await this.productFilter.selectOption(filterOption);
    await expect(this.productFilter).toHaveValue(filterOption);
  }

  async addInventoryItemToCart(itemName: string){
    const item = this.inventoryList
    .locator('.inventory_item')
    .filter({ hasText: itemName });
    await item.locator('button').click();
  }

  async assertShoppingCartBadgeCount(expectedCount: number){
    if(expectedCount === 0){
      await expect(this.shoppingCartBadge).toHaveCount(0);
    } else {
      await expect(this.shoppingCartBadge).toHaveText(expectedCount.toString());
    }
  }

  async removeInventoryItemFromCart(itemName: string){
    const item = this.inventoryList
    .locator('.inventory_item')
    .filter({ hasText: itemName });
    await item.locator('button').click();
  }

  async addRandomItemsToCart(count: number){
    if(count <= 0) return;
    if(count > await this.inventoryList.locator('.inventory_item').count()){
      throw new Error(`Cannot add ${count} items to cart. Only ${await this.inventoryList.locator('.inventory_item').count()} items available.`);
    }
    const items = this.inventoryList.locator('.inventory_item');
    const totalItems = await items.count();
    const selectIndexes = new Set<number>();
    const selectedItemsWithNameAndPrice: {name: string, price: number}[] = [];
    while(selectIndexes.size < count){
      const index = Math.floor(Math.random() * totalItems);
      selectIndexes.add(index);
    }
    for(const index of selectIndexes){
      const item = items.nth(index);
      const name = await item.locator('.inventory_item_name').textContent();
      const priceTextFromDescription = await item.locator('.inventory_item_price').textContent();
      const price = priceTextFromDescription ? parseFloat(priceTextFromDescription.replace('$', '')) : 0
      if(name) {
        selectedItemsWithNameAndPrice.push({name, price});
      }
      await item.locator('button').click();
    }
    return selectedItemsWithNameAndPrice;
  }

  async clickOnCartLink(){
    await this.shoppingCartLink.click();
  }
}

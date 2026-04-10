import { expect, Page } from "@playwright/test";

export class CheckoutPage{
  constructor(private page: Page){}

  private selectors = {
    titleText: '.title',
    firstNameInput: '#first-name',
    lastNameInput: '#last-name',
    postalCodeInput: '#postal-code',
    continueButton: '#continue',
    cancelButton: '#cancel',
    finishButton: '#finish',
    summaryInfo: '.summary_info',
    completeHeader: '.complete-header',
    completeText: '.complete-text',
    backToHomeButton: '#back-to-products'
  }

  private get titleText() {
    return this.page.locator(this.selectors.titleText);
  }
  private get firstNameInput() {
    return this.page.locator(this.selectors.firstNameInput);
  }
  private get lastNameInput() {
    return this.page.locator(this.selectors.lastNameInput);
  }
  private get postalCodeInput() {
    return this.page.locator(this.selectors.postalCodeInput);
  }
  private get continueButton() {
    return this.page.locator(this.selectors.continueButton);
  }
  private get cancelButton() {
    return this.page.locator(this.selectors.cancelButton);
  }
  private get summaryInfo() {
    return this.page.locator(this.selectors.summaryInfo);
  }
  private get completeHeader() {
    return this.page.locator(this.selectors.completeHeader);
  }
  private get completeText() {
    return this.page.locator(this.selectors.completeText);
  }

  private get backToHomeButton() {
    return this.page.locator(this.selectors.backToHomeButton);
  }

  async assertCheckoutCompleteHeader(expectedHeader: string){
    await expect(this.completeHeader).toHaveText(expectedHeader);
  }

  async assertCheckoutCompleteText(expectedText: string){
    await expect(this.completeText).toHaveText(expectedText);
  }

  async assertBackToHomeButtonAndClicked(){
    await expect(this.backToHomeButton).toBeVisible();
    await this.backToHomeButton.click();
  }

  async assertTitle(expectedTitle: string){
    await expect(this.titleText).toHaveText(expectedTitle);
  }

  async fillCheckoutForm(firstName: string, lastName: string, postalCode: string){
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(postalCode);
  }

  async clickOnContinueButton(){
    await this.continueButton.click();
  }

  async clickOnCancelButton(){
    await this.cancelButton.click();
  }

  async clickOnFinishButton(){
    await this.page.click(this.selectors.finishButton);
  }

  async assertSummaryInfo(){
    await expect(this.summaryInfo).toBeVisible();
    await expect(this.summaryInfo.locator('.summary_subtotal_label')).toBeVisible();
    await expect(this.summaryInfo.locator('.summary_tax_label')).toBeVisible();
    await expect(this.summaryInfo.locator('.summary_total_label')).toBeVisible();
  }

  async fetchSummaryValues() {
  const itemTotalText = await this.summaryInfo
    .locator('.summary_subtotal_label')
    .textContent();

  const taxTotalText = await this.summaryInfo
    .locator('.summary_tax_label')
    .textContent();

  const totalText = await this.summaryInfo
    .locator('.summary_total_label')
    .textContent();

  const itemTotalPrice = itemTotalText
    ? parseFloat(itemTotalText.replace('Item total: $', ''))
    : 0;

  const taxTotalPrice = taxTotalText
    ? parseFloat(taxTotalText.replace('Tax: $', ''))
    : 0;

  const totalPrice = totalText
    ? parseFloat(totalText.replace('Total: $', ''))
    : 0;

  return { itemTotalPrice, taxTotalPrice, totalPrice };
}
}

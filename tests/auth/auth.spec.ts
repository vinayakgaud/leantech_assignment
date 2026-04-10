import {test, expect} from '../../fixtures/base.fixture'
import { env } from '../../utils/env';
import { pageMatchers } from '../../utils/routes';
import 'allure-playwright';

test.describe("Testing authentication related test case",{tag: ['@auth']}, ()=>{
  test("User can login and logout successfully", async ({loginPage, page}) => {
    await test.step("Navigating to login page and asserting the form is ready for login", async () => {
      await loginPage.goto();
      await loginPage.waitForFormReady();
      await loginPage.assertFormIsClean();
    });
    await test.step("Login with valid credentials", async () => {
      await loginPage.submitLogin(env.standardUser, env.userPassword);
      await expect(page).toHaveURL(pageMatchers.inventory);
    });
    await test.step("Logout successfully from the application", async () => {
      await loginPage.logout();
      await expect(page).toHaveURL(env.baseURL);
    })
  })
})

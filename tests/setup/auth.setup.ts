import {expect, test as setup} from '@playwright/test';
import { LoginPage } from '../../pages/login.page';
import { env } from '../../utils/env';
import fs from 'fs';
import { pageMatchers } from '../../utils/routes';

setup('authenticate the login and save session storage state', async ({ page }) => {
  fs.mkdirSync('storage', { recursive: true });
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.waitForFormReady();
  await loginPage.assertFormIsClean();
  await loginPage.submitLogin(env.standardUser, env.userPassword);
  await expect(page).toHaveURL(pageMatchers.inventory);
  await page.context().storageState({path: 'storage/auth.json'});
})

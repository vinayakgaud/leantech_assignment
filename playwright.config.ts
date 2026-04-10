import { defineConfig, devices } from '@playwright/test';

import { env } from './utils/env';

export default defineConfig({
  testDir: './tests',

  outputDir: 'reports/test-artifacts',

  fullyParallel: true,

  forbidOnly: !!process.env.CI, //fail if test.only is left in the source code in CI environment

  retries: process.env.CI ? 2 : 0,

  workers: process.env.CI ? 1 : undefined, //no parallel execution in CI environment

  reporter: [
    ['list'],
    ['html', { outputFolder: 'reports/playwright-report', open: 'never' }],
    ['allure-playwright', { outputFolder: 'reports/allure-results' }]
  ],
  timeout: 50 * 1000, //50 seconds

  expect:{
    timeout: 5000 //5 seconds
  },

  use: {
    baseURL: env.baseURL || 'http://localhost:3000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },

  projects: [
    {
      name: "setup",
      testMatch: /.*\.setup\.ts/,
      workers: 1,
    },
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'], storageState: 'storage/auth.json' },
      dependencies: ['setup']
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'], storageState: 'storage/auth.json' },
      dependencies: ['setup']
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'], storageState: 'storage/auth.json' },
      dependencies: ['setup']
    },
  ],
});

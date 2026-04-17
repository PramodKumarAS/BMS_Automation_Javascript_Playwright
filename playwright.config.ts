import { defineConfig } from '@playwright/test';
import dotenv from 'dotenv';
dotenv.config();

export default defineConfig({
  testDir: './tests',
  timeout: 60 * 1000,
  reporter: 'allure-playwright',
  retries:2,

  use: {
    headless: false,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    ignoreHTTPSErrors: true,
    viewport: null,
  },


  projects: [
    // 🔹 UI Project
    {
      name: 'ui-chromium',
      testDir: './tests/ui',
      use: {
        browserName: 'chromium',
        baseURL: process.env.UI_BASE_URL,
        launchOptions: {
          args: ['--start-maximized'],
        },
      },
    },

    // 🔹 API Project
    {
      name: 'ui-chromium',
      testDir: './tests/api',
      use: {
        browserName: 'chromium',
        baseURL: process.env.API_BASE_URL,
        launchOptions: {
          args: ['--start-maximized'],
        },
      },
    },
  ],
});
import { defineConfig } from '@playwright/test';
import dotenv from 'dotenv';
dotenv.config();

export default defineConfig({
  testDir: './tests',
  timeout: 60 * 1000,
  outputDir: 'reports/test-results',   
  retries:2,
  globalSetup:'./src/auth/global.setup.js',
  reporter: [
    ['allure-playwright', { resultsDir: 'reports/allure-results' }]
  ],  

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
      name: 'api-chromium',
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
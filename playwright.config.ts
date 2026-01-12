import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 30 * 1000,
  reporter: "allure-playwright",
  use: {
    headless: true,       // must be false to see maximized window
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    ignoreHTTPSErrors: true,
    viewport: null,        // full window size
  },
  projects: [
    {
      name: 'chromium',
      use: {
        browserName: 'chromium',
        launchOptions: {
          args: ['--start-maximized'], // launch maximized
        },
        screenshot:"on",
        video:"on"
      },
    },
  ],
});

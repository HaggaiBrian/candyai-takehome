import { defineConfig } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  testDir: 'src/tests',
  use: {
     baseURL: 'https://fcedgmdaekj-olcffeha-pr-3237-ed9b8bb7f151.herokuapp.com/',
    ignoreHTTPSErrors: true,
    screenshot: 'only-on-failure',
  },
  projects: [
    {
      name: 'Desktop Chrome',
      use: {
        browserName: 'chromium',
        viewport: { width: 1920, height: 1080 },
        headless: true,
      },
    },
    // {
    //   name: 'Mobile Safari',
    //   use: {
    //     ...devices['iPhone 12 Pro'],
    //     browserName: 'webkit',
    //     headless: true,
    //   },
    // },
  ],
});

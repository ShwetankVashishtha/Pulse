// @ts-check
const { defineConfig, devices } = require('@playwright/test');
import dotenv from "dotenv";

dotenv.config();

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */

/**
 * @see https://playwright.dev/docs/test-configuration
 */
module.exports = defineConfig({
  testDir: './tests', // Specify test directory
  fullyParallel: false, // Run tests in files in parallel
  forbidOnly: !!process.env.CI, // Fail the build on CI if `test.only` is left in the source code
  retries: process.env.CI ? 1 : 1, // Retry on CI only
  workers: process.env.CI ? 1 : 1, // Opt out of parallel tests on CI
  reporter: 'html', // reporter configs

  // Shared settings for all projects
  use: {
    // Collect trace when retrying a failed test
    trace: 'on-first-retry',
  },

  // Configure projects for major browsers
  projects: [
    /* Test against desktop browsers */
    {
      name: 'Edge',
      use: {
        ...devices['Desktop Edge'],
        channel: 'msedge',
        headless: false,
        bypassCSP: true,
        launchOptions: {
          args: [
            '--disable-web-security',
            '--allow-running-insecure-content',
          ],
        },
      },
    },
    {
      name: 'Chrome',
      use: {
        ...devices['Desktop Chrome'],
        channel: 'chrome',
        headless: false,
        bypassCSP: true,
        launchOptions: {
          args: [
            '--disable-web-security',
            '--allow-running-insecure-content',
          ],
        },
      },
    },
  ],
});

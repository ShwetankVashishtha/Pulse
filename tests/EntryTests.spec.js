const { test, expect } = require('@playwright/test'); // Import Playwright test functions
const { EntryPage } = require('../pages/EntryPage.spec'); // Import the EntryPage class for interacting with the login and signup pages

test.setTimeout(60000); // Set a global timeout for tests (60 seconds)

let entryPage; // Declare variable for the EntryPage instance

// Set up the environment before each test
test.beforeEach(async ({ page }) => {
  entryPage = new EntryPage(page); // Create an instance of the EntryPage class to access login and signup functionalities
});

// Clean up after each test by closing the page to ensure a clean state
test.afterEach(async ({ page }) => {
  await page.close(); // Close the browser page to release resources and ensure clean state between tests
});

// Suite of tests for verifying entry points in the application
test.describe('Entry Tests Suite', () => {
  test.describe.configure({ retries: 0 });

  // Test to verify visibility of the login page
  test('TA-24 | Verify Login page visibility', { tag: '@smoke' }, async ({ page }) => {

    await entryPage.access_aut_url();
    await entryPage.verifyLoginPageVisibility();
  });

  // Test to verify visibility of the sign-up page
  test('TA-24 | Verify Sign up page visibility', { tag: '@smoke' }, async ({ page }) => {
    await entryPage.clickSignUpButton();
    await entryPage.verifySignUpPageVisibility();
  });

  // Test to verify the visibility of the forgot password page
  test('TA-24 | Verify Forgot password page visibility', { tag: '@smoke' }, async ({ page }) => {
    await entryPage.clickSignUpButton();
    await entryPage.clickSigninButton();
    await entryPage.verifyLoginPageVisibility();
  });

  // Test to verify the sign-in button on the sign-up page
  test('TA-24 | Verify Sign in button on Sign up page', { tag: '@smoke' }, async ({ page }) => {
    await entryPage.access_aut_url();
    await entryPage.clickForgotPasswordButton();
    await entryPage.verifyForgotPasswordPageVisibility();
  });

  // Test to verify visibility of the login page
  test('TA-7 | Verify login page has different options', { tag: '@smoke' }, async ({ page }) => {

    entryPage = new EntryPage(page); // Creating instance of entryPage class

    await entryPage.access_aut_url();
    await expect(entryPage.email).toBeVisible({ timeout: 10000 });
    await expect(entryPage.password).toBeVisible();
    await expect(entryPage.continueWithGoogleButton).toBeVisible();
    await expect(entryPage.continueWithFacebookButton).toBeVisible();
    await expect(entryPage.signUpBtn).toBeVisible();
    await expect(entryPage.dontHaveAccountLabel).toBeVisible();
    await expect(entryPage.termsOfServicesLink).toBeVisible();
    await expect(entryPage.privacyPolicyLink).toBeVisible();
  });
});

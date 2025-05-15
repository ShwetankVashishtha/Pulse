const { expect } = require('@playwright/test');
const { RepurposeUtils } = require('../commons/RepurposeUtils.spec'); // Import repurpose project utility class

// EntryPage class for handling interactions on the entry pages of the application
exports.EntryPage = class EntryPage {
  /**
  * @param {import('@playwright/test').Page} page - The Playwright page object.
  * @param {import('@playwright/test').BrowserContext} context - The browser context.
  */

  constructor(page) {
    this.page = page; // Store the Playwright page object
    this.repurposeUtils = new RepurposeUtils(this.page); // Instantiate RepurposeUtils class

    // Elements on the Entry page
    this.email = page.getByPlaceholder('Enter email address');
    this.password = page.getByPlaceholder('Your Password');
    this.signInBtn = page.getByRole('button', { name: 'Sign In' });
    this.signUpBtn = page.getByRole('link', { name: 'Sign up for free' });
    this.dontHaveAccountLabel = page.getByText("Don't have an account?");
    this.termsOfServicesLink = page.getByText("Terms of service");
    this.privacyPolicyLink = page.getByText("Privacy policy");
    this.dontHaveAccountLabel = page.getByText("Don't have an account?");
    this.signUpPageHeading = page.getByRole('heading', { name: 'Sign up for free' });
    this.loginPageHeading = page.getByRole('heading', { name: 'Welcome back!' });
    this.signInButton = page.getByRole('link', { name: 'Sign in' });
    this.forgotPassword = page.getByRole('link', { name: 'Forgot your password?' });
    this.forgotPasswordHeading = page.getByRole('heading', { name: 'Reset your password' });
    this.announcementsBanner = "//div[@class='Frill_Notification_Banner__Content']";
    this.viewAnnouncementBtn = page.locator("//button[@class='Frill_Notification__Button']");
    this.iframeLocator = page.frameLocator("//iframe[@class='Frill_Frame']");
    this.iframeCloseButton = this.iframeLocator.locator("//button[@aria-label='Close']");
    this.continueWithGoogleButton = page.getByText('Continue with Google');
    this.continueWithFacebookButton = page.getByText('Continue with Facebook');
    this.signUpWithEmailButton = page.getByText('Sign Up with Email');
    this.signupemailTextBox = page.locator("//input[@placeholder='Enter your email to continue']");
    this.loginFailedMessage = page.getByText('Email or Password is incorrect');
    this.workflowsHeader = page.locator("//p[text()='Workflows']");
    this.googleEmailTextBox = page.locator("#identifierId");
    this.googleNextBtn = page.locator("//span[text()='Next']/..");
    this.googlePasswordNextBtn = page.locator("#passwordNext");
    this.googlePasswordTextBox = page.locator("//input[@name='Passwd']");
    this.confirmationEmailOption = page.locator("//div[contains(text(),'Confirm your recovery email')]");
    this.confirmationEmailTextBox = page.locator("#knowledge-preregistered-email-response");
    this.continueButton = page.locator("//span[text()='Continue']/..");
  }

  // Navigates to the application's URL specified in the environment config
  async access_aut_url() {
    await this.page.goto(process.env.ENVIRONMENT);
    await this.page.waitForLoadState();
  }

  // Clicks the Sign Up button to navigate to the Sign Up page
  async clickSignUpButton() {
    await this.access_aut_url();
    await this.signUpBtn.click();
    await this.page.waitForLoadState();
  }

  // Clicks the Sign In button to navigate to the Login page
  async clickSigninButton() {
    await this.signInButton.click();
    await this.page.waitForLoadState();
  }

  // Clicks the Forgot Password link to navigate to the password reset page
  async clickForgotPasswordButton() {
    await this.page.waitForLoadState();
    await this.forgotPassword.click();
    await this.page.waitForLoadState();
  }

  // Verifies that the Sign Up page is visible
  async verifySignUpPageVisibility() {
    await expect(this.signUpPageHeading).toBeVisible();
  }

  // Verifies that the Login page is visible
  async verifyLoginPageVisibility() {
    await expect(this.loginPageHeading).toBeVisible();
  }

  // Verifies that the Forgot Password page is visible
  async verifyForgotPasswordPageVisibility() {
    await expect(this.forgotPasswordHeading).toBeVisible();
  }

  /**
   * Clicks the 'Continue with Facebook' button to initiate the Facebook login.
   */
  async continueWithFacebook() {
    await this.continueWithFacebookButton.click();
  }

  /**
   * Enters the recovery email if the confirmation email option is visible.
   * 
   * @param {string} recoveryEmail - The recovery email address to be filled in.
   */
  async enterRevoveryEmail(recoveryEmail) {
    if (await this.confirmationEmailOption.isVisible()) {
      await this.confirmationEmailOption.click();
      await this.page.waitForLoadState();
      await this.confirmationEmailTextBox.fill(recoveryEmail);
      await this.googleNextBtn.click();
      await this.page.waitForLoadState();
    }
  }
};
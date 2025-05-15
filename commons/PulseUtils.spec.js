import { expect } from '@playwright/test';

/**
 * Utility class providing common actions for workflows in the application.
 * It includes methods for waiting, refreshing, navigating, and handling page elements.
 */
export class PulseUtils {

    /**
     * Constructor to initialize the page object and other utility locators
     * @param {import('@playwright/test').Page} page - The Playwright page instance.
     */
    constructor(page) {
        this.page = page; // Assign the Playwright page to the class instance
        this.loadingIndicatorLocatorString = "//*[contains(text(), 'Loading')]"; // XPath for the loading indicator
        this.loadingIndicator = this.page.locator(this.loadingIndicatorLocatorString);
    }

    /**
     * Wait for a specific amount of time (in milliseconds)
     * @param {number} milliseconds - Duration to wait in milliseconds.
     */
    async waitForSpecificTime(milliseconds) {
        // Wait for the specified time (in milliseconds)
        await this.page.waitForTimeout(milliseconds);
    }

    /**
     * Refresh the current page and wait for it to load completely
     */
    async refreshPage() {
        // Reload the current page
        await this.page.reload();

        // Wait for the page to load completely after reload
        await this.page.waitForLoadState("load");
    }

    /**
     * Navigate back to the previous page in the browser's history and wait for it to load completely
     */
    async back() {
        // Navigate back to the previous page in the browser's history
        await this.page.goBack();

        // Wait for the page to load completely after navigating back
        await this.page.waitForLoadState();
    }

    /**
     * Wait for the loading indicator to be visible on the page
     */
    async waitForLoadingIndicatorToBeVisible() {
        // Call helper function to wait for the loading indicator element to be visible
        await this.waitForElementToBeVisible(this.loadingIndicatorLocatorString);
    }

    /**
     * Wait for the loading indicator to be hidden, indicating that the page has finished loading
     */
    async waitForLoadingToBeCompleted() {
        // Call helper function to wait for the loading indicator element to be hidden
        await this.waitForElementToBeHidden(this.loadingIndicatorLocatorString);
    }

    /**
     * Wait for a specific element to be hidden on the page
     * @param {string} locatorString - The XPath or selector string for the element to wait for.
     */
    async waitForElementToBeHidden(locatorString) {
        // Wait until the specified element is hidden
        await this.page.waitForSelector(locatorString, {
            state: 'hidden',   // Wait for the element to be hidden
            timeout: 90000      // Set a timeout of 90 seconds
        });
    }

    /**
     * Wait for a specific element to be detached from the page
     * @param {string} locatorString - The XPath or selector string for the element to wait for.
     */
    async waitForElementToBeDetached(locatorString) {
        // Wait until the specified element is detached from the DOM
        await this.page.waitForSelector(locatorString, {
            state: 'detached',  // Wait for the element to be detached
            timeout: 90000      // Set a timeout of 90 seconds
        });
    }

    /**
     * Wait for a specific element to be visible on the page
     * @param {string} locatorString - The XPath or selector string for the element to wait for.
     */
    async waitForElementToBeVisible(locatorString) {
        await this.page.waitForSelector(locatorString, { state: 'visible', timeout: 90000 });
    }

    /**
     * Wait for a specific element to contain specific text
     * @param {string} locatorString - The XPath or selector string for the element to wait for.
     * @param {string} text - The text content to be checked for.
     */
    async waitForElementToContainText(locatorString, text) {
        const element = this.page.locator(locatorString);
        await expect(element).toContainText(text);
    }

    /**
     * Click on an element specified by its locator after ensuring the element is visible and enabled
     * @param {string} locatorString - The XPath or selector string for the element to click.
     */
    async clickElement(locatorString) {
        await this.page.waitForLoadState();
        // Ensure the element is visible and enabled before clicking
        await this.waitForElementToBeVisible(locatorString);
        const element = this.page.locator(locatorString);
        await element.click();
        await this.page.waitForLoadState();
    }

    /**
     * Type a string into an input element specified by its locator after ensuring the element is visible and enabled
     * @param {string} locatorString - The XPath or selector string for the element to type into.
     * @param {string} text - The text to type into the input.
     */
    async typeText(locatorString, text) {
        await this.page.waitForLoadState();
        // Ensure the element is visible and enabled before typing
        await this.waitForElementToBeVisible(locatorString);
        const element = this.page.locator(locatorString);
        await element.fill(text);
        await this.page.waitForLoadState();
    }

    /**
     * Clear an input element and type new text after ensuring the element is visible and enabled
     * @param {string} locatorString - The XPath or selector string for the element.
     * @param {string} text - The text to type into the input.
     */
    async clearAndTypeText(locatorString, text) {
        await this.page.waitForLoadState();
        // Ensure the element is visible and enabled before typing
        await this.waitForElementToBeVisible(locatorString);
        const element = this.page.locator(locatorString);
        await element.fill(''); // Clear the input
        await element.fill(text); // Type the new text
        await this.page.waitForLoadState();
    }

    /**
     * Select a value from a dropdown element by visible text after ensuring the element is visible and enabled
     * @param {string} locatorString - The XPath or selector string for the dropdown element.
     * @param {string} optionText - The text of the option to select.
     */
    async selectDropdownByText(locatorString, optionText) {
        // Ensure the element is visible and enabled before selecting
        await this.waitForElementToBeVisible(locatorString);
        const element = this.page.locator(locatorString);
        await element.selectOption({ label: optionText });
        await this.page.waitForLoadState();
    }

    /**
     * Check a checkbox after ensuring the element is visible and enabled
     * @param {string} locatorString - The XPath or selector string for the checkbox element.
     */
    async checkCheckbox(locatorString) {
        // Ensure the element is visible and enabled before interacting
        await this.waitForElementToBeVisible(locatorString);

        const checkbox = this.page.locator(locatorString);
        await checkbox.check();
        await this.page.waitForLoadState();
    }

    /**
     * Uncheck a checkbox after ensuring the element is visible and enabled
     * @param {string} locatorString - The XPath or selector string for the checkbox element.
     */
    async uncheckCheckbox(locatorString) {
        // Ensure the element is visible and enabled before interacting
        await this.waitForElementToBeVisible(locatorString);

        const checkbox = this.page.locator(locatorString);
        await checkbox.uncheck();
        await this.page.waitForLoadState();
    }

    /**
     * Upload a file using an input element after ensuring the element is visible and enabled
     * @param {string} locatorString - The XPath or selector string for the input element.
     * @param {string} filePath - The file path of the file to upload.
     */
    async uploadFile(locatorString, filePath) {
        // Ensure the element is visible and enabled before interacting
        await this.waitForElementToBeVisible(locatorString);

        const fileInput = this.page.locator(locatorString);
        await fileInput.setInputFiles(filePath);
    }

    /**
     * Get the text content of an element specified by its locator
     * @param {string} locatorString - The XPath or selector string for the element.
     * @returns {Promise<string>} - The text content of the element.
     */
    async getTextContent(locatorString) {
        await this.page.waitForLoadState();
        // Ensure the element is visible before extracting text
        await this.waitForElementToBeVisible(locatorString);

        const element = this.page.locator(locatorString);
        return await element.textContent();
    }

    /**
     * Handle an alert dialog by accepting it
     */
    async acceptAlert() {
        this.page.on('dialog', async (dialog) => {
            await dialog.accept();
        });
    }

    /**
     * Handle an alert dialog by dismissing it
     */
    async dismissAlert() {
        this.page.on('dialog', async (dialog) => {
            await dialog.dismiss();
        });
    }

    /**
     * Scroll the page to a specific element
     * @param {string} locatorString - The XPath or selector string for the element.
     */
    async scrollToElement(locatorString) {
        // Ensure the element is visible before scrolling
        await this.waitForElementToBeVisible(locatorString);

        const element = this.page.locator(locatorString);
        await element.scrollIntoViewIfNeeded();
    }

    /**
    * Hover over a specific element specified by its locator after ensuring the element is visible and enabled.
    * @param {string} locatorString - The XPath or selector string for the element to hover over.
    */
    async hoverOverElement(locatorString) {
        await this.page.waitForLoadState();
        // Ensure the element is visible and enabled before hovering
        await this.waitForElementToBeVisible(locatorString);
        const element = this.page.locator(locatorString);
        await element.hover();
    }
}

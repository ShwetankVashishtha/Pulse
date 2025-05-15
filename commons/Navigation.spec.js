const { expect } = require('@playwright/test');
const { PulseUtils } = require('../commons/PulseUtils.spec');

/**
 * Page Object Model for navigation actions within the application.
 * Provides methods to navigate to different sections like Settings, Connections, Workflows, and Library.
 */
exports.Navigation = class Navigation {

    /**
     * Constructor for initializing locators for various page elements in the navigation menu.
     * @param {import('@playwright/test').Page} page - The Playwright page object.
     */
    constructor(page) {
        this.page = page;
        this.pulseUtils = new PulseUtils(this.page); // Instantiate PulseUtils class

        // Locators for elements in the navigation menu
        this.viewContnet = page.getByRole('table').locator('div').filter({ hasText: 'View Content' }).locator('div').getByRole('button');
        this.userNameButtonLocatorString = "//button[@data-testid='flowbite-popover-target']";
        this.userNameButton = page.locator(this.userNameButtonLocatorString);
        this.setting = page.getByText("My Settings");
        this.Workspacesetting = page.getByText("Workspace settings");
        this.myProfilePageHeaderText = page.locator("//div/div/div/p[text() = 'My Profile']");
        this.generalPageHeaderText = page.locator("//div/div/div/p[text() = 'General settings']");
        this.connections = page.locator("//span/li/a[descendant::span[contains(text(), 'Connections')]]");
        this.connectionsPageHeaderText = page.locator("(//div[contains(text(), 'Connections')])[1]");
        this.workflows = page.locator("//span[text()='Workflows']");
        this.workflowsPageHeaderText = page.locator("(//p[contains(text(), 'Workflows')])[1]");
        this.library = page.locator("//span/li/a[descendant::span[contains(text(), 'Library')]]");
        this.libraryPageHeaderText = page.locator("(//p[contains(text(), 'Library')])[1]");
        this.memberMenuLocatorString = "(//div[text()='Members'])[1]";
        this.memberMenu = page.locator(this.memberMenuLocatorString);
        this.membersPageLocatorString = "//p[text()='Manage members in this workspace']";
        this.membersPage = page.locator(this.membersPageLocatorString);
        this.logout = "//div[text()='Log Out']";
        this.logoutBtn = page.locator(this.logout);
        this.anotherWorkspaceBtn = page.locator("//*[contains(text(),'Switch to Another Workspace')]");
        this.backBtn = page.locator("//div[text()='Back']");
        this.automationTestWorkspace = page.locator("//div[contains(text(),'Automation Test New')]");
    }

    /**
     * Navigates to the Settings page and verifies that the profile page header is visible.
     */
    async navigateToSetting() {
        // Click on the 'Setting' menu item and wait for the page to 
        await this.page.waitForLoadState();
        await this.pulseUtils.waitForElementToBeVisible(this.userNameButtonLocatorString);
        await this.userNameButton.click();
        await this.setting.click();
        await this.page.waitForLoadState();

        // Verify that the 'My Profile' header text is visible
        await expect(this.myProfilePageHeaderText).toBeVisible({ timeout: 30000 });
    }
    /**
    * Navigates to the Settings page and verifies that the profile page header is visible.
    */
    async navigateToWorkspaceSetting() {
        // Click on the 'Setting' menu item and wait for the page to load
        await this.pulseUtils.waitForElementToBeVisible(this.userNameButtonLocatorString);
        await this.userNameButton.click();
        await this.Workspacesetting.waitFor({ state: 'visible' });
        await this.Workspacesetting.click();
        await this.page.waitForLoadState();

        // Verify that the 'My Profile' header text is visible
        await expect(this.generalPageHeaderText).toBeVisible();
    }

    /**
     * Navigates to the Connections page and verifies that the connections page header is visible.
     */
    async navigateToConnections() {
        // Click on the 'Connections' menu item and wait for the page to load
        await expect(this.connections).toBeVisible({ timeout: 30000 });
        await this.connections.click();
        await this.page.waitForLoadState('load');

        // Verify that the 'Connections' header text is visible
        await expect(this.connectionsPageHeaderText).toBeVisible({ timeout: 30000 });
    }

    /**
     * Navigates to the Workflows page and verifies that the workflows page header is visible.
     */
    async navigateToWorkflows() {
        // Click on the 'Workflows' menu item and wait for the page to load
        await this.page.waitForLoadState();
        await this.workflows.click();
        await this.page.waitForLoadState();
        
        // Verify that the 'Workflows' header text is visible
        await expect(this.workflowsPageHeaderText).toBeVisible({ timeout: 30000 });
    }

    /**
     * Navigates to the Library page and verifies that the library page header is visible.
     */
    async navigateToLibrary() {
        // Click on the 'Library' menu item and wait for the page to load
        await this.library.click();
        await this.page.waitForLoadState();

        // Verify that the 'Library' header text is visible
        await expect(this.libraryPageHeaderText).toBeVisible();
    }

    /**
     * Navigates to the Settings page and verifies that the workspace page is visible.
     */
    async navigateToWorkspaceMember() {
        // Click on the 'Setting' menu item and wait for the page to load
        await this.pulseUtils.waitForElementToBeVisible(this.memberMenuLocatorString);
        await this.memberMenu.click();
        await this.pulseUtils.waitForElementToBeVisible(this.membersPageLocatorString);
        await expect(this.membersPage).toBeVisible();
    }

    /** 
     * Function to navigate to another workspace
     */
    async navigateToAnotherWorkSpace(workSpaceName) {
        await this.pulseUtils.waitForElementToBeVisible(this.userNameButtonLocatorString);
        await this.userNameButton.click();
        await this.page.waitForLoadState();
        await this.anotherWorkspaceBtn.click();
        await this.page.waitForLoadState();
        await this.automationTestWorkspace.click({ force: true });
        await this.page.waitForLoadState();
        await this.backBtn.click();
        await this.Workspacesetting.click();
        await this.page.waitForLoadState();
    }

    /** 
     * Function to log out from the application
     */
    async logoutFromApp() {
        await this.pulseUtils.waitForElementToBeVisible(this.userNameButtonLocatorString);
        await this.userNameButton.click();
        await this.logoutBtn.click();
        await this.page.waitForLoadState();
    }
}
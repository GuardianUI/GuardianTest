import { test } from "@guardianui/test";

test.describe("Olympus", () => {
    test("Should stake OHM to gOHM", async ({ page, gui }) => {
        // Initialize fork
        await gui.initializeChain(1);

        // Navigate to site
        await page.goto("https://app.olympusdao.finance/#/stake");

        // Set up wallet
        await gui.setEthBalance("100000000000000000000000");
        await gui.setAllowance("0x64aa3364f17a4d01c6f1751fd97c2bd3d7e7f1d5", "0xb63cac384247597756545b500253ff8e607a8020", "1000000000000000000000000");
        await gui.setBalance("0x64aa3364f17a4d01c6f1751fd97c2bd3d7e7f1d5", "1000000000000000000000000");

        // Clear any info modals
        let infoModalIsVisible = await page.isVisible("text=Did You Know?");
        if (infoModalIsVisible) {
            await page.locator("[id='root']").click({ position: {x: 0, y: 0}, force: true });
        }

        await page.waitForSelector("text=Connect Wallet");
        await page.locator("text=Connect Wallet").first().click();
        await page.waitForSelector("text=Connect Wallet");
        await page.locator("text=Connect Wallet").first().click();
        await page.locator("text=Metamask").first().click();
        await page.locator("[id='root']").click({ position: {x: 0, y: 0}, force: true });

        // Enter OHM input amount
        await page.locator("[data-testid='ohm-input']").type("0.1");

        // Execute stake
        await page.waitForSelector("[data-testid='submit-button']");
        await page.locator("[data-testid='submit-button']").click();

        // Sign checkbox transaction
        await page.waitForSelector("[class='PrivateSwitchBase-input css-1m9pwf3']");
        await page.locator("[class='PrivateSwitchBase-input css-1m9pwf3']").click();

        // Submit stake transaction
        await gui.validateContractInteraction("[data-testid='submit-modal-button']", "0xb63cac384247597756545b500253ff8e607a8020");
    });
});

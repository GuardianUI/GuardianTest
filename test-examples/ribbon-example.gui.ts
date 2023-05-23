import { test } from "@guardianui/test";

test.describe("Ribbon Uni Deposit", () => {
    test("Should deposit UNI into the Ribbon UNI Covered Call Vault", async ({ page, gui }) => {
        // Initialize fork
        await gui.initializeChain(1);
        
        // Navigate to site
        await page.goto("https://app.ribbon.finance/v2/theta-vault/T-UNI-C");

        // Mocking
        await gui.setEthBalance("100000000000000000000000");
        await gui.setBalance("0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984", "1000000000000000000000");

        // Connect wallet
        let needToConnect = await page.isVisible("text=Connect Wallet");
        if (needToConnect) {
            await page.waitForSelector("text=Connect Wallet");
            await page.locator("text=Connect Wallet").first().click();
            await page.locator("span:has-text('Ethereum')").click();
            await page.locator("div[role='button']:has-text('Next')").click();
            await page.locator("span:has-text('METAMASK')").click();
            await page.locator("text=Connect WalletMETAMASKWALLET CONNECTCOINBASE WALLETConnectLearn more about walle >> div[role='button'] >> nth=3").click();
        }

        // Wait for site to recognize UNI balance
        await page.waitForSelector("text=1,000 UNI");

        // Enter UNI amount
        await page.waitForSelector("input[placeholder='0']");
        await page.locator("input[placeholder='0']").first().type("1");

        // Click preview deposit button
        await page.waitForSelector("button:has-text('Preview Deposit')");
        await page.locator("button:has-text('Preview Deposit')").first().click();

        // Click approve UNI button and verify contract target
        await gui.validateContractInteraction("button:has-text('Approve UNI') >> visible=true", "0xDD9d1B7dEaB1A843A1B584d2CA5903B8A4735deF");
    });
});

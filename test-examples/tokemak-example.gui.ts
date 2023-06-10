import { test } from "@guardianui/test";

test.describe("Tokemak", () => {
    test("Should deposit USDC to USDC Reactor", async ({ page, gui }) => {
        // Initialize fork
        await gui.initializeChain(1);

        // Navigate to site
        await page.goto("https://app.tokemak.xyz/");

        // Mocking
        await gui.setEthBalance("100000000000000000000000");
        await gui.setBalance("0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48", "1000000000000000000000");

        // Connect wallet
        await page.waitForSelector("button:has-text('CONNECT WALLET')");
        await page.locator("button:has-text('CONNECT WALLET')").click();

        await page.waitForSelector("#modal-root >> text=Metamask");
        await page.locator("#modal-root >> text=Metamask").click();

        // Navigate to USDC Pair Reactor
        await page.waitForSelector("span:has-text('USDC')");
        await page.locator("span:has-text('USDC')").first().click();

        // Enter USDC input amount
        await page.waitForSelector("input[placeholder='0'] >> nth=0");
        await page.locator("input[placeholder='0'] >> nth=0").first().type("1");

        // Click deposit button
        await page.waitForSelector("#modal-root >> button:has-text('APPROVE USDC')");
        await gui.validateContractInteraction("#modal-root >> button:has-text('APPROVE USDC')", "0x04bDA0CF6Ad025948Af830E75228ED420b0e860d");
    });
});

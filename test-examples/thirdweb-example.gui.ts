import { test } from "@guardianui/test";

test.describe("Third Web Demo", () => {
    test("Should approve USDC", async ({ page, gui }) => {

        // Initialize fork
        await gui.initializeChain(1);

        // Navigate to site
        await page.goto("https://third-web-demo.vercel.app/");

        // Mocking
        await gui.setEthBalance("100000000000000000000000");
        await gui.setBalance("0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48", "1000000000000000000000");

        // Connect wallet
        await page.goto("https://third-web-demo.vercel.app/");
        await page.locator("text=Connect Wallet").first().click();
        await page.locator("text=Metamask").first().click();

        // Approve USDC
        await page.locator("text=Approve USDC").first().click();
        await gui.validateContractInteraction("button:has-text('Approve USDC')", "0x46035c9c08bdc765ffa7f49a602260dd9852c3e5");
    });
});

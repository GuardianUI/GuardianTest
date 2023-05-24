import { test } from "@guardianui/test";

test.describe("Bond Protocol", () => {
    test("Should create Fixed Term market", async ({ page, gui }) => {
        // Initialize fork
        await gui.initializeChain(1);

        // Go to bond protocol
        await page.goto("https://app.bondprotocol.finance/#/create");

        // Mocking
        await gui.setEthBalance("100000000000000000000000");
        await gui.setBalance("0x6b175474e89094c44da98b954eedeac495271d0f", "100000000000000000000000");

        // Select DAI as payout token
        await page.waitForSelector("input[id='cm-payout-token-picker']");
        await page.locator("input[id='cm-payout-token-picker']").first().click();
        await page.waitForSelector("text=DAI");
        await page.locator("text=DAI").first().click();

        // Select DAI as output token
        await page.waitForSelector("input[id='cm-quote-token-picker']");
        await page.locator("input[id='cm-quote-token-picker']").first().click();
        await page.waitForSelector("text=DAI");
        await page.locator("text=DAI").first().click();

        // Select vesting term
        await page.waitForSelector("button[id='cm-vesting-picker']");
        await page.locator("button[id='cm-vesting-picker']").first().click();
        await page.waitForSelector("text=7 days");
        await page.locator("text=7 days").first().click();

        // Enter capacity
        await page.waitForSelector("input[id='cm-capacity-picker']");
        await page.locator("input[id='cm-capacity-picker']").first().fill("100");

        // Select end date
        await page.waitForSelector("input[id='cm-end-date-picker']");
        await page.locator("input[id='cm-end-date-picker']").first().click();
        await page.waitForSelector("input[placeholder='Enter the amount of days to run the market']");
        await page.locator("input[placeholder='Enter the amount of days to run the market']").first().fill("1");
        await page.locator("button:has-text('Select')").first().click();

        // Open market submission modal
        await page.waitForSelector("button[id='cm-pre-submit']");
        await page.locator("button[id='cm-pre-submit']").first().click();

        // Confirm deployment
        await page.waitForSelector("button[id='cm-confirm-modal-submit-allowance']");
        await gui.validateContractInteraction("button[id='cm-confirm-modal-submit-allowance']", "0x007f7735baf391e207e3aa380bb53c4bd9a5fed6");
    });
});

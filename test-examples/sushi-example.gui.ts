import { test, utils } from "@guardianui/test";

test.describe("Swap", () => {
    test.use({ actionTimeout: 120000 });

    test("Should swap ETH for USDC", async ({ page, gui }) => {
        // Sushi relayer support is not natively built into GuardianTest at the moment, implementing here
        page.route("https://api.sushirelay.com/v1", async (route, request) => {
            if (request.method() === "POST") {
                try {
                    // Parse the request data to pull out RPC method and params
                    const data = JSON.parse(request.postData() as string);

                    // Handle different request types
                    let updatedData;
                    if (data.length && data[0].method !== undefined) {
                        updatedData = await utils.handleArrayRequest(page, data);
                    } else if (!data.length && data.method !== undefined) {
                        updatedData = await utils.handleSingleRequest(page, data);
                    } else {
                        console.log("Problematic request data structure: " + JSON.stringify(data));
                        throw new Error("Invalid RPC request data");
                    }

                    // Fulfill the request with the updated data
                    route.fulfill({
                        contentType: "application/json",
                        body: JSON.stringify(updatedData)
                    });
                } catch (e) {
                    console.log("Error fulfilling request: " + e);
                    route.continue();
                }
            } else {
                route.continue();
            }
        });

        // Initialize fork
        await gui.initializeChain(1, 17387626);

        // Navigate to site
        await page.goto("https://app.sushi.com/swap?inputCurrency=ETH&outputCurrency=0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48");

        // Mocking
        await gui.setEthBalance("100000000000000000000000");
        await page.reload();

        // Connect wallet
        await page.waitForSelector("div[id='web3-status-connected']");
        await page.locator("div[id='web3-status-connected']").first().click();
        await page.waitForSelector("button:has-text('Change')");
        await page.locator("button:has-text('Change')").first().click();
        await page.waitForSelector("div[id='wallet-option-MetaMask']");
        await page.locator("div[id='wallet-option-MetaMask']").first().click();
        await page.locator("[id='__next']").click({ position: {x: 0, y: 0}, force: true });

        // Enter ETH amount
        await page.waitForSelector("input[title='Token Amount']");
        await page.locator("input[title='Token Amount']").first().fill("1");

		// Wait for ETH value to be set
        await page.waitForSelector("text=100000");

		// Check that ETH amount is recognized
		const isETHSet = await page.isVisible("text=100000");
		console.log("isETHSet: " + isETHSet);

		await page.waitForTimeout(1500);

        await page.waitForSelector("button[id='swap-button']");
		await page.locator("button[id='swap-button']").first().click();
		await page.waitForSelector("button[id='confirm-swap-or-send']");
		await gui.validateContractInteraction("button[id='confirm-swap-or-send']", "0xd9e1cE17f2641f24aE83637ab66a2cca9C378B9F");
    });
});

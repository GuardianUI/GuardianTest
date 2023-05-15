import { expect, Page, test as base } from "@playwright/test";
import { GUI } from "../models/GUI";
import { isArbiRPC, isMainnetRPC, isOptiRPC, isPolyRPC } from "../configuration";
import { ethers } from "ethers";

export interface TestProps {
    page: Page;
    GUI: GUI;
}

/**
 * Extend base test to inject a wallet, the GUI page object model, and redirect RPC requests to Anvil
 */
export const test = base.extend<{ gui: GUI }>({
    bypassCSP: true, // Bypass site content security policies to be able to avoid issues redirecting RPC requests to Anvil
    actionTimeout: 30000, // Add a per-action timeout of 30 seconds to allow the tests to fail faster than the per-test 90 second timeout if a test is stuck
    gui: async ({ page }, use) => {
        const gui = new GUI(page);

        // Inject a wallet object to window.ethereum
        await page.addInitScript({ path: "provider/provider.js" });

        // Intercept RPC requests
        await page.route(isMainnetRPC, async (route, request) => {
            // If current network is not Ethereum mainnet, continue the request to the original provider
            try {
                const chainId: string = await page.evaluate("window.ethereum.chainId");

                if (chainId != "1") {
                    route.continue();
                    return;
                } else {
                    // Parse the request data to pull out RPC method and params
                    const data = JSON.parse(request.postData() as string);

                    // Set up provider object to interact with
                    const providerUrl: string = await page.evaluate("window.ethereum.provider.connection.url");
                    const provider = new ethers.providers.JsonRpcProvider(providerUrl, parseInt(chainId));

                    // Send the RPC request to Anvil and record the response
                    const resultData = await provider.send(data.method, data.params);

                    const updatedData = {
                        "jsonrpc": "2.0",
                        "id": data.id,
                        "result": resultData
                    };

                    // Fulfill the request with the updated data
                    route.fulfill({
                        contentType: "application/json",
                        body: JSON.stringify(updatedData)
                    });
                }
            } catch (e) {
                // If the RPC request fails, continue the request to the original provider
                route.continue();
            }
        });

        await page.route(isArbiRPC, async (route, request) => {
            // If current network is not Arbitrum, continue the request to the original provider
            try {
                const chainId: string = await page.evaluate("window.ethereum.chainId");

                if (chainId != "42161") {
                    route.continue();
                    return;
                } else {
                    // Parse the request data to pull out RPC method and params
                    const data = JSON.parse(request.postData() as string);

                    // Set up provider object to interact with
                    const providerUrl: string = await page.evaluate("window.ethereum.provider.connection.url");
                    const provider = new ethers.providers.JsonRpcProvider(providerUrl, parseInt(chainId));

                    // Send the RPC request to Anvil and record the response
                    const resultData = await provider.send(data.method, data.params);

                    const updatedData = {
                        "jsonrpc": "2.0",
                        "id": data.id,
                        "result": resultData
                    };

                    // Fulfill the request with the updated data
                    route.fulfill({
                        contentType: "application/json",
                        body: JSON.stringify(updatedData)
                    });
                }
            } catch (e) {
                // If the RPC request fails, continue the request to the original provider
                route.continue();
            }
        });

        await page.route(isOptiRPC, async (route, request) => {
            // If current network is not Optimism, continue the request to the original provider
            try {
                const chainId: string = await page.evaluate("window.ethereum.chainId");

                if (chainId != "10") {
                    route.continue();
                    return;
                } else {
                    // Parse the request data to pull out RPC method and params
                    const data = JSON.parse(request.postData() as string);

                    // Set up provider object to interact with
                    const providerUrl: string = await page.evaluate("window.ethereum.provider.connection.url");
                    const provider = new ethers.providers.JsonRpcProvider(providerUrl, parseInt(chainId));

                    // Send the RPC request to Anvil and record the response
                    const resultData = await provider.send(data.method, data.params);

                    const updatedData = {
                        "jsonrpc": "2.0",
                        "id": data.id,
                        "result": resultData
                    };

                    // Fulfill the request with the updated data
                    route.fulfill({
                        contentType: "application/json",
                        body: JSON.stringify(updatedData)
                    });
                }
            } catch (e) {
                // If the RPC request fails, continue the request to the original provider
                route.continue();
            }
        });

        await page.route(isPolyRPC, async (route, request) => {
            // If current network is not Polygon, continue the request to the original provider
            try {
                const chainId: string = await page.evaluate("window.ethereum.chainId");

                if (chainId != "137") {
                    route.continue();
                    return;
                } else {
                    // Parse the request data to pull out RPC method and params
                    const data = JSON.parse(request.postData() as string);

                    // Set up provider object to interact with
                    const providerUrl: string = await page.evaluate("window.ethereum.provider.connection.url");
                    const provider = new ethers.providers.JsonRpcProvider(providerUrl, parseInt(chainId));

                    // Send the RPC request to Anvil and record the response
                    const resultData = await provider.send(data.method, data.params);

                    const updatedData = {
                        "jsonrpc": "2.0",
                        "id": data.id,
                        "result": resultData
                    };

                    // Fulfill the request with the updated data
                    route.fulfill({
                        contentType: "application/json",
                        body: JSON.stringify(updatedData)
                    });
                }
            } catch (e) {
                // If the RPC request fails, continue the request to the original provider
                route.continue();
            }
        });

        await use(gui);
    },
});

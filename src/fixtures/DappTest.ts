import { expect, Page, test as base } from "@playwright/test";
import { GUI } from "../models/GUI";
import { handleArrayRequest, handleSingleRequest, isArbiRPC, isMainnetRPC, isOptiRPC, isPolyRPC } from "../utils";
import { ethers } from "ethers";
import { promises as fs} from "fs";
import * as path from "path";
import { exec } from "child_process";

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

                    // Handle different request types
                    let updatedData;
                    if (data.length && data[0].method !== undefined) {
                        updatedData = await handleArrayRequest(page, data);
                    } else if (!data.length && data.method !== undefined) {
                        updatedData = await handleSingleRequest(page, data);
                    } else {
                        console.log("Problematic request data structure: " + JSON.stringify(data));
                        throw new Error("Invalid RPC request data");
                    }

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

                    // Hanlde different request types
                    let updatedData;
                    if (data.length && data[0].method !== undefined) {
                        updatedData = await handleArrayRequest(page, data);
                    } else if (!data.length && data.method !== undefined) {
                        updatedData = await handleSingleRequest(page, data);
                    } else {
                        console.log("Problematic request data structure: " + JSON.stringify(data));
                        throw new Error("Invalid RPC request data");
                    }

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

                    // Hanlde different request types
                    let updatedData;
                    if (data.length && data[0].method !== undefined) {
                        updatedData = await handleArrayRequest(page, data);
                    } else if (!data.length && data.method !== undefined) {
                        updatedData = await handleSingleRequest(page, data);
                    } else {
                        console.log("Problematic request data structure: " + JSON.stringify(data));
                        throw new Error("Invalid RPC request data");
                    }

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

                    // Hanlde different request types
                    let updatedData;
                    if (data.length && data[0].method !== undefined) {
                        updatedData = await handleArrayRequest(page, data);
                    } else if (!data.length && data.method !== undefined) {
                        updatedData = await handleSingleRequest(page, data);
                    } else {
                        console.log("Problematic request data structure: " + JSON.stringify(data));
                        throw new Error("Invalid RPC request data");
                    }

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

        page.on("close", () => {
            exec("killall anvil");
        });

        await use(gui);
    },
});

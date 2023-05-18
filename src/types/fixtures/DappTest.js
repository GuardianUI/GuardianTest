"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.test = void 0;
const test_1 = require("@playwright/test");
const GUI_1 = require("../models/GUI");
const utils_1 = require("../utils");
const ethers_1 = require("ethers");
/**
 * Extend base test to inject a wallet, the GUI page object model, and redirect RPC requests to Anvil
 */
exports.test = test_1.test.extend({
    bypassCSP: true,
    actionTimeout: 30000,
    gui: ({ page }, use) => __awaiter(void 0, void 0, void 0, function* () {
        const gui = new GUI_1.GUI(page);
        // Inject a wallet object to window.ethereum
        yield page.addInitScript({ path: "provider/provider.js" });
        // Intercept RPC requests
        yield page.route(utils_1.isMainnetRPC, (route, request) => __awaiter(void 0, void 0, void 0, function* () {
            // If current network is not Ethereum mainnet, continue the request to the original provider
            try {
                const chainId = yield page.evaluate("window.ethereum.chainId");
                if (chainId != "1") {
                    route.continue();
                    return;
                }
                else {
                    // Parse the request data to pull out RPC method and params
                    const data = JSON.parse(request.postData());
                    // Set up provider object to interact with
                    const providerUrl = yield page.evaluate("window.ethereum.provider.connection.url");
                    const provider = new ethers_1.ethers.providers.JsonRpcProvider(providerUrl, parseInt(chainId));
                    // Send the RPC request to Anvil and record the response
                    const resultData = yield provider.send(data.method, data.params);
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
            }
            catch (e) {
                // If the RPC request fails, continue the request to the original provider
                route.continue();
            }
        }));
        yield page.route(utils_1.isArbiRPC, (route, request) => __awaiter(void 0, void 0, void 0, function* () {
            // If current network is not Arbitrum, continue the request to the original provider
            try {
                const chainId = yield page.evaluate("window.ethereum.chainId");
                if (chainId != "42161") {
                    route.continue();
                    return;
                }
                else {
                    // Parse the request data to pull out RPC method and params
                    const data = JSON.parse(request.postData());
                    // Set up provider object to interact with
                    const providerUrl = yield page.evaluate("window.ethereum.provider.connection.url");
                    const provider = new ethers_1.ethers.providers.JsonRpcProvider(providerUrl, parseInt(chainId));
                    // Send the RPC request to Anvil and record the response
                    const resultData = yield provider.send(data.method, data.params);
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
            }
            catch (e) {
                // If the RPC request fails, continue the request to the original provider
                route.continue();
            }
        }));
        yield page.route(utils_1.isOptiRPC, (route, request) => __awaiter(void 0, void 0, void 0, function* () {
            // If current network is not Optimism, continue the request to the original provider
            try {
                const chainId = yield page.evaluate("window.ethereum.chainId");
                if (chainId != "10") {
                    route.continue();
                    return;
                }
                else {
                    // Parse the request data to pull out RPC method and params
                    const data = JSON.parse(request.postData());
                    // Set up provider object to interact with
                    const providerUrl = yield page.evaluate("window.ethereum.provider.connection.url");
                    const provider = new ethers_1.ethers.providers.JsonRpcProvider(providerUrl, parseInt(chainId));
                    // Send the RPC request to Anvil and record the response
                    const resultData = yield provider.send(data.method, data.params);
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
            }
            catch (e) {
                // If the RPC request fails, continue the request to the original provider
                route.continue();
            }
        }));
        yield page.route(utils_1.isPolyRPC, (route, request) => __awaiter(void 0, void 0, void 0, function* () {
            // If current network is not Polygon, continue the request to the original provider
            try {
                const chainId = yield page.evaluate("window.ethereum.chainId");
                if (chainId != "137") {
                    route.continue();
                    return;
                }
                else {
                    // Parse the request data to pull out RPC method and params
                    const data = JSON.parse(request.postData());
                    // Set up provider object to interact with
                    const providerUrl = yield page.evaluate("window.ethereum.provider.connection.url");
                    const provider = new ethers_1.ethers.providers.JsonRpcProvider(providerUrl, parseInt(chainId));
                    // Send the RPC request to Anvil and record the response
                    const resultData = yield provider.send(data.method, data.params);
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
            }
            catch (e) {
                // If the RPC request fails, continue the request to the original provider
                route.continue();
            }
        }));
        yield use(gui);
    }),
});

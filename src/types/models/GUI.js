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
exports.GUI = void 0;
const test_1 = require("@playwright/test");
const ERC20ABI_1 = require("../constants/abis/ERC20ABI");
const ethers_1 = require("ethers");
const utils_1 = require("../utils");
const child_process_1 = require("child_process");
class GUI {
    /**
     * @constructor
     * @param page Playwright page object from the current test
     */
    constructor(page) {
        this.page = page;
    }
    /**
     * Spawn a forked chain using Anvil using a specific chain and optionally a block number
     * @param chainId - Chain ID to fork
     * @param forkBlockNumber - Block number to fork from (optional)
     */
    initializeChain(chainId, forkBlockNumber) {
        return __awaiter(this, void 0, void 0, function* () {
            // If an Alchemy RPC key is provided, use it. Otherwise, if an Infura RPC key is provided
            // use that. Otherwise throw an error.
            let forkRpc;
            if (process.env.GUARDIAN_UI_ALCHEMY_API_KEY) {
                forkRpc = (0, utils_1.getAlchemyRpcUrl)(chainId, process.env.GUARDIAN_UI_ALCHEMY_API_KEY);
            }
            else if (process.env.GUARDIAN_UI_INFURA_API_KEY) {
                forkRpc = (0, utils_1.getInfuraRpcUrl)(chainId, process.env.GUARDIAN_UI_INFURA_API_KEY);
            }
            else {
                throw new Error("No RPC key provided");
            }
            // Create fork
            (0, child_process_1.exec)(`anvil ${forkBlockNumber ? `--fork-block-number=${forkBlockNumber}` : ``} --fork-url=${forkRpc} &`);
            const newProvider = new ethers_1.ethers.providers.JsonRpcProvider("http://127.0.0.1:8545", chainId);
            let processStarted = false;
            do {
                try {
                    const chain = yield newProvider.send("eth_chainId", []);
                    const block = yield newProvider.send("eth_blockNumber", []);
                    console.log("Chain ID: " + chain);
                    console.log("Block number: " + block);
                    processStarted = true;
                }
                catch (e) {
                    console.log("Waiting for Anvil to start...");
                    yield new Promise((resolve) => setTimeout(resolve, 1000));
                }
            } while (!processStarted);
        });
    }
    /**
     * Kill the forked chain and Anvil process
     */
    killChain() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.page.close();
            (0, child_process_1.exec)("killall anvil");
        });
    }
    /**
     * Update the provider in the injected wallet to use a specific chain ID
     * @param chainId - Chain ID to update the provider to
     */
    initializeWallet(chainId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.page.evaluate(`window.ethereum.updateChain(${chainId})`);
        });
    }
    /**
     * Sets the allowance of an address to spend a token to a specific amount
     * @param token - The token to mock the approval on
     * @param spenderAddress - The address to approve to spend the token
     * @param amount - The amount to approve the spender to spend (with decimals)
     */
    setAllowance(token, spenderAddress, amount) {
        return __awaiter(this, void 0, void 0, function* () {
            // Pull provider URL from the page
            const providerUrl = yield this.page.evaluate("window.ethereum.provider.connection.url");
            // Pull wallet address from the page
            const userAddress = yield this.page.evaluate("window.ethereum.signer.address");
            // Pull chain ID from the page
            const chainId = yield this.page.evaluate("window.ethereum.chainId");
            // Automatically find the allowance storage slot
            const allowanceSlot = yield (0, utils_1.findAllowanceSlot)(token, this.page);
            // Calculate allowance[userAddress][spenderAddress] storage slot
            const userAllowanceSlot = (0, utils_1.getAllowanceSlot)(userAddress, spenderAddress, allowanceSlot);
            // Set the allowance[userAddress][spenderAddress] storage slot to the desired amount on the contract
            const provider = new ethers_1.ethers.providers.JsonRpcProvider(providerUrl, parseInt(chainId));
            const bnAmount = ethers_1.ethers.BigNumber.from(amount);
            yield provider.send("anvil_setStorageAt", [
                token,
                userAllowanceSlot,
                ethers_1.ethers.utils.hexZeroPad(ethers_1.ethers.utils.hexlify(bnAmount), 32)
            ]);
            // Check and report that the allowance was set correctly
            const erc20Contract = new ethers_1.ethers.Contract(token, ERC20ABI_1.erc20TokenAbi, provider);
            console.log("Allowance of " + userAddress + " to " + spenderAddress + " is now " + (yield erc20Contract.allowance(userAddress, spenderAddress)));
        });
    }
    /**
     * Sets the user's balance of a token to a specific amount
     * @param token - The token to mock the balance on
     * @param amount - The amount to set the balance to (with decimals)
     */
    setBalance(token, amount) {
        return __awaiter(this, void 0, void 0, function* () {
            // Pull provider URL from the page
            const providerUrl = yield this.page.evaluate("window.ethereum.provider.connection.url");
            // Pull wallet address from the page
            const userAddress = yield this.page.evaluate("window.ethereum.signer.address");
            // Pull chain ID from the page
            const chainId = yield this.page.evaluate("window.ethereum.chainId");
            // Automatically find the balance storage slot
            const balanceSlot = yield (0, utils_1.findBalanceSlot)(token, this.page);
            // Calculate balanceOf[userAddress] storage slot
            const userBalanceSlot = (0, utils_1.getBalanceSlot)(userAddress, balanceSlot);
            // Set the balanceOf[userAddress] storage slot to the desired amount
            const provider = new ethers_1.ethers.providers.JsonRpcProvider(providerUrl, parseInt(chainId));
            const bnAmount = ethers_1.ethers.BigNumber.from(amount);
            yield provider.send("anvil_setStorageAt", [
                token,
                userBalanceSlot,
                ethers_1.ethers.utils.hexZeroPad(ethers_1.ethers.utils.hexlify(bnAmount), 32)
            ]);
            // Check and report that the balance was set correctly
            const erc20Contract = new ethers_1.ethers.Contract(token, ERC20ABI_1.erc20TokenAbi, provider);
            console.log("Balance of " + userAddress + " is now " + (yield erc20Contract.balanceOf(userAddress)));
        });
    }
    /**
     * Set the user's ETH balance to a specific amount
     * @param amount - The amount to set the ETH balance to (with decimals)
     */
    setEthBalance(amount) {
        return __awaiter(this, void 0, void 0, function* () {
            // Pull provider URL from the page
            const providerUrl = yield this.page.evaluate("window.ethereum.provider.connection.url");
            // Pull wallet address from the page
            const userAddress = yield this.page.evaluate("window.ethereum.signer.address");
            // Pull chain ID from the page
            const chainId = yield this.page.evaluate("window.ethereum.chainId");
            // Set the ETH balance of the user to the desired amount
            const provider = new ethers_1.ethers.providers.JsonRpcProvider(providerUrl, parseInt(chainId));
            const bnAmount = ethers_1.ethers.BigNumber.from(amount);
            yield provider.send("anvil_setBalance", [
                userAddress,
                ethers_1.ethers.utils.hexlify(bnAmount)
            ]);
        });
    }
    /**
     * Arbitrarily set a contract's storage slot to a specific value
     * @param contract - The contract address to set the storage slot on
     * @param slot - The keccak256'd storage slot to set
     * @param value - The value to set the storage slot to
     */
    setContractStorageSlot(contract, slot, value) {
        return __awaiter(this, void 0, void 0, function* () {
            // Pull provider URL from the page
            const providerUrl = yield this.page.evaluate("window.ethereum.provider.connection.url");
            // Pull chain ID from the page
            const chainId = yield this.page.evaluate("window.ethereum.chainId");
            // Set the storage slot to the desired value
            const provider = new ethers_1.ethers.providers.JsonRpcProvider(providerUrl, parseInt(chainId));
            yield provider.send("anvil_setStorageAt", [
                contract,
                slot,
                value
            ]);
        });
    }
    /**
     * Checks that the eth_sendTransaction or eth_sendRawTransaction request following a button click
     * is interacting with the correct contract, or providing approval to the correct contract
     * @param locator - The Playwright locator string of the button to click
     * @param targetContract - The contract address that the button should trigger an interaction with
     */
    validateContractInteraction(locator, targetContract) {
        return __awaiter(this, void 0, void 0, function* () {
            let firstRequestReceived = false;
            // Intercept all requests
            const requestPromise = this.page.waitForRequest((request) => __awaiter(this, void 0, void 0, function* () {
                if (firstRequestReceived)
                    return false;
                if (request.url() === "http://127.0.0.1:8545/" && request.method() === "POST") {
                    const jsonData = JSON.parse(request.postData() ? request.postData() : "{}");
                    // Parse the JSON data to get the target contract address and the TX data
                    let targetAddress = "";
                    let txData = "";
                    let approvalAddress = "";
                    if (jsonData.method === "eth_sendTransaction") {
                        firstRequestReceived = true;
                        // Parse the JSON data to get the target contract address and the transaction data
                        targetAddress = jsonData.params[0].to;
                        txData = jsonData.params[0].data;
                        // If the transcation data has the ERC20 approval selector, parse the approval address
                        if (txData.substring(0, 10).toLowerCase() === "0x095ea7b3") {
                            approvalAddress = "0x" + txData.substring(34, 74);
                        }
                        console.log(`Target address is: ${targetAddress}`);
                        console.log(`TX Data is: ${txData}`);
                        // Check that the target contract or approval address is the correct contract
                        if (approvalAddress != "") {
                            (0, test_1.expect)(approvalAddress.toLowerCase()).toBe(targetContract.toLowerCase());
                            yield this.page.waitForTimeout(2000);
                            return true;
                        }
                        else {
                            (0, test_1.expect)(targetAddress.toLowerCase()).toBe(targetContract.toLowerCase());
                            yield this.page.waitForTimeout(2000);
                            return true;
                        }
                    }
                    else if (jsonData.method === "eth_sendRawTransaction") {
                        firstRequestReceived = true;
                        // Parse the JSON data to get the target contract address and the transaction data
                        const tx = ethers_1.ethers.utils.parseTransaction(jsonData.params[0]);
                        targetAddress = tx.to ? tx.to : "";
                        txData = tx.data;
                        // If the transcation data has the ERC20 approval selector, parse the approval address
                        if (txData.substring(0, 10).toLowerCase() === "0x095ea7b3") {
                            approvalAddress = "0x" + txData.substring(34, 74);
                        }
                        console.log(`Target address is: ${targetAddress}`);
                        console.log(`TX Data is: ${txData}`);
                        // Check that the target contract or approval address is the correct contract
                        if (approvalAddress != "") {
                            (0, test_1.expect)(approvalAddress.toLowerCase()).toBe(targetContract.toLowerCase());
                            yield this.page.waitForTimeout(2000);
                            return true;
                        }
                        else {
                            (0, test_1.expect)(targetAddress.toLowerCase()).toBe(targetContract.toLowerCase());
                            yield this.page.waitForTimeout(2000);
                            return true;
                        }
                    }
                }
                // Give a little bit of time for the request to propagate
                yield this.page.waitForTimeout(2000);
                return false;
            }));
            // Click the button and wait for the request to be intercepted
            yield this.page.locator(locator).first().click();
            yield requestPromise;
        });
    }
}
exports.GUI = GUI;

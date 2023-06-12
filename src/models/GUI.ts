import { Page, expect } from "@playwright/test";
import { erc20TokenAbi } from "../constants/abis/ERC20ABI";
import { ethers } from "ethers";
import { findAllowanceSlot, findBalanceSlot, getAllowanceSlot, getBalanceSlot, getAlchemyRpcUrl, getInfuraRpcUrl } from "../utils";
import { exec } from "child_process";
import * as path from "path";
import { promises as fs} from "fs";

export class GUI {
    // Playwright page object
    readonly page: Page;

    // Mapping of chain IDs to RPC cache .env variables
    readonly rpcCacheEnvVars = {
        1: "GUARDIAN_UI_ETHEREUM_RPC_URL",
        42161: "GUARDIAN_UI_ARBITRUM_RPC_URL",
        10: "GUARDIAN_UI_OPTIMISM_RPC_URL",
        137: "GUARDIAN_UI_POLYGON_RPC_URL"
    };

    /**
     * @constructor
     * @param page Playwright page object from the current test
     */
    constructor(page: Page) {
        this.page = page;
    }

    /**
     * Gets the GuardianUI RPC cache URL for a specific chain ID if it exists
     * @param chainId - Chain ID to get the RPC cache URL for
     * @returns RPC cache URL if it exists, undefined otherwise
     */
    getCacheUrl(chainId: number): string | undefined {
        const chainIdEnvVar = this.rpcCacheEnvVars[chainId as keyof typeof this.rpcCacheEnvVars];

        if (process.env[chainIdEnvVar]) {
            return process.env[chainIdEnvVar];
        }
    }

    /**
     * Gets the address of the currently injected wallet
     * @returns The address of the currently injected wallet
     */
    async getWalletAddress(): Promise<string> {
        return await this.page.evaluate("window.ethereum.signer.address");
    }

    /**
     * Gets the ETH balance of a specific address
     * @param address - The address to get the ETH balance of
     * @returns The ETH balance of the address
     */
    async getEthBalance(address: string): Promise<string> {
        // Pull provider URL from the page
        const providerUrl: string = await this.page.evaluate("window.ethereum.provider.connection.url");

        // Pull chain ID from the page
        const chainId: string = await this.page.evaluate("window.ethereum.chainId");

        // Create provider
        const provider = new ethers.providers.JsonRpcProvider(providerUrl, parseInt(chainId));

        // Get the ETH balance of the address
        const balance = await provider.getBalance(address);
        return balance.toString();
    }

    /**
     * Gets the balance of a specific token for a specific address
     * @param token - The token to get the balance of
     * @param address - The address to get the balance of
     * @returns The balance of the token for the address
     */
    async getBalance(token: string, address: string): Promise<string> {
        // Pull provider URL from the page
        const providerUrl: string = await this.page.evaluate("window.ethereum.provider.connection.url");

        // Pull chain ID from the page
        const chainId: string = await this.page.evaluate("window.ethereum.chainId");

        // Create provider
        const provider = new ethers.providers.JsonRpcProvider(providerUrl, parseInt(chainId));

        // Create ERC20 contract object
        const erc20Contract = new ethers.Contract(token, erc20TokenAbi, provider);

        // Get token balance
        const balance = await erc20Contract.balanceOf(address);
        return balance.toString();
    }

    /**
     * Gets the allowance of a specific token for specific owner and spender addresses
     * @param token - The token to get the allowance of
     * @param ownerAddress - The address of the owner of the tokens to get the allowance for
     * @param spenderAddress - The address of the spender of the tokens to get the allowance for
     * @returns The allowance of the token for the owner and spender addresses
     */
    async getAllowance(token: string, ownerAddress: string, spenderAddress: string): Promise<string> {
        // Pull provider URL from the page
        const providerUrl: string = await this.page.evaluate("window.ethereum.provider.connection.url");

        // Pull chain ID from the page
        const chainId: string = await this.page.evaluate("window.ethereum.chainId");

        // Create provider
        const provider = new ethers.providers.JsonRpcProvider(providerUrl, parseInt(chainId));

        // Create ERC20 contract object
        const erc20Contract = new ethers.Contract(token, erc20TokenAbi, provider);

        // Get token allowance
        const allowance = await erc20Contract.allowance(ownerAddress, spenderAddress);
        return allowance.toString();
    }

    /**
     * Spawn a forked chain using Anvil using a specific chain and optionally a block number
     * @param chainId - Chain ID to fork
     * @param forkBlockNumber - Block number to fork from (optional)
     */
    async initializeChain(chainId: number, forkBlockNumber?: number) {
        // If a GuardianUI RPC cache url is provided, use it. Otherwise, if an Alchemy RPC key is provided
        // use it. Otherwise, if an Infura RPC key is provided use that. 
        // Otherwise, if an Chainstack RPC key is provided use that. Otherwise throw an error.
        let forkRpc;
        const rpcCacheUrl = this.getCacheUrl(chainId);
        if (rpcCacheUrl) {
            forkRpc = rpcCacheUrl;
        } else if (process.env.GUARDIAN_UI_ALCHEMY_API_KEY) {
            forkRpc = getAlchemyRpcUrl(chainId, process.env.GUARDIAN_UI_ALCHEMY_API_KEY);
        } else if (process.env.GUARDIAN_UI_INFURA_API_KEY) {
            forkRpc = getInfuraRpcUrl(chainId, process.env.GUARDIAN_UI_INFURA_API_KEY);
        } else if (process.env.GUARDIAN_UI_CHAINSTACK_API_KEY) {
            forkRpc = getChainstackRpcUrl(chainId, process.env.GUARDIAN_UI_CHAINSTACK_API_KEY);
        } else {
            throw new Error("No RPC key provided");
        }

        const ANVIL_FLAGS = process.env.GUARDIAN_UI_ANVIL_FLAGS ? process.env.GUARDIAN_UI_ANVIL_FLAGS : "";

        // Create fork in background
        exec(`anvil ${forkBlockNumber ? `--fork-block-number=${forkBlockNumber}` : ``} --fork-url=${forkRpc} ${ANVIL_FLAGS} &`);

        const newProvider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:8545", chainId);

        let processStarted = false;
        do {
            try {
                const chain = await newProvider.send("eth_chainId", []);
                const block = await newProvider.send("eth_blockNumber", []);

                console.log("Chain ID: " + chain);
                console.log("Block number: " + block);

                processStarted = true;
            } catch (e) {
                console.log("Waiting for Anvil to start...");
                await new Promise((resolve) => setTimeout(resolve, 1000));
            }
        } while (!processStarted);

        // Inject wallet
        // Generate private key
        const privateKey = ethers.Wallet.createRandom().privateKey;

        // Open wallet provider code
        const parentDir = path.resolve(__dirname, "..");
        let walletProviderCode = await fs.readFile(`${parentDir}/provider/provider.js`, ({ encoding: "utf-8" }));

        // Replace the placeholder RPC text with the appropriate RPC URL
        walletProviderCode = walletProviderCode.replace("__GUARDIANUI_MOCK__RPC", "http://127.0.0.1:8545");

        // Replace the placeholder chain ID text with the appropriate chain ID
        walletProviderCode = walletProviderCode.replace("__GUARDIANUI_MOCK__CHAIN_ID", chainId.toString());

        // Replace the placeholder private key text with the generated private key
        walletProviderCode = walletProviderCode.replace("__GUARDIANUI_MOCK__PRIVATE_KEY", privateKey);

        // Inject a wallet object to window.ethereum when the page loads
        await this.page.addInitScript(walletProviderCode);
    }

    /**
     * Sets the allowance of an address to spend a token to a specific amount
     * @param token - The token to mock the approval on
     * @param spenderAddress - The address to approve to spend the token
     * @param amount - The amount to approve the spender to spend (with decimals)
     */
    async setAllowance(token: string, spenderAddress: string, amount: any) {
        // Pull provider URL from the page
        const providerUrl: string = await this.page.evaluate("window.ethereum.provider.connection.url");

        // Pull wallet address from the page
        const userAddress = await this.page.evaluate("window.ethereum.signer.address");

        // Pull chain ID from the page
        const chainId: string = await this.page.evaluate("window.ethereum.chainId");

        // Automatically find the allowance storage slot
        const allowanceSlot = await findAllowanceSlot(token, this.page);

        // Calculate allowance[userAddress][spenderAddress] storage slot
        const userAllowanceSlot = getAllowanceSlot(userAddress, spenderAddress, allowanceSlot);

        // Set the allowance[userAddress][spenderAddress] storage slot to the desired amount on the contract
        const provider = new ethers.providers.JsonRpcProvider(providerUrl, parseInt(chainId));
        const bnAmount = ethers.BigNumber.from(amount);
        await provider.send(
            "anvil_setStorageAt",
            [
                token,
                userAllowanceSlot,
                ethers.utils.hexZeroPad(ethers.utils.hexlify(bnAmount), 32)
            ]
        );

        // Check and report that the allowance was set correctly
        const erc20Contract = new ethers.Contract(token, erc20TokenAbi, provider);
        console.log("Allowance of " + userAddress + " to " + spenderAddress + " is now " + (await erc20Contract.allowance(userAddress, spenderAddress)));
    }

    /**
     * Sets the user's balance of a token to a specific amount
     * @param token - The token to mock the balance on
     * @param amount - The amount to set the balance to (with decimals)
     */
    async setBalance(token: string, amount: any) {
        // Pull provider URL from the page
        const providerUrl: string = await this.page.evaluate("window.ethereum.provider.connection.url");
        
        // Pull wallet address from the page
        const userAddress = await this.page.evaluate("window.ethereum.signer.address");

        // Pull chain ID from the page
        const chainId: string = await this.page.evaluate("window.ethereum.chainId");

        // Automatically find the balance storage slot
        const balanceSlot = await findBalanceSlot(token, this.page);

        // Calculate balanceOf[userAddress] storage slot
        const userBalanceSlot = getBalanceSlot(userAddress, balanceSlot);

        // Set the balanceOf[userAddress] storage slot to the desired amount
        const provider = new ethers.providers.JsonRpcProvider(providerUrl, parseInt(chainId));
        const bnAmount = ethers.BigNumber.from(amount);
        await provider.send(
            "anvil_setStorageAt",
            [
                token,
                userBalanceSlot,
                ethers.utils.hexZeroPad(ethers.utils.hexlify(bnAmount), 32)
            ]
        );

        // Check and report that the balance was set correctly
        const erc20Contract = new ethers.Contract(token, erc20TokenAbi, provider);
        console.log("Balance of " + userAddress + " is now " + (await erc20Contract.balanceOf(userAddress)));
    }

    /**
     * Set the user's ETH balance to a specific amount
     * @param amount - The amount to set the ETH balance to (with decimals)
     */
    async setEthBalance(amount: any) {
        // Pull provider URL from the page
        const providerUrl: string = await this.page.evaluate("window.ethereum.provider.connection.url");

        // Pull wallet address from the page
        const userAddress = await this.page.evaluate("window.ethereum.signer.address");
        
        // Pull chain ID from the page
        const chainId: string = await this.page.evaluate("window.ethereum.chainId");

        // Set the ETH balance of the user to the desired amount
        const provider = new ethers.providers.JsonRpcProvider(providerUrl, parseInt(chainId));
        const bnAmount = ethers.BigNumber.from(amount);
        await provider.send(
            "anvil_setBalance",
            [
                userAddress,
                ethers.utils.hexlify(bnAmount)
            ]
        );
    }

    /**
     * Arbitrarily set a contract's storage slot to a specific value
     * @param contract - The contract address to set the storage slot on
     * @param slot - The keccak256'd storage slot to set
     * @param value - The value to set the storage slot to
     */
    async setContractStorageSlot(contract: string, slot: string, value: string) {
        // Pull provider URL from the page
        const providerUrl: string = await this.page.evaluate("window.ethereum.provider.connection.url");

        // Pull chain ID from the page
        const chainId: string = await this.page.evaluate("window.ethereum.chainId");

        // Set the storage slot to the desired value
        const provider = new ethers.providers.JsonRpcProvider(providerUrl, parseInt(chainId));
        await provider.send(
            "anvil_setStorageAt",
            [
                contract,
                slot,
                value
            ]
        );
    }

    /**
     * Checks that the eth_sendTransaction or eth_sendRawTransaction request following a button click
     * is interacting with the correct contract, or providing approval to the correct contract
     * @param locator - The Playwright locator string of the button to click
     * @param targetContract - The contract address that the button should trigger an interaction with
     */
    async validateContractInteraction(locator: string, targetContract: string) {
        let firstRequestReceived = false;

        // Intercept all requests
        const requestPromise = this.page.waitForRequest(async request => {
            if (firstRequestReceived) return false;

            if (request.url() === "http://127.0.0.1:8545/" && request.method() === "POST") {
                const jsonData = JSON.parse(request.postData() ? request.postData()! : "{}");

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
                        expect(
                            approvalAddress.toLowerCase()
                        ).toBe(targetContract.toLowerCase());
                        await this.page.waitForTimeout(2000);
                        return true;
                    } else {
                        expect(
                            targetAddress.toLowerCase()
                        ).toBe(targetContract.toLowerCase());
                        await this.page.waitForTimeout(2000);
                        return true;
                    }
                } else if (jsonData.method === "eth_sendRawTransaction") {
                    firstRequestReceived = true;

                    // Parse the JSON data to get the target contract address and the transaction data
                    const tx = ethers.utils.parseTransaction(jsonData.params[0]);
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
                        expect(
                            approvalAddress.toLowerCase()
                        ).toBe(targetContract.toLowerCase());
                        await this.page.waitForTimeout(2000);
                        return true;
                    } else {
                        expect(
                            targetAddress.toLowerCase()
                        ).toBe(targetContract.toLowerCase());
                        await this.page.waitForTimeout(2000);
                        return true;
                    }
                }
            }

            // Give a little bit of time for the request to propagate
            await this.page.waitForTimeout(2000);
            return false;
        });

        // Click the button and wait for the request to be intercepted
        await this.page.locator(locator).first().click();
        await requestPromise;
    }
}

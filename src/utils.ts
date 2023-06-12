import { Page } from "@playwright/test";
import { erc20TokenAbi } from "./constants/abis/ERC20ABI";
import { ethers } from "ethers";

require('dotenv').config();

/**
 * Checks if a URL is a known Ethereum mainnet RPC endpoint
 * @param url - URL to check
 * @returns true if the URL is a known Ethereum mainnet RPC endpoint
 */
export const isMainnetRPC = (url: URL): boolean => {
    if (
        url.hostname === "mainnet.infura.io" ||
        url.hostname === "eth-mainnet.g.alchemy.com" ||
        url.hostname === "eth.llamarpc.com" ||
        url.hostname === "ethereum-mainnet.core.chainstack.com" ||
        url.hostname === "eth-rpc.gateway.pokt.network" ||
        url.hostname === "eth-archival.gateway.pokt.network" ||
        url.hostname === "eth-mainnet.alchemyapi.io" ||
        (url.hostname === "rpc.ankr.com" && url.pathname === "/eth") ||
        (url.hostname === "oasis.app" && url.pathname === "/api/rpc")
    ) {
        return true;
    }

    return false;
}

/**
 * Checks if a URL is a known Arbitrum mainnet RPC endpoint
 * @param url - URL to check
 * @returns true if the URL is a known Arbitrum mainnet RPC endpoint
 */
export const isArbiRPC = (url: URL): boolean => {
    if (
        url.hostname === "arbitrum-mainnet.infura.io" ||
        url.hostname === "arb-mainnet.g.alchemy.com" ||
        url.hostname === "arbitrum-rpc.gateway.pokt.network" ||
        url.hostname === "arb-mainnet.alchemyapi.io" ||
        url.hostname === "arbitrum-mainnet.core.chainstack.com" ||
        (url.hostname === "rpc.ankr.com" && url.pathname === "/arbitrum")
    ) {
        return true;
    }

    return false;
}

/**
 * Checks if a URL is a known Optimism mainnet RPC endpoint
 * @param url - URL to check
 * @returns true if the URL is a known Optimism mainnet RPC endpoint
 */
export const isOptiRPC = (url: URL): boolean => {
    if (
        url.hostname === "optimism-mainnet.infura.io" ||
        url.hostname === "opt-mainnet.g.alchemy.com" ||
        url.hostname === "optimism-rpc.gateway.pokt.network" ||
        url.hostname === "optimism-mainnet.core.chainstack.com" ||
        url.hostname === "opt-mainnet.alchemyapi.io" ||
        (url.hostname === "rpc.ankr.com" && url.pathname === "/optimism")
    ) {
        return true;
    }

    return false;
}

/**
 * Checks if a URL is a known Polygon mainnet RPC endpoint
 * @param url - URL to check
 * @returns true if the URL is a known Polygon mainnet RPC endpoint
 */
export const isPolyRPC = (url: URL): boolean => {
    if (
        url.hostname === "polygon-mainnet.infura.io" ||
        url.hostname === "polygon-mainnet.g.alchemy.com" ||
        url.hostname === "poly-rpc.gateway.pokt.network" ||
        url.hostname === "polygon-mainnet.core.chainstack.com" ||
        url.hostname === "polygon-mainnet.alchemyapi.io" ||
        (url.hostname === "rpc.ankr.com" && url.pathname === "/polygon")
    ) {
        return true;
    }

    return false;
}

/**
 * Maps a given network ID and API key to an Alchemy RPC URL
 * @param networkId - The chain's network ID
 * @param apiKey - The Alchemy API key
 * @returns The Alchemy RPC URL
 * @throws If the network ID is not supported
 */
export const getAlchemyRpcUrl = (networkId: number, apiKey: string): string => {
    switch (networkId) {
        case 1: // Mainnet
            return `https://eth-mainnet.g.alchemy.com/v2/${apiKey}`
        case 42161: // Arbitrum
            return `https://arb-mainnet.g.alchemy.com/v2/${apiKey}`
        case 10: // Optimism
            return `https://opt-mainnet.g.alchemy.com/v2/${apiKey}`
        case 137: // Polygon
            return `https://polygon-mainnet.g.alchemy.com/v2/${apiKey}`
        default:
            throw new Error(`Network ID ${networkId} not supported`);
    }
}

/**
 * Maps a given network ID and API key to an Infura RPC URL
 * @param networkId - The chain's network ID
 * @param apiKey - The Infura API key
 * @returns The Infura RPC URL
 * @throws If the network ID is not supported
 */
export const getInfuraRpcUrl = (networkId: number, apiKey: string): string => {
    switch (networkId) {
        case 1: // Mainnet
            return `https://mainnet.infura.io/v3/${apiKey}`
        case 42161: // Arbitrum
            return `https://arbitrum-mainnet.infura.io/v3/${apiKey}`
        case 10: // Optimism
            return `https://optimism-mainnet.infura.io/v3/${apiKey}`
        case 137: // Polygon
            return `https://polygon-mainnet.infura.io/v3/${apiKey}`
        default:
            throw new Error(`Network ID ${networkId} not supported`);
    }
}

/**
 * Maps a given network ID and API key to an Chainstack RPC URL
 * @param networkId - The chain's network ID
 * @param apiKey - The Chainstack API key
 * @returns The Chainstack RPC URL
 * @throws If the network ID is not supported
 */
export const getChainstackRpcUrl = (networkId: number, apiKey: string): string => {
    switch (networkId) {
        case 1: // Mainnet
            return `https://ethereum-mainnet.core.chainstack.com/${apiKey}`
        case 42161: // Arbitrum
            return `https://arbitrum-mainnet.core.chainstack.com/${apiKey}`
        case 10: // Optimism
            return `https://optimism-mainnet.core.chainstack.com/${apiKey}`
        case 137: // Polygon
            return `https://polygon-mainnet.core.chainstack.com/${apiKey}`
        default:
            throw new Error(`Network ID ${networkId} not supported`);
    }
}


/**
 * Calculates the encoded slot for the allowance mapping of an ERC20 token.
 * @param userAddress - The address of the user
 * @param spenderAddress - The address of the spender
 * @param mappingSlot - The storage slot number of the mapping
 * @returns The encoded slot
 */
export const getAllowanceSlot = (userAddress: any, spenderAddress: any, mappingSlot: any) => {
    const innerMappingSlot = ethers.utils.solidityKeccak256(
        ["uint256", "uint256"],
        [userAddress, mappingSlot]
    );

    return ethers.utils.solidityKeccak256(
        ["uint256", "uint256"],
        [spenderAddress, innerMappingSlot]
    );
}

/**
 * Calculates the encoded slot for the balance mapping of an ERC20 token.
 * @param userAddress - The address of the user
 * @param mappingSlot - The storage slot number of the mapping
 * @returns The encoded slot
 */
export const getBalanceSlot = (userAddress: any, mappingSlot: any) => {
    return ethers.utils.solidityKeccak256(
        ["uint256", "uint256"],
        [userAddress, mappingSlot]
    );
};

/**
 * Checks if a specific storage slot of an ERC20 token is the allowance mapping.
 * @param erc20Address - The address of the ERC20 token
 * @param mappingSlot - The storage slot number of the mapping
 * @param page - The Playwright page
 * @returns true if the storage slot is the allowance mapping
 */
export const checkAllowanceSlot = async (erc20Address: any, mappingSlot: any, page: any) => {
    // Get the provider URL and chain ID from the page
    const providerUrl: string = await page.evaluate("window.ethereum.provider.connection.url");
    const chainId = await page.evaluate("window.ethereum.chainId");
    const provider = new ethers.providers.JsonRpcProvider(providerUrl, parseInt(chainId));

    // Get the allowance slot for a zero address user and spender
    const userAddress = ethers.constants.AddressZero;
    const spenderAddress = ethers.constants.AddressZero;
    const allowanceSlot = getAllowanceSlot(userAddress, spenderAddress, mappingSlot);

    // Set the storage slot to a non-zero value
    const value: any = 0x07BCC9F5;
    const storageValue = ethers.utils.hexlify(ethers.utils.zeroPad(value, 32));
    await provider.send(
        "anvil_setStorageAt",
        [
            erc20Address,
            allowanceSlot,
            storageValue,
        ]
    );

    // Check if the allowance is equal to the value
    const erc20Contract = new ethers.Contract(erc20Address, erc20TokenAbi, provider);
    return await erc20Contract.allowance(userAddress, spenderAddress) == value;
}

/**
 * Checks if a specific storage slot of an ERC20 token is the balance mapping.
 * @param erc20Address - The address of the ERC20 token
 * @param mappingSlot - The storage slot number of the mapping
 * @param page - The Playwright page
 * @returns true if the storage slot is the balance mapping
 */
export const checkBalanceSlot = async (erc20Address: any, mappingSlot: any, page: any) => {
    // Get the provider URL and chain ID from the page
    const providerUrl: string = await page.evaluate("window.ethereum.provider.connection.url");
    const chainId = await page.evaluate("window.ethereum.chainId");
    const provider = new ethers.providers.JsonRpcProvider(providerUrl, parseInt(chainId));

    // Get the balance slot for a zero address user
    const userAddress = ethers.constants.AddressZero;
    const balanceSlot = getBalanceSlot(userAddress, mappingSlot);

    // Set the storage slot to a non-zero value
    const value: any = 0xDEADBEEF;
    const storageValue = ethers.utils.hexlify(ethers.utils.zeroPad(value, 32));
    await provider.send(
        "anvil_setStorageAt",
        [
            erc20Address,
            balanceSlot,
            storageValue,
        ]
    );

    // Check if the balance is equal to the value
    const erc20Contract = new ethers.Contract(erc20Address, erc20TokenAbi, provider);
    return await erc20Contract.balanceOf(userAddress) == value;
}

/**
 * Iterates over the storage slots of an ERC20 token to find the allowance mapping.
 * @param erc20Address - The address of the ERC20 token
 * @param page - The Playwright page
 * @returns The storage slot number of the allowance mapping
 */
export const findAllowanceSlot = async (erc20Address: any, page: any) => {
    // Get the provider URL and chain ID from the page
    const providerUrl: string = await page.evaluate("window.ethereum.provider.connection.url");
    const chainId = await page.evaluate("window.ethereum.chainId");
    const provider = new ethers.providers.JsonRpcProvider(providerUrl, parseInt(chainId));

    // Take a snapshot of the blockchain state to revert to later
    const snapshot = await provider.send("evm_snapshot", []);

    // Iterate over the storage slots to find the allowance mapping
    for (let slotNumber = 0; slotNumber < 100; slotNumber++) {
        try {
            if (await checkAllowanceSlot(erc20Address, slotNumber, page)) {
                // Revert to the snapshot to reset the blockchain state
                await provider.send("evm_revert", [snapshot]);

                // Return the slot number
                return slotNumber;
            }
        } catch {}

        // Revert to the snapshot to reset the blockchain state
        await provider.send("evm_revert", [snapshot]);
    }
}

/**
 * Iterates over the storage slots of an ERC20 token to find the balance mapping.
 * @param erc20Address - The address of the ERC20 token
 * @param page - The Playwright page
 * @returns The storage slot number of the balance mapping
 */
export const findBalanceSlot = async (erc20Address: any, page: any) => {
    // Get the provider URL and chain ID from the page
    const providerUrl: string = await page.evaluate("window.ethereum.provider.connection.url");
    const chainId = await page.evaluate("window.ethereum.chainId");
    const provider = new ethers.providers.JsonRpcProvider(providerUrl, parseInt(chainId));

    // Take a snapshot of the blockchain state to revert to later
    const snapshot = await provider.send("evm_snapshot", []);

    // Iterate over the storage slots to find the balance mapping
    for (let slotNumber = 0; slotNumber < 100; slotNumber++) {
        try {
            if (await checkBalanceSlot(erc20Address, slotNumber, page)) {
                // Revert to the snapshot to reset the blockchain state
                await provider.send("evm_revert", [snapshot]);

                // Return the slot number
                return slotNumber;
            }
        } catch {}

        // Revert to the snapshot to reset the blockchain state
        await provider.send("evm_revert", [snapshot]);
    }
}

/**
 * Routes an array of RPC requests through the Anvil fork and returns the results
 * @param page - The Playwright page
 * @param data - The RPC request data
 * @returns Array of RPC response data
 */
export const handleArrayRequest = async (page: Page, data: any): Promise<any> => {
    // Set up provider object to interact with
    const chainId: string = await page.evaluate("window.ethereum.chainId");
    const providerUrl: string = await page.evaluate("window.ethereum.provider.connection.url");
    const provider = new ethers.providers.JsonRpcProvider(providerUrl, parseInt(chainId));

    const updatedResponseData = [];

    // Send the RPC requests to Anvil and record the response
    for (let i = 0; i < data.length; i++) {
        const resultData = await provider.send(data[i].method, data[i].params);

        updatedResponseData.push({
            "jsonrpc": "2.0",
            "id": data[i].id,
            "result": resultData
        });
    }

    return updatedResponseData;
}

/**
 * Routes a single RPC request through the Anvil fork and returns the result
 * @param page - The Playwright page
 * @param data - The RPC request data
 * @returns RPC response data object
 */
export const handleSingleRequest = async (page: Page, data: any): Promise<any> => {
    // Set up provider object to interact with
    const chainId: string = await page.evaluate("window.ethereum.chainId");
    const providerUrl: string = await page.evaluate("window.ethereum.provider.connection.url");
    const provider = new ethers.providers.JsonRpcProvider(providerUrl, parseInt(chainId));

    // Send the RPC request to Anvil and record the response
    const resultData = await provider.send(data.method, data.params);

    const updatedResponseData = {
        "jsonrpc": "2.0",
        "id": data.id,
        "result": resultData
    };

    return updatedResponseData;
}

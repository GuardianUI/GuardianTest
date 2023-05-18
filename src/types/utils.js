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
exports.findBalanceSlot = exports.findAllowanceSlot = exports.checkBalanceSlot = exports.checkAllowanceSlot = exports.getBalanceSlot = exports.getAllowanceSlot = exports.getInfuraRpcUrl = exports.getAlchemyRpcUrl = exports.isPolyRPC = exports.isOptiRPC = exports.isArbiRPC = exports.isMainnetRPC = void 0;
const ERC20ABI_1 = require("./constants/abis/ERC20ABI");
const ethers_1 = require("ethers");
require('dotenv').config();
/**
 * Checks if a URL is a known Ethereum mainnet RPC endpoint
 * @param url - URL to check
 * @returns true if the URL is a known Ethereum mainnet RPC endpoint
 */
const isMainnetRPC = (url) => {
    if (url.hostname === "mainnet.infura.io" ||
        url.hostname === "eth-mainnet.g.alchemy.com" ||
        url.hostname === "eth.llamarpc.com" ||
        url.hostname === "eth-rpc.gateway.pokt.network" ||
        url.hostname === "eth-archival.gateway.pokt.network" ||
        url.hostname === "eth-mainnet.alchemyapi.io" ||
        (url.hostname === "rpc.ankr.com" && url.pathname === "/eth") ||
        (url.hostname === "oasis.app" && url.pathname === "/api/rpc")) {
        return true;
    }
    return false;
};
exports.isMainnetRPC = isMainnetRPC;
/**
 * Checks if a URL is a known Arbitrum mainnet RPC endpoint
 * @param url - URL to check
 * @returns true if the URL is a known Arbitrum mainnet RPC endpoint
 */
const isArbiRPC = (url) => {
    if (url.hostname === "arbitrum-mainnet.infura.io" ||
        url.hostname === "arb-mainnet.g.alchemy.com" ||
        url.hostname === "arbitrum-rpc.gateway.pokt.network" ||
        url.hostname === "arb-mainnet.alchemyapi.io" ||
        (url.hostname === "rpc.ankr.com" && url.pathname === "/arbitrum")) {
        return true;
    }
    return false;
};
exports.isArbiRPC = isArbiRPC;
/**
 * Checks if a URL is a known Optimism mainnet RPC endpoint
 * @param url - URL to check
 * @returns true if the URL is a known Optimism mainnet RPC endpoint
 */
const isOptiRPC = (url) => {
    if (url.hostname === "optimism-mainnet.infura.io" ||
        url.hostname === "opt-mainnet.g.alchemy.com" ||
        url.hostname === "optimism-rpc.gateway.pokt.network" ||
        url.hostname === "opt-mainnet.alchemyapi.io" ||
        (url.hostname === "rpc.ankr.com" && url.pathname === "/optimism")) {
        return true;
    }
    return false;
};
exports.isOptiRPC = isOptiRPC;
/**
 * Checks if a URL is a known Polygon mainnet RPC endpoint
 * @param url - URL to check
 * @returns true if the URL is a known Polygon mainnet RPC endpoint
 */
const isPolyRPC = (url) => {
    if (url.hostname === "polygon-mainnet.infura.io" ||
        url.hostname === "polygon-mainnet.g.alchemy.com" ||
        url.hostname === "poly-rpc.gateway.pokt.network" ||
        url.hostname === "polygon-mainnet.alchemyapi.io" ||
        (url.hostname === "rpc.ankr.com" && url.pathname === "/polygon")) {
        return true;
    }
    return false;
};
exports.isPolyRPC = isPolyRPC;
/**
 * Maps a given network ID and API key to an Alchemy RPC URL
 * @param networkId - The chain's network ID
 * @param apiKey - The Alchemy API key
 * @returns The Alchemy RPC URL
 * @throws If the network ID is not supported
 */
const getAlchemyRpcUrl = (networkId, apiKey) => {
    switch (networkId) {
        case 1: // Mainnet
            return `https://eth-mainnet.g.alchemy.com/v2/${apiKey}`;
        case 42161: // Arbitrum
            return `https://arb-mainnet.g.alchemy.com/v2/${apiKey}`;
        case 10: // Optimism
            return `https://opt-mainnet.g.alchemy.com/v2/${apiKey}`;
        case 137: // Polygon
            return `https://polygon-mainnet.g.alchemy.com/v2/${apiKey}`;
        default:
            throw new Error(`Network ID ${networkId} not supported`);
    }
};
exports.getAlchemyRpcUrl = getAlchemyRpcUrl;
/**
 * Maps a given network ID and API key to an Infura RPC URL
 * @param networkId - The chain's network ID
 * @param apiKey - The Infura API key
 * @returns The Infura RPC URL
 * @throws If the network ID is not supported
 */
const getInfuraRpcUrl = (networkId, apiKey) => {
    switch (networkId) {
        case 1: // Mainnet
            return `https://mainnet.infura.io/v3/${apiKey}`;
        case 42161: // Arbitrum
            return `https://arbitrum-mainnet.infura.io/v3/${apiKey}`;
        case 10: // Optimism
            return `https://optimism-mainnet.infura.io/v3/${apiKey}`;
        case 137: // Polygon
            return `https://polygon-mainnet.infura.io/v3/${apiKey}`;
        default:
            throw new Error(`Network ID ${networkId} not supported`);
    }
};
exports.getInfuraRpcUrl = getInfuraRpcUrl;
/**
 * Calculates the encoded slot for the allowance mapping of an ERC20 token.
 * @param userAddress - The address of the user
 * @param spenderAddress - The address of the spender
 * @param mappingSlot - The storage slot number of the mapping
 * @returns The encoded slot
 */
const getAllowanceSlot = (userAddress, spenderAddress, mappingSlot) => {
    const innerMappingSlot = ethers_1.ethers.utils.solidityKeccak256(["uint256", "uint256"], [userAddress, mappingSlot]);
    return ethers_1.ethers.utils.solidityKeccak256(["uint256", "uint256"], [spenderAddress, innerMappingSlot]);
};
exports.getAllowanceSlot = getAllowanceSlot;
/**
 * Calculates the encoded slot for the balance mapping of an ERC20 token.
 * @param userAddress - The address of the user
 * @param mappingSlot - The storage slot number of the mapping
 * @returns The encoded slot
 */
const getBalanceSlot = (userAddress, mappingSlot) => {
    return ethers_1.ethers.utils.solidityKeccak256(["uint256", "uint256"], [userAddress, mappingSlot]);
};
exports.getBalanceSlot = getBalanceSlot;
/**
 * Checks if a specific storage slot of an ERC20 token is the allowance mapping.
 * @param erc20Address - The address of the ERC20 token
 * @param mappingSlot - The storage slot number of the mapping
 * @param page - The Playwright page
 * @returns true if the storage slot is the allowance mapping
 */
const checkAllowanceSlot = (erc20Address, mappingSlot, page) => __awaiter(void 0, void 0, void 0, function* () {
    // Get the provider URL and chain ID from the page
    const providerUrl = yield page.evaluate("window.ethereum.provider.connection.url");
    const chainId = yield page.evaluate("window.ethereum.chainId");
    const provider = new ethers_1.ethers.providers.JsonRpcProvider(providerUrl, parseInt(chainId));
    // Get the allowance slot for a zero address user and spender
    const userAddress = ethers_1.ethers.constants.AddressZero;
    const spenderAddress = ethers_1.ethers.constants.AddressZero;
    const allowanceSlot = (0, exports.getAllowanceSlot)(userAddress, spenderAddress, mappingSlot);
    // Set the storage slot to a non-zero value
    const value = 0x07BCC9F5;
    const storageValue = ethers_1.ethers.utils.hexlify(ethers_1.ethers.utils.zeroPad(value, 32));
    yield provider.send("anvil_setStorageAt", [
        erc20Address,
        allowanceSlot,
        storageValue,
    ]);
    // Check if the allowance is equal to the value
    const erc20Contract = new ethers_1.ethers.Contract(erc20Address, ERC20ABI_1.erc20TokenAbi, provider);
    return (yield erc20Contract.allowance(userAddress, spenderAddress)) == value;
});
exports.checkAllowanceSlot = checkAllowanceSlot;
/**
 * Checks if a specific storage slot of an ERC20 token is the balance mapping.
 * @param erc20Address - The address of the ERC20 token
 * @param mappingSlot - The storage slot number of the mapping
 * @param page - The Playwright page
 * @returns true if the storage slot is the balance mapping
 */
const checkBalanceSlot = (erc20Address, mappingSlot, page) => __awaiter(void 0, void 0, void 0, function* () {
    // Get the provider URL and chain ID from the page
    const providerUrl = yield page.evaluate("window.ethereum.provider.connection.url");
    const chainId = yield page.evaluate("window.ethereum.chainId");
    const provider = new ethers_1.ethers.providers.JsonRpcProvider(providerUrl, parseInt(chainId));
    // Get the balance slot for a zero address user
    const userAddress = ethers_1.ethers.constants.AddressZero;
    const balanceSlot = (0, exports.getBalanceSlot)(userAddress, mappingSlot);
    // Set the storage slot to a non-zero value
    const value = 0xDEADBEEF;
    const storageValue = ethers_1.ethers.utils.hexlify(ethers_1.ethers.utils.zeroPad(value, 32));
    yield provider.send("anvil_setStorageAt", [
        erc20Address,
        balanceSlot,
        storageValue,
    ]);
    // Check if the balance is equal to the value
    const erc20Contract = new ethers_1.ethers.Contract(erc20Address, ERC20ABI_1.erc20TokenAbi, provider);
    return (yield erc20Contract.balanceOf(userAddress)) == value;
});
exports.checkBalanceSlot = checkBalanceSlot;
/**
 * Iterates over the storage slots of an ERC20 token to find the allowance mapping.
 * @param erc20Address - The address of the ERC20 token
 * @param page - The Playwright page
 * @returns The storage slot number of the allowance mapping
 */
const findAllowanceSlot = (erc20Address, page) => __awaiter(void 0, void 0, void 0, function* () {
    // Get the provider URL and chain ID from the page
    const providerUrl = yield page.evaluate("window.ethereum.provider.connection.url");
    const chainId = yield page.evaluate("window.ethereum.chainId");
    const provider = new ethers_1.ethers.providers.JsonRpcProvider(providerUrl, parseInt(chainId));
    // Take a snapshot of the blockchain state to revert to later
    const snapshot = yield provider.send("evm_snapshot", []);
    // Iterate over the storage slots to find the allowance mapping
    for (let slotNumber = 0; slotNumber < 100; slotNumber++) {
        try {
            if (yield (0, exports.checkAllowanceSlot)(erc20Address, slotNumber, page)) {
                // Revert to the snapshot to reset the blockchain state
                yield provider.send("evm_revert", [snapshot]);
                // Return the slot number
                return slotNumber;
            }
        }
        catch (_a) { }
        // Revert to the snapshot to reset the blockchain state
        yield provider.send("evm_revert", [snapshot]);
    }
});
exports.findAllowanceSlot = findAllowanceSlot;
/**
 * Iterates over the storage slots of an ERC20 token to find the balance mapping.
 * @param erc20Address - The address of the ERC20 token
 * @param page - The Playwright page
 * @returns The storage slot number of the balance mapping
 */
const findBalanceSlot = (erc20Address, page) => __awaiter(void 0, void 0, void 0, function* () {
    // Get the provider URL and chain ID from the page
    const providerUrl = yield page.evaluate("window.ethereum.provider.connection.url");
    const chainId = yield page.evaluate("window.ethereum.chainId");
    const provider = new ethers_1.ethers.providers.JsonRpcProvider(providerUrl, parseInt(chainId));
    // Take a snapshot of the blockchain state to revert to later
    const snapshot = yield provider.send("evm_snapshot", []);
    // Iterate over the storage slots to find the balance mapping
    for (let slotNumber = 0; slotNumber < 100; slotNumber++) {
        try {
            if (yield (0, exports.checkBalanceSlot)(erc20Address, slotNumber, page)) {
                // Revert to the snapshot to reset the blockchain state
                yield provider.send("evm_revert", [snapshot]);
                // Return the slot number
                return slotNumber;
            }
        }
        catch (_b) { }
        // Revert to the snapshot to reset the blockchain state
        yield provider.send("evm_revert", [snapshot]);
    }
});
exports.findBalanceSlot = findBalanceSlot;

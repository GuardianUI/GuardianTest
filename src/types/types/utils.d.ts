export const __esModule: boolean;
/**
 * Checks if a URL is a known Ethereum mainnet RPC endpoint
 * @param url - URL to check
 * @returns true if the URL is a known Ethereum mainnet RPC endpoint
 */
export function isMainnetRPC(url: any): boolean;
/**
 * Checks if a URL is a known Arbitrum mainnet RPC endpoint
 * @param url - URL to check
 * @returns true if the URL is a known Arbitrum mainnet RPC endpoint
 */
export function isArbiRPC(url: any): boolean;
/**
 * Checks if a URL is a known Optimism mainnet RPC endpoint
 * @param url - URL to check
 * @returns true if the URL is a known Optimism mainnet RPC endpoint
 */
export function isOptiRPC(url: any): boolean;
/**
 * Checks if a URL is a known Polygon mainnet RPC endpoint
 * @param url - URL to check
 * @returns true if the URL is a known Polygon mainnet RPC endpoint
 */
export function isPolyRPC(url: any): boolean;
/**
 * Maps a given network ID and API key to an Alchemy RPC URL
 * @param networkId - The chain's network ID
 * @param apiKey - The Alchemy API key
 * @returns The Alchemy RPC URL
 * @throws If the network ID is not supported
 */
export function getAlchemyRpcUrl(networkId: any, apiKey: any): string;
/**
 * Maps a given network ID and API key to an Infura RPC URL
 * @param networkId - The chain's network ID
 * @param apiKey - The Infura API key
 * @returns The Infura RPC URL
 * @throws If the network ID is not supported
 */
export function getInfuraRpcUrl(networkId: any, apiKey: any): string;
/**
 * Calculates the encoded slot for the allowance mapping of an ERC20 token.
 * @param userAddress - The address of the user
 * @param spenderAddress - The address of the spender
 * @param mappingSlot - The storage slot number of the mapping
 * @returns The encoded slot
 */
export function getAllowanceSlot(userAddress: any, spenderAddress: any, mappingSlot: any): string;
/**
 * Calculates the encoded slot for the balance mapping of an ERC20 token.
 * @param userAddress - The address of the user
 * @param mappingSlot - The storage slot number of the mapping
 * @returns The encoded slot
 */
export function getBalanceSlot(userAddress: any, mappingSlot: any): string;
/**
 * Checks if a specific storage slot of an ERC20 token is the allowance mapping.
 * @param erc20Address - The address of the ERC20 token
 * @param mappingSlot - The storage slot number of the mapping
 * @param page - The Playwright page
 * @returns true if the storage slot is the allowance mapping
 */
export function checkAllowanceSlot(erc20Address: any, mappingSlot: any, page: any): any;
/**
 * Checks if a specific storage slot of an ERC20 token is the balance mapping.
 * @param erc20Address - The address of the ERC20 token
 * @param mappingSlot - The storage slot number of the mapping
 * @param page - The Playwright page
 * @returns true if the storage slot is the balance mapping
 */
export function checkBalanceSlot(erc20Address: any, mappingSlot: any, page: any): any;
/**
 * Iterates over the storage slots of an ERC20 token to find the allowance mapping.
 * @param erc20Address - The address of the ERC20 token
 * @param page - The Playwright page
 * @returns The storage slot number of the allowance mapping
 */
export function findAllowanceSlot(erc20Address: any, page: any): any;
/**
 * Iterates over the storage slots of an ERC20 token to find the balance mapping.
 * @param erc20Address - The address of the ERC20 token
 * @param page - The Playwright page
 * @returns The storage slot number of the balance mapping
 */
export function findBalanceSlot(erc20Address: any, page: any): any;

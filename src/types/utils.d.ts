/**
 * Checks if a URL is a known Ethereum mainnet RPC endpoint
 * @param url - URL to check
 * @returns true if the URL is a known Ethereum mainnet RPC endpoint
 */
export declare const isMainnetRPC: (url: URL) => boolean;
/**
 * Checks if a URL is a known Arbitrum mainnet RPC endpoint
 * @param url - URL to check
 * @returns true if the URL is a known Arbitrum mainnet RPC endpoint
 */
export declare const isArbiRPC: (url: URL) => boolean;
/**
 * Checks if a URL is a known Optimism mainnet RPC endpoint
 * @param url - URL to check
 * @returns true if the URL is a known Optimism mainnet RPC endpoint
 */
export declare const isOptiRPC: (url: URL) => boolean;
/**
 * Checks if a URL is a known Polygon mainnet RPC endpoint
 * @param url - URL to check
 * @returns true if the URL is a known Polygon mainnet RPC endpoint
 */
export declare const isPolyRPC: (url: URL) => boolean;
/**
 * Maps a given network ID and API key to an Alchemy RPC URL
 * @param networkId - The chain's network ID
 * @param apiKey - The Alchemy API key
 * @returns The Alchemy RPC URL
 * @throws If the network ID is not supported
 */
export declare const getAlchemyRpcUrl: (networkId: number, apiKey: string) => string;
/**
 * Maps a given network ID and API key to an Infura RPC URL
 * @param networkId - The chain's network ID
 * @param apiKey - The Infura API key
 * @returns The Infura RPC URL
 * @throws If the network ID is not supported
 */
export declare const getInfuraRpcUrl: (networkId: number, apiKey: string) => string;
/**
 * Calculates the encoded slot for the allowance mapping of an ERC20 token.
 * @param userAddress - The address of the user
 * @param spenderAddress - The address of the spender
 * @param mappingSlot - The storage slot number of the mapping
 * @returns The encoded slot
 */
export declare const getAllowanceSlot: (userAddress: any, spenderAddress: any, mappingSlot: any) => string;
/**
 * Calculates the encoded slot for the balance mapping of an ERC20 token.
 * @param userAddress - The address of the user
 * @param mappingSlot - The storage slot number of the mapping
 * @returns The encoded slot
 */
export declare const getBalanceSlot: (userAddress: any, mappingSlot: any) => string;
/**
 * Checks if a specific storage slot of an ERC20 token is the allowance mapping.
 * @param erc20Address - The address of the ERC20 token
 * @param mappingSlot - The storage slot number of the mapping
 * @param page - The Playwright page
 * @returns true if the storage slot is the allowance mapping
 */
export declare const checkAllowanceSlot: (erc20Address: any, mappingSlot: any, page: any) => Promise<boolean>;
/**
 * Checks if a specific storage slot of an ERC20 token is the balance mapping.
 * @param erc20Address - The address of the ERC20 token
 * @param mappingSlot - The storage slot number of the mapping
 * @param page - The Playwright page
 * @returns true if the storage slot is the balance mapping
 */
export declare const checkBalanceSlot: (erc20Address: any, mappingSlot: any, page: any) => Promise<boolean>;
/**
 * Iterates over the storage slots of an ERC20 token to find the allowance mapping.
 * @param erc20Address - The address of the ERC20 token
 * @param page - The Playwright page
 * @returns The storage slot number of the allowance mapping
 */
export declare const findAllowanceSlot: (erc20Address: any, page: any) => Promise<number | undefined>;
/**
 * Iterates over the storage slots of an ERC20 token to find the balance mapping.
 * @param erc20Address - The address of the ERC20 token
 * @param page - The Playwright page
 * @returns The storage slot number of the balance mapping
 */
export declare const findBalanceSlot: (erc20Address: any, page: any) => Promise<number | undefined>;

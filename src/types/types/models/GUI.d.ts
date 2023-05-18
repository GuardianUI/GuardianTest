export const __esModule: boolean;
export class GUI {
    /**
     * @constructor
     * @param page Playwright page object from the current test
     */
    constructor(page: any);
    page: any;
    /**
     * Spawn a forked chain using Anvil using a specific chain and optionally a block number
     * @param chainId - Chain ID to fork
     * @param forkBlockNumber - Block number to fork from (optional)
     */
    initializeChain(chainId: any, forkBlockNumber: any): any;
    /**
     * Kill the forked chain and Anvil process
     */
    killChain(): any;
    /**
     * Update the provider in the injected wallet to use a specific chain ID
     * @param chainId - Chain ID to update the provider to
     */
    initializeWallet(chainId: any): any;
    /**
     * Sets the allowance of an address to spend a token to a specific amount
     * @param token - The token to mock the approval on
     * @param spenderAddress - The address to approve to spend the token
     * @param amount - The amount to approve the spender to spend (with decimals)
     */
    setAllowance(token: any, spenderAddress: any, amount: any): any;
    /**
     * Sets the user's balance of a token to a specific amount
     * @param token - The token to mock the balance on
     * @param amount - The amount to set the balance to (with decimals)
     */
    setBalance(token: any, amount: any): any;
    /**
     * Set the user's ETH balance to a specific amount
     * @param amount - The amount to set the ETH balance to (with decimals)
     */
    setEthBalance(amount: any): any;
    /**
     * Arbitrarily set a contract's storage slot to a specific value
     * @param contract - The contract address to set the storage slot on
     * @param slot - The keccak256'd storage slot to set
     * @param value - The value to set the storage slot to
     */
    setContractStorageSlot(contract: any, slot: any, value: any): any;
    /**
     * Checks that the eth_sendTransaction or eth_sendRawTransaction request following a button click
     * is interacting with the correct contract, or providing approval to the correct contract
     * @param locator - The Playwright locator string of the button to click
     * @param targetContract - The contract address that the button should trigger an interaction with
     */
    validateContractInteraction(locator: any, targetContract: any): any;
}

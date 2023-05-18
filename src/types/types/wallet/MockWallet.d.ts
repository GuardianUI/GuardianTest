export const __esModule: boolean;
export class MockWallet extends EIP1193Bridge_1.Eip1193Bridge {
    /**
     * @constructor
     * @param signer - The signer for the wallet (private key)
     * @param provider - The RPC provider
     * @param chainId - The chain ID to connect to
     */
    constructor(signer: any, provider: any, chainId: any);
    isMetaMask: boolean;
    isConnected: () => boolean;
    _metamask: MockInternalMetaMask;
    chainId: any;
    /**
     * Updates the provider and signer objects in the wallet to use the new chain ID
     * @param chain - The new chain ID to use
     */
    updateChain(chain: any): void;
    /**
     * Catch any sendAsync calls and reroute through send to the appropriate method handler
     * @param args - RPC request data arguments
     * @returns - The result of the RPC request
     */
    sendAsync(...args: any[]): any;
    /**
     * Directs the RPC request to the appropriate method handler with specific approaches for certain
     * methods that may differ from the parent Eip1193Bridge class
     * @param args - RPC request data arguments
     * @returns - The result of the RPC request
     */
    send(...args: any[]): any;
}
import EIP1193Bridge_1 = require("./EIP1193Bridge");
declare class MockInternalMetaMask {
    isUnlocked(): boolean;
}
export {};

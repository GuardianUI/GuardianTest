import { Eip1193Bridge } from "./EIP1193Bridge";
import { Signer, ethers } from "ethers";
declare class MockInternalMetaMask {
    isUnlocked(): boolean;
}
export declare class MockWallet extends Eip1193Bridge {
    chainId: number;
    isMetaMask: boolean;
    isConnected: () => boolean;
    _metamask: MockInternalMetaMask;
    /**
     * @constructor
     * @param signer - The signer for the wallet (private key)
     * @param provider - The RPC provider
     * @param chainId - The chain ID to connect to
     */
    constructor(signer: Signer, provider: ethers.providers.JsonRpcProvider, chainId: number);
    /**
     * Updates the provider and signer objects in the wallet to use the new chain ID
     * @param chain - The new chain ID to use
     */
    updateChain(chain: number): void;
    /**
     * Catch any sendAsync calls and reroute through send to the appropriate method handler
     * @param args - RPC request data arguments
     * @returns - The result of the RPC request
     */
    sendAsync(...args: any): Promise<any>;
    /**
     * Directs the RPC request to the appropriate method handler with specific approaches for certain
     * methods that may differ from the parent Eip1193Bridge class
     * @param args - RPC request data arguments
     * @returns - The result of the RPC request
     */
    send(...args: any): Promise<any>;
}
export {};

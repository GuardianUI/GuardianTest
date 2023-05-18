export const __esModule: boolean;
declare const Eip1193Bridge_base: any;
/**
 * EIP-1193 Bridge
 * This is an implementation of the spec laid out by EIP-1193 to create an Ethereum Provider API
 * that widely used to promote wallet interoperability. It is a minimal API to handle incoming
 * requests from a dApp and pass them to an RPC provider (e.g. Infura, Alchemy, etc.) and return
 * the result back to the dApp.
 * @see https://github.com/ethereum/EIPs/blob/master/EIPS/eip-1193.md
 */
export class Eip1193Bridge extends Eip1193Bridge_base {
    [x: string]: any;
    /**
     * @constructor
     * @param signer - The signer to use for the bridge
     * @param provider - The RPC provider to use for the bridge
     */
    constructor(signer: any, provider: any);
    signer: any;
    provider: any;
    /**
     * Setter for the signer state variable
     * @param signer - The signer to use for the bridge
     */
    setSigner(signer: any): void;
    /**
     * Setter for the provider state variable
     * @param provider - The RPC provider to use for the bridge
     */
    setProvider(provider: any): void;
    /**
     * Sends a request to the RPC provider
     * @param request - The request object comprising of a method and params to send to the RPC provider
     * @returns The result of the RPC provider call
     */
    request(request: any): any;
    /**
     * Sends a request to the RPC provider
     * @param method - The Ethereum RPC method to call
     * @param params - The parameters associated with the RPC method to pass to the RPC provider
     * @returns The result of the RPC provider call
     */
    send(method: any, params: any): any;
}
export {};

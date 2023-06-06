import EventEmitter from "events";
import { ethers } from "ethers";

/**
 * EIP-1193 Bridge
 * This is an implementation of the spec laid out by EIP-1193 to create an Ethereum Provider API
 * that widely used to promote wallet interoperability. It is a minimal API to handle incoming
 * requests from a dApp and pass them to an RPC provider (e.g. Infura, Alchemy, etc.) and return
 * the result back to the dApp.
 * @see https://github.com/ethereum/EIPs/blob/master/EIPS/eip-1193.md
 */
export class Eip1193Bridge extends EventEmitter {
    signer: ethers.Signer;
    provider: ethers.providers.JsonRpcProvider;

    /**
     * @constructor
     * @param signer - The signer to use for the bridge
     * @param provider - The RPC provider to use for the bridge
     */
    constructor(signer: ethers.Signer, provider: ethers.providers.JsonRpcProvider) {
        super();
        this.signer = signer;
        this.provider = provider;
    }

    /**
     * Setter for the signer state variable
     * @param signer - The signer to use for the bridge
     */
    setSigner(signer: ethers.Signer) {
        this.signer = signer;
    }

    /**
     * Setter for the provider state variable
     * @param provider - The RPC provider to use for the bridge
     */
    setProvider(provider: ethers.providers.JsonRpcProvider) {
        this.provider = provider;
    }

    /**
     * Sends a request to the RPC provider
     * @param request - The request object comprising of a method and params to send to the RPC provider
     * @returns The result of the RPC provider call
     */
    request(request: { method: string, params?: Array<any>}): Promise<any> {
        return this.send(request.method, request.params || []);
    }

    /**
     * Sends a request to the RPC provider
     * @param method - The Ethereum RPC method to call
     * @param params - The parameters associated with the RPC method to pass to the RPC provider
     * @returns The result of the RPC provider call
     */
    async send(method: string, params?: Array<any>): Promise<any> {

        // Handlers for the various Ethereum RPC methods
        switch (method) {
            case "eth_gasPrice": {
                const result = await this.provider.getGasPrice();
                return result.toHexString();
            }
            case "eth_accounts": {
                const result = [ ];
                if (this.signer) {
                    const address = await this.signer.getAddress();
                    result.push(address);
                }
                return result;
            }
            case "eth_blockNumber": {
                return await this.provider.getBlockNumber();
            }
            case "eth_chainId": {
                const result = await this.provider.getNetwork();
                return ethers.utils.hexValue(result.chainId);
            }
            case "eth_getBalance": {
                const result = await this.provider.getBalance(params![0], params![1]);
                return result.toHexString();
            }
            case "eth_getStorageAt": {
                return this.provider.getStorageAt(params![0], params![1], params![2]);
            }
            case "eth_getTransactionCount": {
                const result = await this.provider.getTransactionCount(params![0], params![1]);
                return ethers.utils.hexValue(result);
            }
            case "eth_getBlockTransactionCountByHash":
            case "eth_getBlockTransactionCountByNumber": {
                const result = await this.provider.getBlock(params![0]);
                return ethers.utils.hexValue(result.transactions.length);
            }
            case "eth_getCode": {
                const result = await this.provider.getCode(params![0], params![1]);
                return result;
            }
            case "eth_sendRawTransaction": {
                return await this.provider.sendTransaction(params![0]);
            }
            case "eth_call": {
                const req = ethers.providers.JsonRpcProvider.hexlifyTransaction(params![0]);
                return await this.provider.call(req, params![1]);
            }
            case "estimateGas": {
                if (params![1] && params![1] !== "latest") {
                    throw new Error("estimateGas does not support blockTag");
                }

                const req = ethers.providers.JsonRpcProvider.hexlifyTransaction(params![0]);
                const result = await this.provider.estimateGas(req);
                return result.toHexString();
            }

            // @TODO: Transform? No uncles?
            case "eth_getBlockByHash":
            case "eth_getBlockByNumber": {
                if (params![1]) {
                    return await this.provider.getBlockWithTransactions(params![0]);
                } else {
                    return await this.provider.getBlock(params![0]);
                }
            }
            case "eth_getTransactionByHash": {
                const result = await this.provider.send("eth_getTransactionByHash", params![0]);
                return result;
            }
            case "eth_getTransactionReceipt": {
                const result = await this.provider.send("eth_getTransactionReceipt", params![0]);
                return result;
            }
            case "eth_subscribe": {
                if (params![0] === "newHeads") {
                    const result = await this.provider.send("eth_subscribe", params![0]);
                    return result;
                }
                break;
            }

            case "eth_sign": {
                if (!this.signer) {
                    throw new Error("eth_sign requires an account");
                }

                const address = await this.signer.getAddress();
                if (address !== ethers.utils.getAddress(params![0])) {
                    throw new Error("account mismatch or account not found");
                }

                return this.signer.signMessage(ethers.utils.arrayify(params![1]));
            }

            case "eth_sendTransaction": {
                if (!this.signer) {
                    throw new Error("eth_sendTransaction requires an account");
                }

                const req = ethers.providers.JsonRpcProvider.hexlifyTransaction(params![0]);
                const tx = await this.signer.sendTransaction(req);
                return tx.hash;
            }

            case "eth_getUncleCountByBlockHash":
            case "eth_getUncleCountByBlockNumber":
            {
                break;
            }

            case "eth_getTransactionByBlockHashAndIndex":
            case "eth_getTransactionByBlockNumberAndIndex":
            case "eth_getUncleByBlockHashAndIndex":
            case "eth_getUncleByBlockNumberAndIndex":
            case "eth_newFilter":
            case "eth_newBlockFilter":
            case "eth_newPendingTransactionFilter":
            case "eth_uninstallFilter":
            case "eth_getFilterChanges":
            case "eth_getFilterLogs":
            case "eth_getLogs":
                break;
        }

        // If our provider supports send, maybe it can do a better job?
        if ((<any>(this.provider)).send) {
            const result = await (<any>(this.provider)).send(method, params);
            return result;
        }

        // If the RPC method was not handled, throw an error
        throw new Error(`Unsupported RPC method: ${method}`);
    }
}

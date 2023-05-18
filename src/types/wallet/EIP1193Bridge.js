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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Eip1193Bridge = void 0;
const events_1 = __importDefault(require("events"));
const ethers_1 = require("ethers");
/**
 * EIP-1193 Bridge
 * This is an implementation of the spec laid out by EIP-1193 to create an Ethereum Provider API
 * that widely used to promote wallet interoperability. It is a minimal API to handle incoming
 * requests from a dApp and pass them to an RPC provider (e.g. Infura, Alchemy, etc.) and return
 * the result back to the dApp.
 * @see https://github.com/ethereum/EIPs/blob/master/EIPS/eip-1193.md
 */
class Eip1193Bridge extends events_1.default {
    /**
     * @constructor
     * @param signer - The signer to use for the bridge
     * @param provider - The RPC provider to use for the bridge
     */
    constructor(signer, provider) {
        super();
        this.signer = signer;
        this.provider = provider;
    }
    /**
     * Setter for the signer state variable
     * @param signer - The signer to use for the bridge
     */
    setSigner(signer) {
        this.signer = signer;
    }
    /**
     * Setter for the provider state variable
     * @param provider - The RPC provider to use for the bridge
     */
    setProvider(provider) {
        this.provider = provider;
    }
    /**
     * Sends a request to the RPC provider
     * @param request - The request object comprising of a method and params to send to the RPC provider
     * @returns The result of the RPC provider call
     */
    request(request) {
        return this.send(request.method, request.params || []);
    }
    /**
     * Sends a request to the RPC provider
     * @param method - The Ethereum RPC method to call
     * @param params - The parameters associated with the RPC method to pass to the RPC provider
     * @returns The result of the RPC provider call
     */
    send(method, params) {
        return __awaiter(this, void 0, void 0, function* () {
            // Handlers for the various Ethereum RPC methods
            switch (method) {
                case "eth_gasPrice": {
                    const result = yield this.provider.getGasPrice();
                    return result.toHexString();
                }
                case "eth_accounts": {
                    const result = [];
                    if (this.signer) {
                        const address = yield this.signer.getAddress();
                        result.push(address);
                    }
                    return result;
                }
                case "eth_blockNumber": {
                    return yield this.provider.getBlockNumber();
                }
                case "eth_chainId": {
                    const result = yield this.provider.getNetwork();
                    return ethers_1.ethers.utils.hexValue(result.chainId);
                }
                case "eth_getBalance": {
                    const result = yield this.provider.getBalance(params[0], params[1]);
                    return result.toHexString();
                }
                case "eth_getStorageAt": {
                    return this.provider.getStorageAt(params[0], params[1], params[2]);
                }
                case "eth_getTransactionCount": {
                    const result = yield this.provider.getTransactionCount(params[0], params[1]);
                    return ethers_1.ethers.utils.hexValue(result);
                }
                case "eth_getBlockTransactionCountByHash":
                case "eth_getBlockTransactionCountByNumber": {
                    const result = yield this.provider.getBlock(params[0]);
                    return ethers_1.ethers.utils.hexValue(result.transactions.length);
                }
                case "eth_getCode": {
                    const result = yield this.provider.getCode(params[0], params[1]);
                    return result;
                }
                case "eth_sendRawTransaction": {
                    return yield this.provider.sendTransaction(params[0]);
                }
                case "eth_call": {
                    const req = ethers_1.ethers.providers.JsonRpcProvider.hexlifyTransaction(params[0]);
                    return yield this.provider.call(req, params[1]);
                }
                case "estimateGas": {
                    if (params[1] && params[1] !== "latest") {
                        throw new Error("estimateGas does not support blockTag");
                    }
                    const req = ethers_1.ethers.providers.JsonRpcProvider.hexlifyTransaction(params[0]);
                    const result = yield this.provider.estimateGas(req);
                    return result.toHexString();
                }
                // @TODO: Transform? No uncles?
                case "eth_getBlockByHash":
                case "eth_getBlockByNumber": {
                    if (params[1]) {
                        return yield this.provider.getBlockWithTransactions(params[0]);
                    }
                    else {
                        return yield this.provider.getBlock(params[0]);
                    }
                }
                case "eth_getTransactionByHash": {
                    return yield this.provider.getTransaction(params[0]);
                }
                case "eth_getTransactionReceipt": {
                    return yield this.provider.getTransactionReceipt(params[0]);
                }
                case "eth_sign": {
                    if (!this.signer) {
                        throw new Error("eth_sign requires an account");
                    }
                    const address = yield this.signer.getAddress();
                    if (address !== ethers_1.ethers.utils.getAddress(params[0])) {
                        throw new Error("account mismatch or account not found");
                    }
                    return this.signer.signMessage(ethers_1.ethers.utils.arrayify(params[1]));
                }
                case "eth_sendTransaction": {
                    if (!this.signer) {
                        throw new Error("eth_sendTransaction requires an account");
                    }
                    const req = ethers_1.ethers.providers.JsonRpcProvider.hexlifyTransaction(params[0]);
                    const tx = yield this.signer.sendTransaction(req);
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
            if ((this.provider).send) {
                const result = yield (this.provider).send(method, params);
                return result;
            }
            // If the RPC method was not handled, throw an error
            throw new Error(`Unsupported RPC method: ${method}`);
        });
    }
}
exports.Eip1193Bridge = Eip1193Bridge;

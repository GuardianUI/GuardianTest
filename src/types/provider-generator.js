"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ethers_1 = require("ethers");
const MockWallet_1 = require("./wallet/MockWallet");
// Set up the RPC provider, private key, signer, and wallet provider objects
const rpc = new ethers_1.providers.JsonRpcProvider("__GUARDIANUI_MOCK__RPC", 1);
// const privateKey = Wallet.createRandom().privateKey;
const signer = new ethers_1.Wallet("__GUARDIANUI_MOCK__PRIVATE_KEY", rpc);
const provider = new MockWallet_1.MockWallet(signer, rpc, 1);
// Set window.ethereum to the wallet provider object
window.ethereum = provider;

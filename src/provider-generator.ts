import { providers, Wallet } from "ethers";
import { MockWallet } from "./wallet/MockWallet";

// Set up the RPC provider, private key, signer, and wallet provider objects
const rpc = new providers.JsonRpcProvider("__GUARDIANUI_MOCK__RPC");
const signer = new Wallet("__GUARDIANUI_MOCK__PRIVATE_KEY", rpc);
const provider = new MockWallet(signer, rpc, "__GUARDIANUI_MOCK__CHAIN_ID");

// Set window.ethereum to the wallet provider object
(window as any).ethereum = provider;

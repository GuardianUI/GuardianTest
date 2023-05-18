import { providers, Wallet } from "ethers";
import { MockWallet } from "./wallet/MockWallet";

// Set up the RPC provider, private key, signer, and wallet provider objects
const rpc = new providers.JsonRpcProvider("__GUARDIANUI_MOCK__RPC", 1);
// const privateKey = Wallet.createRandom().privateKey;
const signer = new Wallet("__GUARDIANUI_MOCK__PRIVATE_KEY", rpc);
const provider = new MockWallet(signer, rpc, 1);

// Set window.ethereum to the wallet provider object
(window as any).ethereum = provider;

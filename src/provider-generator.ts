import { providers, Wallet } from "ethers";
import { MockWallet } from "./wallet/MockWallet";

// Determin the RPC URL. This can be done with an Alchemy or Infura API key in the .env file
let rpcUrl;
if (process.env.GUARDIAN_UI_ALCHEMY_API_KEY) {
  rpcUrl = `https://eth-mainnet.g.alchemy.com/v2/${process.env.GUARDIAN_UI_ALCHEMY_API_KEY}`;
} else if (process.env.GUARDIAN_UI_INFURA_API_KEY) {
  rpcUrl = `https://mainnet.infura.io/v3/${process.env.GUARDIAN_UI_INFURA_API_KEY}`;
} else {
  throw new Error("No RPC key provided");
}

// Set up the RPC provider, private key, signer, and wallet provider objects
const rpc = new providers.JsonRpcProvider(rpcUrl, 1);
const privateKey = Wallet.createRandom().privateKey;
const signer = new Wallet(privateKey, rpc);
const provider = new MockWallet(signer, rpc, 1);

// Set window.ethereum to the wallet provider object
(window as any).ethereum = provider;

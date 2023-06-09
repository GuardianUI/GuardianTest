import { isMainnetRPC, isArbiRPC, isOptiRPC, isPolyRPC } from "../utils";

test("isMainnetRPC", () => {
    let url = new URL("https://mainnet.infura.io/v3/1234567890");
    expect(isMainnetRPC(url)).toBe(true);

    url = new URL("https://eth-mainnet.g.alchemy.com/v2/1234567890");
    expect(isMainnetRPC(url)).toBe(true);

    url = new URL("https://eth-mainnet.alchemyapi.io/v2/1234567890");
    expect(isMainnetRPC(url)).toBe(true);

    url = new URL("https://eth.llamarpc.com");
    expect(isMainnetRPC(url)).toBe(true);

    url = new URL("https://eth-rpc.gateway.pokt.network");
    expect(isMainnetRPC(url)).toBe(true);

    url = new URL("https://eth-archival.gateway.pokt.network");
    expect(isMainnetRPC(url)).toBe(true);

    url = new URL("https://oasis.app/api/rpc");
    expect(isMainnetRPC(url)).toBe(true);

    url = new URL("https://mainnet.g.alchemy.com/v2/1234567890");
    expect(isMainnetRPC(url)).toBe(false);

    url = new URL("https://arb-mainnet.g.alchemy.com/v2/1234567890");
    expect(isMainnetRPC(url)).toBe(false);

    url = new URL("https://rpc.ankr.com/arbitrum");
    expect(isMainnetRPC(url)).toBe(false);
});

test("isArbiRPC", () => {
    let url = new URL("https://arbitrum-mainnet.infura.io/v3/1234567890");
    expect(isArbiRPC(url)).toBe(true);

    url = new URL("https://arb-mainnet.g.alchemy.com/v2/1234567890");
    expect(isArbiRPC(url)).toBe(true);

    url = new URL("https://arb-mainnet.alchemyapi.io/v2/1234567890");
    expect(isArbiRPC(url)).toBe(true);

    url = new URL("https://arbitrum-rpc.gateway.pokt.network");
    expect(isArbiRPC(url)).toBe(true);

    url = new URL("https://rpc.ankr.com/arbitrum");
    expect(isArbiRPC(url)).toBe(true);

    url = new URL("https://mainnet.infura.io/v3/1234567890");
    expect(isArbiRPC(url)).toBe(false);

    url = new URL("https://eth-mainnet.g.alchemy.com/v2/1234567890");
    expect(isArbiRPC(url)).toBe(false);

    url = new URL("https://opt-mainnet.alchemyapi.io/v2/1234567890");
});

test("isOptiRPC", () => {
    let url = new URL("https://optimism-mainnet.infura.io/v3/1234567890");
    expect(isOptiRPC(url)).toBe(true);

    url = new URL("https://opt-mainnet.g.alchemy.com/v2/1234567890");
    expect(isOptiRPC(url)).toBe(true);

    url = new URL("https://opt-mainnet.alchemyapi.io/v2/1234567890");
    expect(isOptiRPC(url)).toBe(true);

    url = new URL("https://optimism-rpc.gateway.pokt.network");
    expect(isOptiRPC(url)).toBe(true);

    url = new URL("https://rpc.ankr.com/optimism");
    expect(isOptiRPC(url)).toBe(true);

    url = new URL("https://mainnet.infura.io/v3/1234567890");
    expect(isOptiRPC(url)).toBe(false);

    url = new URL("https://arb-mainnet.g.alchemy.com/v2/1234567890");
    expect(isOptiRPC(url)).toBe(false);

    url = new URL("https://eth-mainnet.alchemyapi.io/v2/1234567890");
    expect(isOptiRPC(url)).toBe(false);
});

test("isPolyRPC", () => {
    let url = new URL("https://polygon-mainnet.infura.io/v3/1234567890");
    expect(isPolyRPC(url)).toBe(true);

    url = new URL("https://polygon-mainnet.g.alchemy.com/v2/1234567890");
    expect(isPolyRPC(url)).toBe(true);

    url = new URL("https://polygon-mainnet.alchemyapi.io/v2/1234567890");
    expect(isPolyRPC(url)).toBe(true);

    url = new URL("https://poly-rpc.gateway.pokt.network");
    expect(isPolyRPC(url)).toBe(true);

    url = new URL("https://rpc.ankr.com/polygon");
    expect(isPolyRPC(url)).toBe(true);

    url = new URL("https://mainnet.infura.io/v3/1234567890");
    expect(isPolyRPC(url)).toBe(false);

    url = new URL("https://arb-mainnet.g.alchemy.com/v2/1234567890");
    expect(isPolyRPC(url)).toBe(false);

    url = new URL("https://eth-mainnet.alchemyapi.io/v2/1234567890");
    expect(isPolyRPC(url)).toBe(false);
});

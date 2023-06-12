<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://github.com/GuardianUI/landing-page/blob/main/assets/images/logo.png">
    <img alt="guardianui logo" src="https://github.com/GuardianUI/landing-page/blob/main/assets/images/logo.png" width="auto" height="75">
  </picture>
</p>

<p align="center">
  GuardianTest is an open-source, end-to-end testing framework for web3 developers building on EVM-compatible chains.
<p>

<br>

## Installation

### Dependencies

#### Installing Node.js

- Check if you already have Node installed by opening a terminal or command prompt instance and executing `node -v`. You should see a version number in the return.
- If you do not have Node already installed, go to [Node.js](https://nodejs.org/en/download) and select the version associated with your operating system.

#### Installing Foundry

- Check if you already have [Anvil](https://github.com/foundry-rs/foundry/tree/master/anvil) installed through Foundry by opening a terminal or command prompt instance and executing `anvil -V`. You should see a version number in the return. If you do not, follow one of the guides below.

**Mac, Linux, and Windows**

- [Install using Foundryup](https://book.getfoundry.sh/getting-started/installation#using-foundryup)
- [Building from source](https://book.getfoundry.sh/getting-started/installation#building-from-source)

**Docker**

- [Installation for Docker](https://book.getfoundry.sh/getting-started/installation#using-foundry-with-docker)

**CI**

- [Installation for CI](https://book.getfoundry.sh/getting-started/installation#installing-for-ci-in-github-action)

### Installing GuardianTest

You can install GuardianTest using either npm or yarn:

**npm**

```bash
npm install --save-dev @guardianui/test
```

**yarn**

```bash
yarn add -D @guardianui/test
```

### Installing Playwright Browsers

You will need to have the latest Playwright browser drivers installed.

```bash
npx playwright install
```

### Configuration

**Playwright**

At your repo's top-level directory create a file called `playwright.config.ts`. You can find a default configuration in our [GuardianTest Configuration Guide](https://docs.guardianui.com/platform/guardiantest/getting-started/installation#configuring-the-framework)

If you already are using Playwright and already have a `playwright.config.ts`:

- Add /.\*gui\.(js|ts|mjs)/ to the testMatch entry to make sure Playwright recognizes our tests
  - If you do not have a testMatch entry in the config, add one like shown in the example below
  - If you have existing Playwright tests that are either named with the testName.spec.ts or testName.test.ts naming conventions make the following your testMatch entry: `[/.*gui\.(js|ts|mjs)/, /.*(spec|test)\.(js|ts|mjs)/]`
- Set `fullyParallel` to `false`
- Set `workers` to `1`

**env**

Create another file called `.env` in your repo's top-level directory, or add the following to your existing `.env` file if you already have one. Comment out whichever line you do not use with a `#` at the start.

```bash
# Must fill in one of these API keys, do not need both
GUARDIAN_UI_INFURA_API_KEY=
GUARDIAN_UI_ALCHEMY_API_KEY=
GUARDIAN_UI_CHAINSTACK_API_KEY=
```

**package.json**

To be able to run tests, add the following to your app's `package.json` scripts section:

```bash
"test:gui": "npx playwright test --project=chromium --headed"
```

### Writing Your First Test

Follow our [guide](https://docs.guardianui.com/platform/guardiantest/getting-started/writing-your-first-e2e-test) to write your first test

  <br>

## What GuardianTest enables

- Engage with local deployments, staging deployments, OR live production
- Perform tests on Ethereum, Polygon, Arbitrum, or Optimism (more coming soon)
- Pin tests to any block
- Interact with a site using a wallet
- Mock ERC20 balances and allowances
- Validate target contract addresses from app interactions
- Perform any other actions or validation [Playwright](https://github.com/microsoft/playwright) offers

## Why it's good

- Does not rely on MetaMask or any other specific wallet where the brittleness of the tests is caused by changes from the wallet provider
- Creates a closer to production testing environment
  - No modified WAGMI connector
  - Looks like mainnet to the site
- Enables easy mocking of ERC20 balances and allowances
- Enables mocking of any other contract state
- Enables developers to verify wallet interactions
- Enables developers to test app behavior through a transaction completing

## How it works

- Spins up an Anvil fork of the desired network at the time of test run
- Uses Playwright to run browser interactions and engage with the site
- Injects a wallet to the browser that's connected to the Anvil fork
- Checks `eth_sendTransaction` and `eth_sendRawTransaction` RPC requests when instructed to via `gui.validateContractInteraction`

## Documentation

For full documentation and examples, visit the [GuardianTest Docs](https://docs.guardianui.com/).

## Community

Check out the following places for more GuardianUI-related content:

- Join the [discussions on GitHub](https://github.com/GuardianUI/GuardianTest/discussions)
- Follow [@guardian_ui](https://twitter.com/guardian_ui) on Twitter for project updates
- Share [your project/organization](https://github.com/GuardianUI/GuardianTest/discussions/2) that's using GuardianTest
- Join the [GuardianUI discord](https://discord.gg/TkfeTpfYxx) to connect with other devs and the GuardianUI team.
- Learn more about additional GuardianUI products and features by visiting [our website](https://www.guardianui.com/).

## Contributing

If you're interested in contributing, please read the [contributing docs](https://github.com/GuardianUI/GuardianTest/blob/main/CONTRIBUTING.md) before submitting a pull request.

## Resources

- [Documentation](https://docs.guardianui.com/)
- [Contributing guide](CONTRIBUTING.md)
- [GuardianUI website](https://www.guardianui.com/)

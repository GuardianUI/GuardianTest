<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://github.com/GuardianUI/landing-page/blob/main/assets/images/logo.png">
    <img alt="guardianui logo" src="https://github.com/GuardianUI/landing-page/blob/main/assets/images/logo.png" width="auto" height="75">
  </picture>
</p>

<p align="center">
  GuardianTest is an open-source, e2e testing framework for web3 developers building on EVM-compatible chains.
<p>

<br>

## Installation

### Dependencies

#### Installing Node.js

* Check if you already have Node installed by opening a terminal or command prompt instance and executing `node -v`. You should see a version number in the return.
* If you do not have Node already installed, go to [Node.js](https://nodejs.org/en/download) and select the version associated with your operating system.


#### Installing Foundry

* Check if you already have [Anvil](https://github.com/foundry-rs/foundry/tree/master/anvil) installed through Foundry by opening a terminal or command prompt instance and executing `anvil -V`. You should see a version number in the return. If you do not, follow one of the guides below.

**Mac, Linux, and Windows**

* [Install using Foundryup](https://book.getfoundry.sh/getting-started/installation#using-foundryup)
* [Building from source](https://book.getfoundry.sh/getting-started/installation#building-from-source)

**Docker**

* [Installation for Docker](https://book.getfoundry.sh/getting-started/installation#using-foundry-with-docker)

**CI**

* [Installation for CI](https://book.getfoundry.sh/getting-started/installation#installing-for-ci-in-github-action)


### Installing GuardianTest

You can install GuardianTest using either npm or yarn:

**npm**
```bash
npm install @guardianui/test
```  

**yarn**
```bash
yarn add @guardianui/test
```

### Installing Playwright Browsers
```bash
npx playwright install  
```
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
- Checks eth_sendTransaction and eth_sendRawTransaction RPC requests when instructed to via gui.validateContractInteraction


## Documentation

For full documentation and examples, visit [guardianui.com](https://docs.guardianui.com/).
  
  
## Community

Check out the following places for more GuardianUI-related content:

- Join the [discussions on GitHub](https://github.com/GuardianUI/guardianui/discussions)
- Follow [@guardian_ui](https://twitter.com/guardian_ui) on Twitter for project updates
- Share [your project/organization](https://github.com/GuardianUI/guardianui/discussions/2) that's using GuardianUI
- Join the [GuardianUI discord](https://discord.gg/TkfeTpfYxx) to connect with other devs and the GuardianUI team.
- Learn more about additional GuardianUI products and features by visiting [our website](https://www.guardianui.com/). 

## Contributing

If you're interested in contributing, please read the [contributing docs](https://github.com/GuardianUI/guardianui/blob/main/CONTRIBUTING.md) before submitting a pull request.

## Resources
* [Documentation](https://docs.guardianui.com/)
* [Contributing guide](CONTRIBUTING.md)
* [GuardianUI website](https://www.guardianui.com/)  

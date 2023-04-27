<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://github.com/GuardianUI/landing-page/blob/main/assets/images/logo.png">
    <img alt="guardianui logo" src="https://github.com/GuardianUI/landing-page/blob/main/assets/images/logo.png" width="auto" height="75">
  </picture>
</p>

<p align="center">
  End-to-end testing framework for web3 developers building on EVM-compatible chains.
<p>

<br>

## What the GuardianUI framework enables

- Testing in an environment similar to production across any EVM-compatible chain
- Everything [Playwright](https://github.com/microsoft/playwright) already allows you to test (what is displayed, navigation works as expected, buttons are clickable, etc)
- Making sure your frontend is creating the expected write smart contract interactions (transactions, approvals)
- Ensuring your frontend responds to a completed transaction the way you are expecting

## Why it's good

- Does not rely on MetaMask or any other specific wallet where the brittleness of the tests is linked to any breaking changes the wallet provider may push
- Creates a closer to production testing environment
  - No modified WAGMI connector
  - Looks like mainnet to the site
- Enables easy mocking of ERC20 balances and allowances
- Enables mocking of any other contract state
- Enables developers to verify wallet interactions
- Enables developers to test app behavior through a transaction completing

## How it works

- Uses Playwright to interact with the site
- At the time of a test run, the framework spins up an Anvil fork of the desired network using Foundry
- It then injects a wallet to the browser that uses the Anvil fork as its RPC 
- It then states its chain ID to be that of the mainnet of the desired network and reports any “eth_sendTransaction” requests


## Documentation

For full documentation and examples, visit [guardianui.com](https://guardianui.gitbook.io/beta-documentation/).

## Installation

Install guardianui and its dependencies.

```bash
npm install @guardianui/guardianui
```

## Quick Start
  
## Community

Check out the following places for more GuardianUI-related content:

- Join the [discussions on GitHub](https://github.com/GuardianUI/guardianui/discussions)
- Follow [@guardian_ui](https://twitter.com/guardian_ui) on Twitter for project updates
- Share [your project/organization](https://github.com/GuardianUI/guardianui/discussions/2) that's using GuardianUI
- Join the [GuardianUI discord](https://discord.gg/TkfeTpfYxx) to connect with other devs and the GuardianUI team.
- Learn more about additional GuardianUI products and features by visiting [our website](https://www.guardianui.com/). 

## Contributing

If you're interested in contributing, please read the [contributing docs] before submitting a pull request.

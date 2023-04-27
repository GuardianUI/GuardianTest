# Contributing

Thanks for your interest in contributing to guardianui! 😄

**Once you learn how to use guardianui, you can contribute in lots of ways:**

- Join the [GuardianUI Discord](https://discord.gg/TkfeTpfYxx) and answer questions. Teaching others how to use guardianui is a great way to learn more about how it works.
- Create content about guardianui. Whether it's a blog post, youtube video tutorial, tweet, or anything in between, sharing information and guidance is a great way to engage the community. Be sure to tag us on [twitter](https://twitter.com/guardian_ui) when you post it so we can share it as well. We may also feature it on our website!
- Contribute to our docs to improve our [existing docs](https://github.com/GuardianUI/guardianui-documentation).
- Host a meetup or online workshop. [Contact us](mailto:support@guardianui.com) if you want our help coordinating or potential involvement. 🚀 

**Interested in contributing to the development of guardianui? There are several ways to do so.**

- [Report bugs](https://github.com/GuardianUI/guardianui/issues/new/choose) by opening an issue.
- [Request features](https://github.com/GuardianUI/guardianui/discussions/new?category=ideas) by starting a discussion.
- [Help triage existing issues](#triaging-issues).
- Write code to address an issue. We have some issues labeled as [`good first issue`](https://github.com/GuardianUI/guardianui/issues) that are a good place to start. Please be sure to take a moment to review this entire document **before submitting a pull request.** 

If you want to contribute, but aren't sure where to start, you can create a [new discussion](https://github.com/GuardianUI/guardianui/discussions).

<br>

> **Note**
>
> **Please review the [Discussions]((https://github.com/GuardianUI/guardianui/discussions)) or ask first before starting work on any significant new features. This includes things like ____, ____, ____, ____, etc.**
>
> It's never a fun experience to have your pull request declined after investing time and effort into a new feature. To avoid this from happening, we request that contributors create a [feature request](https://github.com/GuardianUI/guardianui/discussions/new?category=ideas) to first discuss any changes or significant new ideas.

<br>

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Opening Issues](#opening-issues)
- [Writing Documentation](#writing-documentation)
- [Writing Code](#writing-code)
  - [What you need to know before getting started](#what-you-need-to-know-before-getting-started)
  - [Requirements](#requirements)
  - [Getting Started](#getting-started)
  - [Coding Style](#coding-style)
  - [Adding links within code](#Adding-links-within-code)
  - [Tests](#tests)
  - [Packages](#packages)
- [Committing Code](#committing-code)
  - [Branches](#branches)
  - [Pull Requests](#pull-requests)
  - [Dependencies](#dependencies)

## Code of Conduct

All contributors are expected to follow our [Code of Conduct](./CODE_OF_CONDUCT.md).

## Opening Issues

**The most important things to do are:**

- Search existing [issues](https://github.com/GuardianUI/guardianui/issues) for your problem.
- [Update guardianui](#update-guardianui).
- [Gather debugging info](#getting-more-information).
- [Complete the issue template](#complete-the-issue-template).
- [Describe your problem](#describe-your-problem).
- [Explain how to reproduce the issue](#how-to-reproduce).

If you've gone through these steps, are up to date, supported, have collected information about the problem, and have the best reproduction instructions you can give, you are ready to [open an issue](https://github.com/GuardianUI/guardianui/issues).

### Update guardianui

Before creating a bug report, make sure you are up to date. Your issue may have already been fixed. Even if you do not see the issue described as resolved in a newer version, a newer version may help in the process of debugging your issue by giving more helpful error messages.

[See our document on installing cypress] (INSERT LINK)

### Getting More Information

For some issues, there are places you can check for more information. This may help you resolve the issue yourself. Even if it doesn't, this information can help us figure out and resolve an issue.

- For issues in the web browser, check the JavaScript console and your Network tab in your DevTools.
- Click on any command in the Command Log where the failure occurred, this will log more information about the error to the JavaScript console.
- Ask other guardianui users for help in our or [Discord](https://discord.gg/TkfeTpfYxx).

### Complete the Issue Template

Please use the provided [issue template](https://github.com/GuardianUI/guardianui/issues/new/choose) to submit your issue. The template includes the information needed for us to continue forward with your problem. Any issues that don't fill out the issue template will be closed.

### Describe Your Problem

It can be tempting to provide us with your solution, but the most important thing for you to do is **describe your problem first**. Understanding your use case will help us contextualize the issue you're facing in relation to similar problems other users may be reporting. Having this context will enable us to find a potentially more impactful solution which may solve several problems at once.

### How to Reproduce

**It is extremely difficult, if not impossible, for us to resolve issues if we can't reproduce them. The most impactful thing you can do is provide us with a repo with a reproducible bug that can be cloned and run.**


## Writing Documentation

guardianui documentation resides in a separate repo with its own dependencies and build tools. See [Documentation Contributing Guidelines] (INSERT LINK)

## Writing Code

Make sure you're running Node.js 14+ and NPM 8+, to verify and upgrade NPM do:

```bash
node --version
npm --version
npm i -g npm@latest
```

1. Clone this repository

```bash
git clone https://github.com/microsoft/playwright
cd playwright
```

2. Install dependencies

```bash
npm ci
```

3. Build Playwright

```bash
npm run build
```

4. Run all Playwright tests locally. For more information about tests, read [Running & Writing Tests](#running--writing-tests).

```bash
npm test
```

### Code Style

- Coding style is fully defined in [.eslintrc](https://github.com/microsoft/playwright/blob/main/.eslintrc.js)
- Comments should be generally avoided. If the code would not be understood without comments, consider re-writing the code to make it self-explanatory.

To run code linter, use:

```bash
npm run eslint
```

### API guidelines

When authoring new API methods, consider the following:

- Expose as little information as needed. When in doubt, don’t expose new information.
- Methods are used in favor of getters/setters.
  - The only exception is namespaces, e.g. `page.keyboard` and `page.coverage`
- All string literals must be lowercase. This includes event names and option values.
- Avoid adding "sugar" API (API that is trivially implementable in user-space) unless they're **very** common.

### Commit Messages

Commit messages should follow the Semantic Commit Messages format:

```
label(namespace): title

description

footer
```

1. *label* is one of the following:
    - `fix` - guardianui bug fixes.
    - `feat` - guardianui features.
    - `docs` - changes to docs, e.g. `docs(api.md): ..` to change documentation.
    - `test` - changes to guardianui tests infrastructure.
    - `devops` - build-related work, e.g. CI related patches and general changes to the browser build infrastructure
    - `chore` - everything that doesn't fall under previous categories
2. *namespace* is put in parenthesis after label and is optional. Must be lowercase.
3. *title* is a brief summary of changes.
4. *description* is **optional**, new-line separated from title and is in present tense.
5. *footer* is **optional**, new-line separated from *description* and contains "fixes" / "references" attribution to github issues.

Example:

```
fix(firefox): make sure session cookies work

This patch fixes session cookies in the firefox browser.

Fixes #123, fixes #234
```

### Getting Started

The project utilizes [yarn workspaces](https://yarnpkg.com/lang/en/docs/workspaces/) and leverages [lerna](https://lerna.js.org/) to orchestrate running within the context of one or more packages. While it is not as important to understand lerna or yarn workspaces, it **is important** to note that running scripts or installing new dependencies should always happen from the repo's root directory.

> **⚠ Running on Windows?**
>
> If you are running a Windows operating system, you may encounter some commands that are not working. In order to resolve paths correctly during the development build process, you may need to explicitly set your default `yarn` shell script to Command Prompt by using the following command:
>```bash
> yarn config set script-shell "C:\\Windows\\system32\\cmd.exe"
>```

**Install all dependencies:**

```bash
yarn
```

This will install all the dependencies for the repo and perform a preliminary build.

**Next, start the app:**

```bash
yarn start
```

If there are errors building the packages, prefix the commands with `DEBUG=cypress:*` to see more details. This outputs a lot of debugging lines. To focus on an individual module, run with `DEBUG=cypress:launcher:*` for instance. See ["Debug logs"](./guides/debug-logs.md) for more info.

When running `yarn start` this routes through the CLI and eventually calls `yarn dev` with the proper arguments. This enables Cypress day-to-day development to match the logic of the built binary + CLI integration.

If you want to bypass the CLI entirely, you can use the `yarn dev` task and pass arguments directly. For example, to headlessly run a project in a given folder, while trying to record to Cypress Cloud.

```text
yarn dev --run-project /project/folder --record --key <key>
```

### Adding New Dependencies

For all dependencies (both installation and development):
- **Do not add** a dependency if the desired functionality is easily implementable.
- If adding a dependency, it should be well-maintained and trustworthy.

A barrier for introducing new installation dependencies is especially high:
- **Do not add** installation dependency unless it's critical to project success.

### Running & Writing Tests

- Every feature should be accompanied by a test.
- Every public api event/method should be accompanied by a test.
- Tests should be *hermetic*. Tests should not depend on external services.
- Tests should work on all three platforms: Mac, Linux and Windows. This is especially important for screenshot tests.

Playwright tests are located in [`tests`] (INSERT LINK) and use `@playwright/test` test runner.
These are integration tests, making sure public API methods and events work as expected.

- To run all tests:

```bash
npm run test
```

- To run all tests in Chromium
```bash
npm run ctest # also `ftest` for firefox and `wtest` for WebKit
```

- To run a specific test, substitute `it` with `it.only`, or use the `--grep 'My test'` CLI parameter:

```js
...
// Using "it.only" to run a specific test
it.only('should work', async ({server, page}) => {
  const response = await page.goto(server.EMPTY_PAGE);
  expect(response.ok).toBe(true);
});
// or
playwright test --config=xxx --grep 'should work'
```

- To disable a specific test, substitute `it` with `it.skip`:

```js
...
// Using "it.skip" to skip a specific test
it.skip('should work', async ({server, page}) => {
  const response = await page.goto(server.EMPTY_PAGE);
  expect(response.ok).toBe(true);
});
```

- To run tests in non-headless (headed) mode:

```bash
npm run ctest -- --headed
```

- To run tests with custom browser executable, specify `CRPATH`, `WKPATH` or `FFPATH` env variable that points to browser executable:

```bash
CRPATH=<path-to-executable> npm run ctest
```

- To run tests in slow-mode:

```bash
SLOW_MO=500 npm run wtest -- --headed
```

- When should a test be marked with `skip` or `fail`?

  - **`skip(condition)`**: This test *should ***never*** work* for `condition`
    where `condition` is usually a certain browser like `FFOX` (for Firefox),
    `WEBKIT` (for WebKit), and `CHROMIUM` (for Chromium).

    For example, the [alt-click downloads test](https://github.com/microsoft/playwright/blob/471ccc72d3f0847caa36f629b394a028c7750d93/test/download.spec.js#L86) is marked
    with `skip(FFOX)` since an alt-click in Firefox will not produce a download
    even if a person was driving the browser.


  - **`fail(condition)`**: This test *should ***eventually*** work* for `condition`
    where `condition` is usually a certain browser like `FFOX` (for Firefox),
    `WEBKIT` (for WebKit), and `CHROMIUM` (for Chromium).

    For example, the [alt-click downloads test](https://github.com/microsoft/playwright/blob/471ccc72d3f0847caa36f629b394a028c7750d93/test/download.spec.js#L86) is marked
    with `fail(CHROMIUM || WEBKIT)` since Playwright performing these actions
    currently diverges from what a user would experience driving a Chromium or
    WebKit.


#### Docker

Sometimes tests pass locally, but fail in CI. Our CI environment is dockerized. In order to run the image used in CI locally:

1. [Install Docker](https://docs.docker.com/install/) and get it running on your machine.
2. Run the following command from the root of the project:

```shell
$ yarn docker
```

There is a script [scripts/run-docker-local.sh](scripts/run-docker-local.sh) that runs the cypress image (see [CircleCI config](.circleci/config.yml) for the current image name).

The image will start and will map the root of the repository to `/cypress` inside the image. Now you can modify the files using your favorite environment and rerun tests inside the docker environment.

#### Docker for built binary

You can also use Docker to simulate and debug the built binary. In a temporary folder (for example from the folder `/tmp/test-folder/`) start a Docker image:

```shell
$ docker run -it -w /app -v $PWD:/app cypress/base:8 /bin/bash
```

Point the installation at a specific beta binary and NPM package archive (if needed) and _set local cache folder_ to unzip the downloaded binary into a subfolder.

```shell
$ export CYPRESS_INSTALL_BINARY=https://cdn.cypress.io/beta/.../cypress.zip
$ export CYPRESS_CACHE_FOLDER=./cypress-cache
$ yarn add https://cdn.cypress.io/beta/npm/.../cypress.tgz
```

Note that unzipping the Linux binary inside a Docker container onto a mapped volume drive is *slow*. But once this is done you can modify the application resource folder in the local folder `/tmp/test-folder/node_modules/cypress/cypress-cache/3.3.0/Cypress/resources/app` to debug issues.

## Contributor License Agreement

This project welcomes contributions and suggestions.  Most contributions require you to agree to a
Contributor License Agreement (CLA) declaring that you have the right to, and actually do, grant us
the rights to use your contribution. For details, visit https://cla.opensource.microsoft.com.

When you submit a pull request, a CLA bot will automatically determine whether you need to provide
a CLA and decorate the PR appropriately (e.g., status check, comment). Simply follow the instructions
provided by the bot. You will only need to do this once across all repos using our CLA.

## Attribution

Both [Playright](https://github.com/microsoft/playwright) and [Cypress](https://github.com/cypress-io/cypress) have fantastic docs and processes. Many areas of our docs are inspired by their docs 🤝

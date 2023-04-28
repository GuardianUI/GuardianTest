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
- [Help triage existing issues](https://github.com/GuardianUI/guardianui/issues).
- Write code to address an issue. We have some issues labeled as [`good first issue`](https://github.com/GuardianUI/guardianui/issues) that are a good place to start. Please be sure to take a moment to review this entire document **before submitting a pull request.** 

If you want to contribute, but aren't sure where to start, you can create a [new discussion](https://github.com/GuardianUI/guardianui/discussions).

<br>

> **Note**
>
> **Please review the [Discussions]((https://github.com/GuardianUI/guardianui/discussions)) or ask first before starting work on any significant new features.**
>
> It's never a fun experience to have your pull request declined after investing time and effort into a new feature. To avoid this from happening, we request that contributors create a [feature request](https://github.com/GuardianUI/guardianui/discussions/new?category=ideas) to first discuss any changes or significant new ideas.

<br>

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Opening Issues](#opening-issues)
   - [Update guardianui](#update-guardianui)
   - [Getting More Information](#getting-more-information)
   - [Complete the Issue Template](#complete-the-issue-template)
   - [Describe Your Problem](#describe-your-problem)
   - [How to Reproduce](#how-to-reproduce)
- [Writing Documentation](#writing-documentation)
- [Writing Code](#writing-code)
  - [Getting Code](#getting-code)
  - [Code Style](#code-style)
  - [API Guidelines](#api-guidelines)
  - [Commit Messages](#commit-messages)
  - [Running and Writing Tests](#running-and-writing-tests)

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

### Getting Code

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

### Adding New Dependencies

For all dependencies (both installation and development):
- **Do not add** a dependency if the desired functionality is easily implementable.
- If adding a dependency, it should be well-maintained and trustworthy.

A barrier for introducing new installation dependencies is especially high:
- **Do not add** installation dependency unless it's critical to project success.

### Running and Writing Tests

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

## Contributor License Agreement

This project welcomes contributions and suggestions.  Most contributions require you to agree to a
Contributor License Agreement (CLA) declaring that you have the right to, and actually do, grant us
the rights to use your contribution. For details, visit https://cla.opensource.microsoft.com.

When you submit a pull request, a CLA bot will automatically determine whether you need to provide
a CLA and decorate the PR appropriately (e.g., status check, comment). Simply follow the instructions
provided by the bot. You will only need to do this once across all repos using our CLA.

## Attribution

Both [Playright](https://github.com/microsoft/playwright) and [Cypress](https://github.com/cypress-io/cypress) have fantastic docs and processes. Many areas of our docs are inspired by their docs 🤝

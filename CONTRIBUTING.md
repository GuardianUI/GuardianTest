# Contributing

Thanks for your interest in contributing to GuardianTest! 😄

**Once you learn how to use GuardianTest, you can contribute in lots of ways:**

- Join the [GuardianUI Discord](https://discord.gg/TkfeTpfYxx) and answer questions. Teaching others how to use GuardianTest is a great way to learn more about how it works.
- Create content about GuardianTest. Whether it's a blog post, youtube video tutorial, tweet, or anything in between, sharing information and guidance is a great way to engage the community. Be sure to tag us on [twitter](https://twitter.com/guardian_ui) when you post it so we can share it as well. We may also feature it on our website!
- Contribute to our docs to improve our [existing docs](https://github.com/GuardianUI/guardianui-documentation).
- Host a meetup or online workshop. [Contact us](mailto:support@guardianui.com) if you want our help coordinating or potential involvement. 🚀

**Interested in contributing to the development of GuardianTest? There are several ways to do so.**

- [Report bugs](https://github.com/GuardianUI/guardianui/issues/new/choose) by opening an issue.
- [Request features](https://github.com/GuardianUI/guardianui/discussions/new?category=ideas) by starting a discussion.
- [Help triage existing issues](https://github.com/GuardianUI/guardianui/issues).
- Write code to address an issue. We have some issues labeled as [`good first issue`](https://github.com/GuardianUI/guardianui/issues) that are a good place to start. Please be sure to take a moment to review this entire document **before submitting a pull request.**

If you want to contribute, but aren't sure where to start, you can create a [new discussion](https://github.com/GuardianUI/guardianui/discussions).

<br>

> **Note**
>
> **Please review the [Discussions](<(https://github.com/GuardianUI/guardianui/discussions)>) or ask first before starting work on any significant new features.**
>
> It's never a fun experience to have your pull request declined after investing time and effort into a new feature. To avoid this from happening, we request that contributors create a [feature request](https://github.com/GuardianUI/guardianui/discussions/new?category=ideas) to first discuss any changes or significant new ideas.

<br>

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Opening Issues](#opening-issues)
  - [Update GuardianTest](#update-GuardianTest)
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
- [Update GuardianTest](#update-GuardianTest).
- [Gather debugging info](#getting-more-information).
- [Complete the issue template](#complete-the-issue-template).
- [Describe your problem](#describe-your-problem).
- [Explain how to reproduce the issue](#how-to-reproduce).

If you've gone through these steps, are up to date, supported, have collected information about the problem, and have the best reproduction instructions you can give, you are ready to [open an issue](https://github.com/GuardianUI/guardianui/issues).

### Update GuardianTest

Before creating a bug report, make sure you are up to date. Your issue may have already been fixed. Even if you do not see the issue described as resolved in a newer version, a newer version may help in the process of debugging your issue by giving more helpful error messages.

[See our document on installing GuardianTest](https://github.com/GuardianUI/guardianui-documentation/blob/main/getting-started/installation.md)

### Getting More Information

For some issues, there are places you can check for more information. This may help you resolve the issue yourself. Even if it doesn't, this information can help us figure out and resolve an issue.

- For issues in the web browser, check the JavaScript console and your Network tab in your DevTools.
- Click on any command in the Command Log where the failure occurred, this will log more information about the error to the JavaScript console.
- Ask other GuardianTest users for help in our or [Discord](https://discord.gg/TkfeTpfYxx).

### Complete the Issue Template

Please use the provided [issue template](https://github.com/GuardianUI/guardianui/issues/new/choose) to submit your issue. The template includes the information needed for us to continue forward with your problem. Any issues that don't fill out the issue template will be closed.

### Describe Your Problem

It can be tempting to provide us with your solution, but the most important thing for you to do is **describe your problem first**. Understanding your use case will help us contextualize the issue you're facing in relation to similar problems other users may be reporting. Having this context will enable us to find a potentially more impactful solution which may solve several problems at once.

### How to Reproduce

**It is extremely difficult, if not impossible, for us to resolve issues if we can't reproduce them. The most impactful thing you can do is provide us with a repo with a reproducible bug that can be cloned and run.**

## Writing Documentation

GuardianTest documentation resides in a separate repo with its own dependencies and build tools. See [Documentation Contributing Guidelines] (INSERT LINK)

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
git clone https://github.com/GuardianUI/GuardianTest
cd GuardianTest
```

2. Install dependencies

```bash
npm install
```

or

```bash
yarn
```

### Code Style

- Keep the code as clear and self-explanatory as possible.
- If there is a particularly complicated piece of code or code that was added due to bumping into many implementation issues, add a comment to explain the reasoning.

### Commit Messages

Commit messages should follow the Semantic Commit Messages format:

```
label(namespace): title

description

footer
```

1. _label_ is one of the following:
   - `fix` - GuardianTest bug fixes.
   - `feat` - GuardianTest features.
   - `docs` - changes to docs, e.g. `docs(api.md): ..` to change documentation.
   - `test` - changes to GuardianTest tests infrastructure.
   - `devops` - build-related work, e.g. CI related patches and general changes to the browser build infrastructure
   - `chore` - everything that doesn't fall under previous categories
2. _namespace_ is put in parenthesis after label and is optional. Must be lowercase.
3. _title_ is a brief summary of changes.
4. _description_ is **optional**, new-line separated from title and is in present tense.
5. _footer_ is **optional**, new-line separated from _description_ and contains "fixes" / "references" attribution to github issues.

Example:

```
chore(mocking): improve consistency of allowance mocking

This patch helps reduce potential issues around value collisions when mocking allowance values.

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
- Tests should be _hermetic_. Tests should not depend on external services.
- Tests should work on all three platforms: Mac, Linux and Windows. This is especially important for screenshot tests.
- Tests are currently written with [jest](https://jestjs.io/docs/getting-started)

- To run all tests:

```bash
npm run test:unit
```

or

```bash
yarn test:unit
```

## Contributor License Agreement

This project welcomes contributions and suggestions. Most contributions require you to agree to a
Contributor License Agreement (CLA) declaring that you have the right to, and actually do, grant us
the rights to use your contribution. For details, visit our [CLA](https://github.com/GuardianUI/GuardianTest/blob/main/CLA.md).

When you submit a pull request, a CLA bot will automatically determine whether you need to provide
a CLA and decorate the PR appropriately (e.g., status check, comment). Simply follow the instructions
provided by the bot. You will only need to do this once across all repos using our CLA.

## Attribution

Both [Playright](https://github.com/microsoft/playwright) and [Cypress](https://github.com/cypress-io/cypress) have fantastic docs and processes. Many areas of our docs are inspired by their docs 🤝

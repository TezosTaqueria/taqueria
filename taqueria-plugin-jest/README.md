# Jest plugin for Taqueria

Authors:    Michael Weichert <<michael.weichert@ecadlabs.com>>

Date:       Apr 7, 2022

Revision:   1

---

This plugin integrates automated testing into your workflow via the Jest Testing Framework.

Our Jest plugin exposes the following tasks:

`taq init [testsDir]`

Initializes the Jest plugin and Jest Testing Framework. Manual invocations of this task are not usually required, as uninitialzed test folders will be initialzed automatically. However, for explicit control, `taq init` is available as a task for your convenience.

When executed, a _.taq/jest.config.js_ file is created if one doesn't exist, and then too, a _jest.config.js_ is created in _testsDir_ as specified in the positional arguments. _testsDir_ defaults to _jestTestsRootDir if no value was provided.

The _.taq/jest.config.js_ is known as the global jest configuration, and any other _jest.config.js_ files will inherit and override settings defined in the global jest configuration.

E.g, below is an example of a _jest.config.js_ file that would get created in your _jestTestsRootDir_:
```
module.exports = {
  ...require("/.taq/jest.config.js"),
 // Set custom configuration here
}
```

This assures that you can centralize Jest configuration settings that are global to your project, and yet allow granular and individual tweaks for particular use-cases.


`taq test [testsDir] [pattern]`

The _test_ task is used to execute your automated tests using the Jest testing framework. Running `taq test` would scan the _jestTestsRootDir_ directory, which defaults to _./tests_. The __jestTestsRootDir_ is a configuration setting specified in your .taq/config.json, and may be changed at any time.

Running `taq test` without specifying a _testsDir_ will default to working with _jestTestsRootDir_. A pattern can be specified to pattern-match against filenames in the _testsDir_ to limit what automated tests are executed.

If the _jest.config.js_ file is missing in the specified _testsDir_, then `taq init [testsDir]` will be invoked automatically.

## Testing Directories / Partitions

Tests can be segmented into partitions, exposed as separate directories underneath the _jestTestsRootDir_ directory. This is sometimes desired to achieve a logical tree-like directory structure for organizational purposes. For instance, a developer may wish to segment their tests for smart contracts from the tests used to test a web application that interacts with the smart contract.

To do this, the developer could create two partitions:

`taq test contracts`

`taq test app`

This would create and initialize two partitions for writing Jest automated tests. Assuming your _jestTestsRootDir_ hasn't been customized, then it will default to _./tests_ and the directory structure will look like the following:
- tests
- tests/contracts
- tests/app

To run all automated tests in the contracts partition, a developer would run:

`taq test contracts`.

To run all tests, regardless of partition, a developer could run

`taq test`.

## Compatibility with other Testing Plugins

Its expected that other plugins will provide integration with testing frameworks other than Jest. For instance, the LIGO plugin is expected to provide integration with the LIGO Testing Framework which improve the developer workflow for smart contracts authored in one of many syntax available in the LIGO language.

For instance, a developer may wish to organize their tests as such:
- tests
- tests/contracts (using the LIGO testing framework)
- tests/app (using the Jest testing framework)

To do so, a developer would change their _jestTestsRootDir_ to _tests/app_ and _ligoTestsRootDir_ to _tests/contracts_.

A developer could run their tests written with LIGO with:

`taq test --plugin ligo`

Likewise, for Jest a developer would run:

`taq test --plugin jest`

## Future considerations

### End-developer defined tasks

As first mentioned in the State Architecture Design Document, a developer should have the ability to define their own tasks that can integrated into their workflow.

End-developer defined tasks are configurated in _.taq/config.json_.

This capability offers the ability to define a task which wraps existing ones.

E.g.:

```json
...,
"tasks": {
  "test": {
    "handler": "taq test --plugin ligo && taq test --plugin ligo"
  }
} 
```

This would expose a task that would run all tests defined using the LIGO and Jest plugin:

`taq run test`
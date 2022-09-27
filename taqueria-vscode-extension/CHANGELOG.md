# Change Log

# Taqueria v0.8.0   

| Details     |               |
| ----------- | ------------- |
|Release Date | July 15, 2022 |
|Release Type | Minor         |
|Release Page | [v0.8.0](https://github.com/ecadlabs/taqueria/releases/tag/v0.8.0) |

## Summary of Impactful Changes

- The VS Code Extension (VSCE) now has a GUI and significant UX improvements
- Taqueria plugins can now expose templates and the comptiler plugins now have a `taq create contract` task
- Taqueria now supports multi-file Ligo smart contracts
- Contract registry: enables powerful functionality when working with contracts in Taqueria
- IPFS Pinata Plugin - Upload and pin metadata or other files with the new `@taqueria/plugin-ipfs-pinata` plugin
- Added missing functionality from the VSCE 
- The initial storage values in `config.json` now support complex data types via object literals
- Support for contract and token metadata
- Taqueria now has a GitHub action for use in CI/CD Pipelines

### Conceptual Changes to Note

- Taqueria now requires contracts to be registered in order to compile and originate them
- For multi-file contracts, register the file that contains the `main` entrypoint
- Contracts created using templates 'taq create contract <contractName>` are automatically registered
- Contracts added to the project's `contracts` directory are registered using `taq add-contract <contractName>`
- Taqueria now supports plugin templates which provide a means for plugins to create artifacts
- Compiler plugins now come with a template to create a new contract which is automatically registered `taq create contract <contractName>`

## New Features

### Contract Registry

Taqueria now has a contract registry which provides support for multi-file contracts, and will support advanced state management features in the future

***With this release, contracts now have to be registered in Taqueria in order to compile or originate them***

There are two paths to register a contract:

1. Add a Ligo or Archetype contract to the `contracts` directory, then run `taq add-contract <contractName>`. This will register the contract you have added to the `contracts` directory 
2. Create a Ligo or Archetype contract from a template. Install a compiler plugin and then run `taq create contract <contractName>`. This will create a new contract in the `contracts` directory, and will register the contract

In order to view the contracts currently registered on a project, you can run:

```shell
taq list-contracts
```

:::note
If you are working with multi-file Ligo smart contracts, only register the files that contain the `main` entrypoint
:::

#### Contract Registry Tasks

The contract registry adds three new tasks to Taqueria:

| Command                        | Description
|--------------------------------|-----------------------------------------------|
| taq add-contract <sourceFile>  | Add a contract to the contract registry       |
| taq rm-contract <contractName> | Remove a contract from the contract registry  |
| taq list-contracts             | List registered contracts                     |

### Plugin Templates

Taqueria now provides plugin developers a way to expose templates to users. In this release, templates are used by the compiler plugins to provide an easy way to create and register a contract

Templates use the `taq create <templateName>` task and will appear in the help menu once a supporting plugin is installed

#### Usage

To use templates to create a new Ligo or Archetype contract, you will run the `taq create contract <contractName>` task

For example, to create a new Ligo contract called `taco-shop` using the jsligo syntax, you would run:

```shell
taq create contract taco-shop.jsligo
```

You will see the contract is created in the `contracts` directory and the contract has been added to the contract registry. You can confirm this by running `taq list-contracts`

### New Plugin: `@taqueria/plugin-ipfs-pinata`

pluginName: `@taqueria/plugin-ipfs-pinata`

Included in this release is the first version of the Taqueria IPFS Pinata plugin. This plugin provides a `publish` task which uploads files from the specified directory to IPFS via Pinata

The structure of the publish task is: `taq publish <path>`

The plugin takes a path as a positional argument and will publish the files from that directory to IPFS

#### Installation

To install the IPFS Pinata plugin on a Taqueria project, run the following:

```shell
taq install @taqueria/plugin-ipfs-pinata
```

#### Use 

To use this plugin, add a metadata or media file to a directory (`dirName`) inside your project, and then run `taq publish <dirName>`

### Taqueria Github Action

Taqueria now provides a GitHub action which has been published on the GitHub marketplace

This action allows you to use Taqueria in your CI/CD pipeline so you can test, deploy, and maintain your projects in CI as you do locally

The action can be found on the marketplace here

For more information, VIEW THE DOCS or see a live example in the TACO-SHOP-SCAFFOLD REPO

## Migrating from Legacy Versions

This release of Taqueria introduces breaking changes to the way contracts are managed in Taqueria. To migrate existing projects, you will need to follow these steps:

1. Ensure you are running Taqueria v0.8.0: `taq --version`
2. Update Taqueria plugins to the latest version: `npm update && npm i`
3. Add each contract you would like to compile or originate to the contract registry: `taq add-contract <contractName>`

:::note
If you are working with a multi-file Ligo contract, only register the file which contains the `main` entrypoint
:::

Once all your contract

## Other Product Changes

### Bugfixes

- SDK's getContracts method not honoring regex pattern [#1011](https://github.com/ecadlabs/taqueria/issues/1011/)
- Fix build pipeline: lock parcel to v2.6.1 [#1007](https://github.com/ecadlabs/taqueria/issues/1007/)
- Fix scaffold verbosity by writing stdOut to `scaffold.log` file [#1001](https://github.com/ecadlabs/taqueria/issues/1001/)
- Adjust jest plugin to return appropriate exit code [#995](https://github.com/ecadlabs/taqueria/issues/995/)
- Updated tests to ensure sure npm package.json is available in all test projects [#899](https://github.com/ecadlabs/taqueria/issues/899/)
- Enable all commands in the VSCE when config cannot be loaded [#955](https://github.com/ecadlabs/taqueria/issues/955/)
- Fix `taq` runtime bug [#983](https://github.com/ecadlabs/taqueria/issues/983/)
- Show error for all contracts that lack storage [#950](https://github.com/ecadlabs/taqueria/issues/950/)


### Other Improvements

- Compiler plugins refactored to use registered contracts [#981](https://github.com/ecadlabs/taqueria/issues/981/)
- CI/CD now uses Deno package caching [#982](https://github.com/ecadlabs/taqueria/issues/982/)
- Improvements to the `taq scaffold` task [#966](https://github.com/ecadlabs/taqueria/issues/966/) [#953](https://github.com/ecadlabs/taqueria/issues/953/)
- Scaffolds now use a file `scaffold.json` to define a postInit script run during task execution [#993](https://github.com/ecadlabs/taqueria/issues/993/)
- Added a contract template for Archetype [#984](https://github.com/ecadlabs/taqueria/issues/984/)
- Refactor of automated tests: separate cli commands into separate files [#909](https://github.com/ecadlabs/taqueria/issues/909/)
- Changed the partition's config file to use relative path #951 [#951](https://github.com/ecadlabs/taqueria/issues/951/)
- Added tests for all Michelson data types [#919](https://github.com/ecadlabs/taqueria/issues/919/)
- Update Taquito to v13 [#951](https://github.com/ecadlabs/taqueria/issues/951/)
- The VLCE is now a `workspace` type project [#971](https://github.com/ecadlabs/taqueria/issues/971/)
- Added the template construct [#946](https://github.com/ecadlabs/taqueria/issues/946/)
- Added ability to register contracts [#908](https://github.com/ecadlabs/taqueria/issues/908/)

# Taqueria v0.6.5   

| Details     |               |
| ----------- | ------------- |
|Release Date | June 30, 2022 |
|Release Type | Minor         |
|Release Page | [v0.6.5](https://github.com/ecadlabs/taqueria/releases/tag/v0.6.5) |

## Summary of Impactful Changes

- The Taqueria VS Code Extension now dynamically shows and hides available tasks based on project context
- Optional usage analytics added to the CLI
- Added support for more plugins and supported tasks in the VS Code Extension

## Bug Fixes 

- Fixed a docker image permission issue 
- Fixed the failing assertion when test project initialized
- Fixed issue where config.json content would be trimmed

## Other Improvements

- Logging for the VS Code Extension
- Support for provisioning stateful operations added under the hood
- Migrated automated tests to use ghostnet

# Taqueria v0.4.2   

| Details     |               |
| ----------- | ------------- |
|Release Date | June 8, 2022  |
|Release Type | Patch         |
|Release Page | [v0.4.2](https://github.com/ecadlabs/taqueria/releases/tag/v0.4.2) |

## Summary of Impactful Changes

- [Bug Fix] VS Code Extension doesn't update `config.json` with installed plugin when installing from NPM

# Taqueria v0.4.0   

| Details     |               |
| ----------- | ------------- |
|Release Date | June 6, 2022  |
|Release Type | Major         |
|Release Page | [v0.4.0](https://github.com/ecadlabs/taqueria/releases/tag/v0.4.0) |

## Summary of Impactful Changes

- Taqueria State functionality
- A new JS/TS library `@taqueria/state` to interact with Taqueria State (access data persisted to state and reference accounts by name)
- A new plugin `@taqueria/plugin-jest` that allows you to test your smart contracts and dapps with Jest in creative and powerful ways  
- Implicit accounts and desired balances are declared at the root of the config.json file **Note: Breaking Change!**
- Robust data integrity checks following the "parse; don't validate" practice
- @taqueria/plugin-taquito - The `originate` task is now stateful and persists the contract address
- @taqueria/plugin-tezos-client -  Added support for invoking endpoints by annotation

## New features

### Taqueria State

> Message from the Taqueria team:
`We've made many under-the-hood changes to give Taqueria a wide array of capabilities when it comes to persisting the state of your project. Although they're not visible on the surface, you'll soon have the ability to provision on-chain and off-chain operations which produce outputs that persist across the project lifecycle and environments
These operations can link to and depend on one-another.` 
`Internally they are represented as a directed acyclic graph (DAG) which will ultimately provide much flexibility and powerful capabilities. We don't want to spoil this for you, but just know that we've put all the things in place to start making this visible very shortly!`

Taqueria now keeps a record of the stateful tasks and operations executed, along with the values in the resulting state  

In the initial implementation, `@taqueria/plugin-taquito` has been refactored so the `taq originate` task is now stateful. When run, a record is created which includes the deployed contract address

This data is stored in a new auto-generated file named `development-state.json`. This file is JSON encoded and is stored in the `./.taq` directory of the project


> Note: This file is not generated until the first time you run a supported task or operation. Currently, this will occur the first time you run `taq originate` in the project



Records follow the format shown below:

```json
        "@taqueria/plugin-taquito.deploy.1654212273655": {
            "time": 1654212273655,
            "output": [
                {
                    "contract": "test.tz",
                    "address": "KT1ShFinJPuXqdAUXomKAB8t6s3q6JGjAN2G",
                    "destination": "local"
                }
            ]
        }
```



> Note: At this time, only the `originate` task is supported but full support for operations and additional plugin tasks is coming soon!

### The `@taqueria/state` Library

Included in this release is a new NPM package `@taqueria/state`. This is an abstraction library which provides an easy way to interact with Taqueria State

To install the library on your project, run:

```shell
taq install @taqueria/state
```

To use the package in your front end code or tests, you can import it into any JS or TS file:

```js
import loadProject from "@taqueria/state"
```

Once imported, you can retrieve the list of originations like this:

```js
const {getOriginations} = await loadProject()
const results = getOriginations("increment.tz")
console.log(results)
```

To retrieve the most recently deployed version of a contract and the address:


```js
const [latest] = getOriginations("increment.tz")
```

To retrieve a list of all contracts deployed to the sandbox `local`:

```js
const results = getOriginations()
     .filter(contract => contract.destination === "local")
```

## Jest Plugin 

pluginName: `@taqueria/plugin-jest`

> Note: The Taqueria team is excited to include the first version of the Jest plugin `@taqueria/plugin-jest` in this release. This plugin allows you to partition your tests in powerful and flexible ways while easing the burden of managing Jest configuration files. The next feature already under active development is automatic test stub generation from Michelson files using generated types

The `@taqueria/plugin-jest` plugin provides the `taq test` task which provides a means to instantiate test directories and run Jest tests

### Installation

To install the Jest plugin on a Taqueria project, run:

```shell
taq install @taqueria/plugin-jest
```

### Usage

The Jest plugin will automatically initialize a Jest test directory when you run `taq test <test-directory>`

The easiest way to start using the plugin is to:

1. Create a new directory in the root of your project `/tests`
2. Add one or more tests to the directory
3. Run `taq test tests`


### Initializing Partitions

The Jest plugin uses partitions. These are just directories with their own JEST config but allow you to group and manage your tests with great flexibility. This allows you to segment and run tests in different buckets such as:

- By type (unit tests, integration tests, acceptance tests, e2e tests)
- Structural (dapp, smart contract, serverless functions)

To create a new partition (initialized test directory), run:

```shell
taq test --init
```

This will do several things:

- Create a new directory (in this case it uses the default directory `/tests`)
- Create a Jest configuration in the directory
- Create a global Jest configuration file in `./.taq/jest.config.js`

> Note: You can create any number of partitions. By default there are no partitions

To create additional partitions, simply run:

```shell
taq test [partitionName]`
```

### Running Jest tests

The `taq test [partitionName]` task will run the Jest tests associated with a particular partition

Create tests in that folder `tests/example.spec.ts`

### Jest Configuration

A Global Config for Jest is created in the project's Taq directory: `./.taq/jest.config.js`

Each partition will have it's own Jest configuration file (`./tests/jest.config.js`)

The Jest configurations cascade down from the global config. If you want to override a value in the global config, simply define it in the partition config. The partition config will override the global config

> Note: The default root directory for Jest can be overridden by setting `"jestTestsRootDir"` in `taqueria.config.js`

## Implicit accounts

> WARNING: This release makes a breaking change to the schema of `config.json`. If you use Taqueria v0.4.0 on an existing project, you will need to make minor adjustments to your `config.json` file

Taqueria now allows you to be declarative when naming your implicit accounts and the desired balance for each. These accounts are declared at the root level in `config.json`. Previously, accounts were defined in each sandbox configuration

The default configuration for Taqueria projects includes five pre-defined accounts as shown here:

```json
{
    "language": "en",
    "plugins": [ ],
    "contractsDir": "contracts",
    "testsDir": "tests",
    "artifactsDir": "artifacts",
    "environment": {
        "default": "development",
        "development": {
            "networks": [],
            "sandboxes": [
                "local"
            ],
        }
    },
    "sandbox": {
        "local": {
            "label": "Local Tezos Sandbox",
            "protocol": "PtKathmankSpLLDALzWw7CGD2j2MtyveTwboEYokqUCP4a1LxMg",
            "rpcUrl": "http://localhost:20000"
        }
    },
    "network": {},
    "accounts": {
        "bob": "3_000_000_000",
        "alice": "3_000_000_000",
        "john": "3_000_000_000",
        "jane": "3_000_000_000",
        "joe": "3_000_000_000"
    }
}
```

You may define as many accounts as you need. Taqueria imposes no limits on how many accounts you would like to reference in your project

These accounts will be created and funded automatically when a sandbox starts. After starting a sandbox, you will see the defined accounts appear in the configuration:

```json
{
    "sandbox": {
        "local": {
            "accounts": {
                "bob": {
                    "encryptedKey": "edpkurPsQ8eUApnLUJ9ZPDvu98E8VNj4KtJa1aZr16Cr5ow5VHKnz4",
                    "publicKeyHash": "tz1aSkwEot3L2kmUvcoxzjMomb9mvBNuzFK6",
                    "secretKey": "unencrypted:edsk3RFfvaFaxbHx8BMtEW1rKQcPtDML3LXjNqMNLCzC3wLC1bWbAt"
                },
                "alice": {
                    "encryptedKey": "edpkvGfYw3LyB1UcCahKQk4rF2tvbMUk8GFiTuMjL75uGXrpvKXhjn",
                    "publicKeyHash": "tz1VSUr8wwNhLAzempoch5d6hLRiTh8Cjcjb",
                    "secretKey": "unencrypted:edsk3QoqBuvdamxouPhin7swCvkQNgq4jP5KZPbwWNnwdZpSpJiEbq"
                }
            },
            "label": "Local Tezos Sandbox",
            "protocol": "PtKathmankSpLLDALzWw7CGD2j2MtyveTwboEYokqUCP4a1LxMg",
            "rpcUrl": "http://localhost:20000"
        }
    },
    "network": {},
    "accounts": {
        "bob": "3_000_000_000",
        "alice": "3_000_000_000"
    }
}
```

> Note: Future improvements will extend implicit account provisioning to testnets

To set a default account for a sandbox, you must now define it explicitly in the sandbox config:

```json
    "sandbox": {
        "local": {
            "accounts": {
                "default": "bob",
                "bob": {
                    "encryptedKey": "edpkurPsQ8eUApnLUJ9ZPDvu98E8VNj4KtJa1aZr16Cr5ow5VHKnz4",
                    "publicKeyHash": "tz1aSkwEot3L2kmUvcoxzjMomb9mvBNuzFK6",
                    "secretKey": "unencrypted:edsk3RFfvaFaxbHx8BMtEW1rKQcPtDML3LXjNqMNLCzC3wLC1bWbAt"
                },
                "alice": {
                    "encryptedKey": "edpkvGfYw3LyB1UcCahKQk4rF2tvbMUk8GFiTuMjL75uGXrpvKXhjn",
                    "publicKeyHash": "tz1VSUr8wwNhLAzempoch5d6hLRiTh8Cjcjb",
                    "secretKey": "unencrypted:edsk3QoqBuvdamxouPhin7swCvkQNgq4jP5KZPbwWNnwdZpSpJiEbq"
                }
            },
            "label": "Local Tezos Sandbox",
            "protocol": "PtKathmankSpLLDALzWw7CGD2j2MtyveTwboEYokqUCP4a1LxMg",
            "rpcUrl": "http://localhost:20000"
        }
    },
```

### Migration from Legacy Versions

To migrate a project to the new `config.json` schema, only minor changes are required:

1. Define your list of implicit accounts at the root level of `config.json`
2. Remove the "accounts" property from the "sandbox" config
3. (Optional) Set a default account for each sandbox

## Other Product Changes

### @taqueria/plugin-tezos-client - `simulate` task improved

The Tezos Client now supports invoking entrypoints by annotation. The flag `--entrypoint` has been added to the simulate task

For example, you can now invoke an entrypoint annotated `decrement` by running the following:

```shell
taq simulate sample.tz '3' --storage 5 --entrypoint decrement
```

Previously, a raw Michelson expression was required:

```shell
taq simulate sample.tz 'Left (Left 3)' --storage 5
```

### Reduced Number of CLI Commands Required

This release improves the Taqueria workflow by improving the `taq init` and `taq scaffold` tasks, reducing the number of CLI commands required to setup a project

Specifically:
- `taq init` now runs `npm init -y` implicitly
- `taq scaffold` now runs `taq init`, `npm i`, and several housekeeping tasks implicitly 

### Conceptual Changes to Note

- Taqueria has a new auto-generated file `development-state.json` located in the `./.taq/` directory 
- Taqueria's `ephermal state` (`state.json`) will now be referred to as the Taqueria `cache`
- Implicit accounts are now defined at the root level in the `config.json` file
- On startup, a sandbox will create and fund each defined implicit account  

### Bugfixes

- @taqueria/plugin-flextesa: Deploying multiple contracts can fail [#512](https://github.com/ecadlabs/taqueria/issues/512)
- @taqueria/plugin-flextesa: Contract contents in sandbox deployment don't match what is printed out in console message[#707](https://github.com/ecadlabs/taqueria/issues/707)
- @taqueria/plugin-tezos-client: Tezos client plugin storage or input value of 0 is treated as empty [#702](https://github.com/ecadlabs/taqueria/issues/702)

### Other Improvements

- The Taqueria protocol now uses schema based type enforcement 
- MacOS runners added to CI pipeline which has enabled automated testing in MacOs environments
- E2E tests now asynchronously and in batches, up to 4x faster 
- Plugin documentation is now all built from a common source
- Dependency injection added to VS Code Extension
- Improved test coverage of VS Code Extension

## [Shipped]

> For full detail on changes, fixes, and improvements made in each release, please refer to the [Taqueria Release Page](https://github.com/ecadlabs/taqueria/releases)

- April 2022:
  - Released the Archetype plugin
  - Released the Tezos-Client plugin
  - Added a new basic project scaffold `taqueria-scaffold-demo`

- March 2022:
  - Major refactor to the taqueria-sdk library
  - Improvements and bugfixes for the Flextesa plugin
  - Updated the UX for the Taquito plugin
  - Added Michelson types to the Contract Types plugin
  

- February 2022:
  - Project scaffolding
  - TS Type Generation from Michelson`.tz` files which includes:
    - A new Taqueria NPM plugin: @taqueria/plugin-contract-types
    - Awareness of generated types in VS Code Extension
      - Intellisense tooltips for contract parameters
      - Compile time type checking for TS types 


- January 2022:
  - CLI
  - Visual Studio Code Extension
  - Initialization of a Tezos Project
  - A demo smart contract and app, `hello-tacos`
  - Compile LIGO and SmartPy smart contracts
  - Using a local sandbox with test accounts
  - SDK for developers to build their own plugins
  - Origination to local, test, and main networks
  - Several plugins:
    - LIGO
    - SmartPy
    - Taquito
    - Flextesa

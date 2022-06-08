# Change Log

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
            "protocol": "Psithaca2MLRFYargivpo7YvUr7wUDqyxrdhC5CQq78mRvimz6A",
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
            "protocol": "Psithaca2MLRFYargivpo7YvUr7wUDqyxrdhC5CQq78mRvimz6A",
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
            "protocol": "Psithaca2MLRFYargivpo7YvUr7wUDqyxrdhC5CQq78mRvimz6A",
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

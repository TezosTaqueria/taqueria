# Taqueria Flextesa Plugin

[Flextesa](https://tezos.gitlab.io/flextesa/) is a flexible Tezos sandbox environment that's easy to work with. It runs a Tezos node and network in a Docker container on your local machine

This plugin provides the ability to easily configure and run Flextesa sandbox instances within Taqueria that you can use for development and testing
 
## Overview

With the Flextesa plugin you configure various sandboxes for use in Taqueria that you can start, stop, and query from the CLI and Visual Studio Code extension


Some helpful things to know:
- Multiple sandboxes can be configured and run concurrently
- You can configure the Tezos `protocol` for each sandbox to test against current, and future network upgrades
- Accounts and balances will be initialized each time a sandbox is started
- Sandboxes can be added to Taqueria environments and then targeted from the CLI using the `--env [envName]` option 

## Requirements

- Taqueria v0.26.0 or later
- Node.js v16.17.1 or later
- Docker v20.10.12 or later

## Installation

The Flextesa plugin is distributed as an NPM package that can be installed and uninstalled on a project from the Taqueria CLI

To install the Flextesa plugin on a Taqueria project, navigate to the project folder and run:
```shell
taq install @taqueria/plugin-flextesa
```

Once installed, you can confirm functionality by runing the command `taq start sandbox` which will start a sandbox with the default `local` configuration

> ### :page_with_curl: Note
> You can override the Flextesa version used by the plugin by creating the environment variable `TAQ_FLEXTESA_IMAGE` and setting it to your desired Flextesa Docker image

## CLI Commands

The Flextesa plugin allows you to start, stop, and query the sandboxes configured in `.taq/config.json` from the CLI

The following commands are available from the CLI:
- `taq start sandbox [sandboxName]`
- `taq stop sandbox [sandboxName]`
- `taq list accounts [sandboxName]`
- `taq bake [sandboxName]`
- `taq show protocols`

> ### :page_with_curl: Note
> The first time you start a sandbox, it might take several minutes to start. This is expected behaviour as it takes time to download the flextesa docker image to your computer

## Plugin Configuration

Configuration is done in the project's `.taq/config.json` file. Here you can configure additonal sandboxes


### The Default Sandbox Configuration

Named sandbox configurations are stored as key/value pairs in the `sandbox` property using the sandbox name as the key

This example shows the configuration for the default sandbox named `local`:

```json
    "sandbox": {
        "local": {
            "label": "Local Tezos Sandbox",
            "rpcUrl": "http://localhost:20000"
        }
```

When this sandbox is started, the implicit accounts defined in the configuration will be created on the sandbox and the `accounts` property will be populated with the account data as shown in this example:

```json
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
                },
                "john": {
                    "encryptedKey": "edpktt6t2ENhxiQqun6bXPPWC6tFVvNPTDRh1gEPGX4BgDgbDnmGzP",
                    "publicKeyHash": "tz1Zwoh1QCVAvJ4sVTojMp9pLYp6Ji4NoZy6",
                    "secretKey": "unencrypted:edsk3Un2KRUUoWZufi914HQem96ejVFnkyD8GXRPUSkgqy5etsYXEN"
                },
                "jane": {
                    "encryptedKey": "edpkvS6TDSWcqqj3EJi3NRrCMyN7oNw1B3Hp37R19tMThqM8YNhAuS",
                    "publicKeyHash": "tz1aHUAC4oviwJuZF1EvVSvFz7cu9KMNYBph",
                    "secretKey": "unencrypted:edsk3UkdS1UBfTBkMAoFxmfdmUHmCdNhTzDJ1cSJuZhU1b6k6fZZoQ"
                },
                "joe": {
                    "encryptedKey": "edpkuT1QYPYbLLQz9dXhQS33ncsixxeGHbNGmntPTR4VBbWmskHPrV",
                    "publicKeyHash": "tz1MVGjgD1YtAPwohsSfk8i3ZiT1yEGM2YXB",
                    "secretKey": "unencrypted:edsk3Un2FU9Zeb4KEoATWdpAqcX5JArMUj2ew8S4SuzhPRDmGoqNx2"
                }
            },
            "label": "Local Tezos Sandbox",
            "rpcUrl": "http://localhost:20000"
        }
    },
```

### Accounts

Accounts are defined in the `accounts` property of `config.json` and are global to the project. Each sandbox configuration will instantiate the accounts defined in the `accounts` array on startup

Taqueria provides five default accounts in the default configuration:

```json
    "accounts": {
        "bob": "3_000_000_000",
        "alice": "3_000_000_000",
        "john": "3_000_000_000",
        "jane": "3_000_000_000",
        "joe": "3_000_000_000"
    }
```


### Adding a New Sandbox Configuration

Sandbox configurations are added as key/value pairs to the main `sandbox` object using the format:

```json
sandboxName : { sandboxConfigObject }
```

Inside the `sandboxConfigObject`, there are three properties you can configure:

#### 'label'
An arbitrary string used to describe a particular configuration

#### 'protocol'

A string value which accepts valid Tezos protocol hashes. This value will configure the sandbox to run a particular version of the Tezos network which can be used for testing upcoming network changes

To see a list of what protocols are supported by the version of the Flextesa plugin you have installed please run `taq show protocols`.

#### 'rpcUrl'

A string which corresponds to the local URL you would like the sandbox to run on

> ### :page_with_curl: Note
> In addition to the fields above, when a sandbox is first started, a list of accounts specific to the sandbox configuration will be generated and appended to the sandboxConfigObject. These accounts will respect the declared balances from the accounts field in the root of your config.json

### Adding a Sandbox to a Taqueria Environment

Once created, sandboxes can be added to environments by adding the `sandboxName` to the `sandboxes` list in the `environment` as shown here:
```json
    environment: {
        default: 'development',
        development: {
            networks: [],
            sandboxes: [
                'local',
                'myCustomSandbox'
            ],
            storage: {},
        },
    },
```

### Baking

By default, the flextesa sandbox will start with a single baker and bake every 5 seconds, which is the default block time.

The block time can be adjusted by editing your sandbox configuration:
```json
    "sandbox": {
        "local": {
            "label": "Local Tezos Sandbox",
            "rpcUrl": "http://localhost:20000",
            "annotations": {
                "baking": "enabled",
                "block_time": 1
            }
        }
```

> NOTE: The `block_time` setting is an integer and must be set to a minimum of 1, with 5 being the default.

You may also disable baking:
```json
    "sandbox": {
        "local": {
            "label": "Local Tezos Sandbox",
            "rpcUrl": "http://localhost:20000",
            "annotations": {
                "baking": "disabled"
            }
        }
```

When baking is disabled, operations will not automatically be injected into blocks, and blocks will not be injected into the blockchain.

To bake any pending operations, run `taq bake`.

#### Baking-on-demand

Rather than manully run `taq bake` when there are pending operations, you can run `taq bake -w` which will watch for operations as they are injected into the mempool and bake them as soon as possible.

## Plugin Architecture

This is a plugin developed for Taqueria built on NodeJS using the Taqueria Node SDK

### Flextesa Plugin Task Registry

#### The `start sandbox` Task

|  attribute |  value                         |  
|------------|:------------------------------:|
|  task      | 'start sandbox'                | 
|  command   | 'start sandbox [sandboxName]'  | 
|  aliases   | ['start flextesa']             |  


#### The `stop sandbox` Task

|  attribute |  value                         | 
|------------|:------------------------------:|
|  task      | 'stop sandbox'                 | 
|  command   | 'stop sandbox [sandboxName]'   | 
|  aliases   | ['stop flextesa']              |  

#### The `list accounts` Task

|  attribute |  value                         | 
|------------|:------------------------------:|
|  task      | 'list accounts'                | 
|  command   | 'list accounts [sandboxName]'  | 
|  aliases   | [ ]                            |  

#### The `show protocols` Task

|  attribute |  value                         | 
|------------|:------------------------------:|
|  task      | 'show protocols'               | 
|  command   | 'show protocols                | 
|  aliases   | [ ]                            |

#### The `bake` Task

|  attribute |  value                         | 
|------------|:------------------------------:|
|  task      | 'bake'                         | 
|  command   | 'bake [-w]                     | 
|  aliases   | [ ]                            |
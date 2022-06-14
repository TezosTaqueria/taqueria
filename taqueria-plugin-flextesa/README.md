# Taqueria Flextesa Plugin

[Flextesa](https://tezos.gitlab.io/flextesa/) is a flexible Tezos sandbox environment that's easy to work with. It runs a Tezos node and network in a Docker container on your local machine

This plugin provides the ability to easily configure and run Flextesa sandbox instances within Taqueria that you can use for development and testing
 
## Overview

With the Flextesa plugin you configure various sandboxes for use in Taqueria that you can start, stop, and query from the CLI or VS Code command palette


Some helpful things to know:
- Multiple sandboxes can be configured and run concurrently
- You can configure the Tezos `protocol` for each sandbox to test against current, and future network upgrades
- Accounts and balances are pre-configured per-sandbox and do not persist their state
- Accounts and balances will be re-initialized each time they are started
- Sandboxes can be added to Taqueria environments and then targeted from the CLI using the `--env [envName]` option 

## Requirements

- Node.js v16.3 or later
- Docker v0.8.4 or later

## Installation

The Flextesa plugin is distributed as an NPM package that can be installed and uninstalled on a project from the Taqueria CLI

To install the Flextesa plugin on a Taqueria project, navigate to the project folder and run:
```shell
taq install @taqueria/plugin-flextesa
```

Once installed, you can confirm functionality by runing the command `taq start sandbox` which will start a sandbox with the default `local` configuration

## CLI Commands

The Flextesa plugin allows you to start, stop, and query the sandboxes configured in `./.taq/config.json` from the CLI

The following commands are available from the CLI or the VS Code Command palette:
- `taq start sandbox [sandboxName]`
- `taq stop sandbox [sandboxName]`
- `taq list accounts [sandboxName]`

> ### :page_with_curl: Note
> The first time you start a sandbox, it might take several minutes to start. This is expected behaviour as it takes time to download the flextesa docker image to your computer

## Plugin Configuration

Configuration is done in the project's `./.taq/config.json` file. Here you can configure additonal sandboxes


### The Default Sandbox Configuration

Named sandbox configurations are stored as key/value pairs in the `sandbox` property using the sandbox name as the key

This example shows the configuration for the default sandbox named `local`:

```json
    "sandbox": {
        "local": {
            "label": "Local Tezos Sandbox",
            "protocol": "PtHangz2aRngywmSRGGvrcTyMbbdpWdpFKuS4uMWxg2RaH9i1qx",
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
            "protocol": "Psithaca2MLRFYargivpo7YvUr7wUDqyxrdhC5CQq78mRvimz6A",
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

Inside the sandboxConfigObject, there are four properties you can configure:

#### 'accounts'

A list of accounts and balances to provision at startup of the Flextesa image and a default value. Accounts are added as key/value pairs following the pattern `accountName : { initialBalance: '3000000000'}`

#### 'label'
An arbitrary string used to describe a particular configuration

#### 'protocol'

A string value which accepts valid Tezos protocol hashes. This value will configure the sandbox to run a particular version of the Tezos network which can be used for testing upcoming network changes

Currently availble protocols are:
- Hangzhou `PtHangz2aRngywmSRGGvrcTyMbbdpWdpFKuS4uMWxg2RaH9i1qx`
- Ithaca   `Psithaca2MLRFYargivpo7YvUr7wUDqyxrdhC5CQq78mRvimz6A`

#### 'rpcUrl'

A string which corresponds to the local URL you would like the sandbox to run on

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

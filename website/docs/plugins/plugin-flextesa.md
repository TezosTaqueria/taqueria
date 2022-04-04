---
title: Flextesa Plugin
---

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

- Node.js v16 or later
- Docker v0.8.4 or later

## Installation

The Flextesa plugin is distributed as an NPM package that can be installed and uninstalled on a project from the Taqueria CLI

To install the Flextesa plugin on a Taqueria project, navigate to the project folder and run:
```shell
taq install @taqueria/plugin-flextesa
```

Once installed, you can confirm functionality by runing the command `taq start sandbox` which will start a sandbox with the default `local` configuration

:::note
The project you install it on must be initialized by NPM. This only needs to be done once on a project and is accomplished by running the command:
```shell
npm init -y
``` 
:::

## CLI Commands

The Flextesa plugin allows you to start, stop, and query the sandboxes configured in `./.taq/config.json` from the CLI

The following commands are available from the CLI or the VS Code Command palette:
- `taq start sandbox [sandboxName]`
- `taq stop sandbox [sandboxName]`
- `taq list accounts [sandboxName]`

:::note
The first time you start a sandbox, it might take several minutes to start. This is expected behaviour as it takes time to download the flextesa docker image to your computer
:::

## Plugin Configuration

Configuration is done in the project's `./.taq/config.json` file. Here you can configure additonal named sandboxes and add them to environments

Sandbox configurations are stored as key/value pairs in the `sandbox` property. In this example there is one sandbox configuration named `local`:
```json
    "sandbox": {
        "local": {
            "accounts": {
                "default": "bob",
                "bob": {
                    "initialBalance": "3000000000"
                },
                "alice": {
                    "initialBalance": "2000000000"
                },
                "john": {
                    "initialBalance": "4000000000"
                },
                "jane": {
                    "initialBalance": "5000000000"
                },
                "joe": {
                    "initialBalance": "1000000000"
                }
            },
            "label": "Local Tezos Sandbox",
            "protocol": "PtHangz2aRngywmSRGGvrcTyMbbdpWdpFKuS4uMWxg2RaH9i1qx",
            "rpcUrl": "http://localhost:20000"
        }
```

### Adding a New Sandbox Configuration

Sandbox configurations are added as key/value pairs to the main `sandbox` object using the format:
```json
sandboxName : { sandboxConfigObject }
```

Inside the sandboxConfigObject, there are four properties you can configure:
#### 'accounts'

A list of accounts and balances to provision at startup of the Flextesa image and a default value. Accounts are added as key/value pairs following the pattern `accountName : { initialBalance: '3000000000'}

#### 'label'
An arbitrary string used to describe a particular configuration

#### 'protocol

A string value which accepts valid Tezos protocol hashes. This value will configure the sandbox to run a particular version of the Tezos network which can be used for testing upcoming network changes

Currently availble protocols are:
- Hangzhou `PtHangz2aRngywmSRGGvrcTyMbbdpWdpFKuS4uMWxg2RaH9i1qx`
- Ithica2  `Psithaca2MLRFYargivpo7YvUr7wUDqyxrdhC5CQq78mRvimz6A`

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
|  command   | 'start sandbox [sandboxName]   | 
|  aliases   | ['start flextesa]              |  


#### The `stop sandbox` Task

|  attribute |  value                         | 
|------------|:------------------------------:|
|  task      | 'stop sandbox'                 | 
|  command   | 'stop sandbox [sandboxName]    | 
|  aliases   | ['stop flextesa']              |  

#### The `list accounts` Task

|  attribute |  value                         | 
|------------|:------------------------------:|
|  task      | 'list accounts'                | 
|  command   | 'list accounts [sandboxName]   | 
|  aliases   | [ ]                            |  



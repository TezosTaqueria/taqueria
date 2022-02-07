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
- [Docker](https://www.docker.com/) v0.8.4 or later is required

## Installation

The Flextesa plugin is distributed as an NPM package that can be installed/uninstalled from the Taqueria CLI

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

## Plugin Configuration

Configuration is done in the project's Taqueria configuration file: `./.taq/config.json`. Here you can configure additonal named sandboxes and add them to environments

### Adding a New Sandbox Configuration

Sandbox configurations are JSON like objects stored as key/value (sandboxName/configuration) pairs in the `sandbox` property  of `config.json`



You add additional sandbox configs by 
```json
    sandbox: {
        local: {
            accounts: {
                default: 'bob',
                bob: {
                    initialBalance: '3000000000',
                },
                alice: {
                    initialBalance: '2000000000',
                }
            },
            label: 'Local Tezos Sandbox',
            protocol: 'PtHangz2aRngywmSRGGvrcTyMbbdpWdpFKuS4uMWxg2RaH9i1qx',
            rpcUrl: 'http://localhost:20000',
        },
    newSandboxGoesHere : {
        newSandbox config goes here
    }
    },
```


### Adding a Sandbox to an Environment


### CLI Commands

The Flextesa plugin allows you to start, stop, and query the sandboxes configured in `./.taq/config.json` from the CLI

The following commands are available from the CLI or the VS Code Command palette:
- `taq start sandbox [sandboxName]`
- `taq stop sandbox [sandboxName]`
- `taq list accounts [sandboxName]`

:::note
The first time you start a sandbox, it might take several minutes to start. This is normal when starting a Flextesa image
:::

## Usage

What is a dev doing with it?
- spinning up a sandbox
- originating to it
- doing some stuff
- shutting it down



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



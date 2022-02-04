---
title: Flextesa Plugin
---

 This plugin provides the ability to easily configure and run Flextesa sandbox instances within Taqueria that you can use for origination and testing

## What is Flextesa?

 [Flextesa](https://tezos.gitlab.io/flextesa/) is a flexible Tezos sandbox environment that's easy to work with. It runs a Tezos node in a Docker container on your local machine that you can use for testing locally

## Basics

With the Flextesa plugin you configure various sandboxes for each project that you can start, stop, and query from the CLI

Here are some helpful things to know:
- Multiple sandboxes can be configured on each project and run concurrently
- You can configure the Tezos `protocol` for each sandbox, allowing you to test against past, current, and future network upgrades
- Accounts and balances are pre-configured per-sandbox
- Sandboxes do not save their state, accounts and balances will be set to configured values each time they are started
- Sandboxes can be added to Taqueria environments and then targeted from the CLI using the `--env [envName]` option 


## Requirements

The Flextesa plugin requires [Docker](https://www.docker.com/) v0.8.4 or later to be installed

## Installation

The Flextesa plugin in a Node.js program distributed as a NPM package which is installed and uninstalled on Taqueria projects from the Taqueria CLI

To install the Flextesa plugin on a Taqueria project, navigate to the project folder and run:
```shell
taq install @taqueria/plugin-flextesa
```

## Plugin Configuration

Configuration 

## Usage

What is a dev doing with it?
- spinning up a sandbox
- originating to it
- doing some stuff
- shutting it down



### CLI Commands

The Flextesa plugin allows you to start, stop, and query sandboxes that you have configured in `./.taq/config.json` file. The `sandboxName` defined in the configuration is used at the CLI to reference that particular sandbox config. A default sandbox `local` is provided

The plugin provides the following commands available from the CLI or the VS Code Command palette:
- `taq start sandbox [sandboxName]`
- `taq stop sandbox [sandboxName]`
- `taq list accounts [sandboxName]`

:::note
The first time you start a sandbox, it might take several minutes to start. This is normal when starting a Flextesa image
:::


## Technical Details

## Plugin Architecture

This is a plugin developed for Taqueria built on NodeJS using the Taqueria Node SDK


## Plugin Task Details

### The `start sandbox` Task

|  attribute |  value                         |  
|------------|:------------------------------:|
|  task      | 'start sandbox'                | 
|  command   | 'start sandbox [sandboxName]   | 
|  aliases   | ['start flextesa]              |  


### The `stop sandbox` Task

|  attribute |  value                         | 
|------------|:------------------------------:|
|  task      | 'stop sandbox'                 | 
|  command   | 'stop sandbox [sandboxName]    | 
|  aliases   | ['stop flextesa']              |  

### The `list accounts` Task

|  attribute |  value                         | 
|------------|:------------------------------:|
|  task      | 'list accounts'                | 
|  command   | 'list accounts [sandboxName]   | 
|  aliases   | [ ]                            |  



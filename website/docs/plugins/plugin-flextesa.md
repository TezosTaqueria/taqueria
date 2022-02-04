---
title: Flextesa Plugin
---

 This plugin provides the ability to easily configure and run Flextesa sandbox instances within Taqueria that you can use for origination and testing

## What is Flextesa?

 [Flextesa](https://tezos.gitlab.io/flextesa/) is a flexible Tezos sandbox environment that's easy to work with. It runs a Tezos node in a Docker container on your local machine that you can use for testing

## Basics

With the Flextesa plugin you configure various sandboxes with different settings, add them to Taqueria environments, and manage their lifecycle from the CLI 


## Requirements

The Flextesa plugin requires [Docker](https://www.docker.com/) v0.8.4 or later to be installed

## Installation

The Flextesa plugin in a Node.js program distributed as a NPM package which can be installed and uninstalled from the Taqueria CLI

To install the Flextesa plugin on a Taqueria project, navigate to the project folder and run:
```shell
taq install @taqueria/plugin-flextesa
```

## Plugin Configuration

Configuration 

## Usage



### CLI Commands

The Flextesa plugin allows you to start, stop, and query sandboxes that you have configured in `./.taq/config.json` file. The `sandboxName` defined in the configuration is used at the CLI to reference that particular sandbox config. A default sandbox `local` is provided

The plugin provides the following commands available from the CLI or the VS Code Command palette:
- `taq start sandbox [sandboxName]`
- `taq stop sandbox [sandboxName]`
- `taq list accounts [sandboxName]`

:::note
The first time you start a sandbox, it might take several minutes to start. This is normal when starting a Flextesa image
:::


### Task Reference
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


## Plugin Architecture

This is a plugin developed for Taqueria built on NodeJS using the Taqueria Node SDK

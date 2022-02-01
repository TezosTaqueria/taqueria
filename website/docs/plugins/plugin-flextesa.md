---
title: Flextesa Plugin
---

The Flextesa plugin provides a quick and easy way to start, stop, and query a Flextesa sandbox instance
// Does Taqueria manage the sandbox env/config?

 Flextesa is a Tezos sandbox environment that runs in Docker and provides a local Tezos node and test network. This plugin uses a docker image called `taqueria/flextesa`, which is available [here](/docker)

 Once running, you can originate your smart contracts to the testnet, run tests, and make RPC calls

## Tasks

The Flextesa plugin provides the following tasks to Taqueria:
- `start sandbox`
- `stop sandbox`
- `list accounts`

## Requirements

The Flextesa plugin requires Docker v0.8.4 or later to be installed locally

Docker is available [here](https://www.docker.com/)

## Installation

To install the Flextesa plugin on a Taqueria project, navigate to the project folder and run:
```shell
taq install @taqueria/plugin-flextesa
```

## Usage

This plugin provides access to a Flextesa sandbox instance which runs in a docker container on your machine. As this is a self contained environment running independently on your machine, there is a lifecycle to be aware of. In order to query or originate to a sandbox network, it must be started and running

:::note
The first time you start a sandbox, it might take several minutes to start. This is normal when starting a Flextesa image
:::

The plugin provides two lifecycle tasks: `start sandbox` and `stop sandbox`

### The `start sandbox` Task
***Coming soon***

### The `stop sandbox` Task
***Coming soon*

### The `list accounts` Task
***Coming soon***

### Options

The LIGO `compile` task will accept the following optional parameters:

| flag  |  name       | description                           |   
|-------|:-----------:|---------------------------------------|
|  -e   | entry-point | The entry point that will be compiled |
|  -s   | syntax      | The syntax used in the contract       |    
|  -i   | infer       | Enable type inference                 |   


## Plugin Configuration

This plugin stores the sandbox configuration in the `./.taq/config.json` file

***More coming soon***

## Plugin Architecture

This is a plugin developed for Taqueria built on NodeJS using the Taqueria Node SDK

The plugin provides three tasks:

### `start sandbox`
|  attribute |  value                         |  
|------------|:------------------------------:|
|  task      | 'start sandbox'                | 
|  command   | 'start sandbox [sandboxName]   | 
|  aliases   | ['start flextesa]              |  

### `stop sandbox`
|  attribute |  value                         | 
|------------|:------------------------------:|
|  task      | 'stop sandbox'                 | 
|  command   | 'stop sandbox [sandboxName]    | 
|  aliases   | ['stop flextesa']              |  

 ### `list accounts`
|  attribute |  value                         | 
|------------|:------------------------------:|
|  task      | 'list accounts'                | 
|  command   | 'list accounts [sandboxName]   | 
|  aliases   | [ ]                            |  








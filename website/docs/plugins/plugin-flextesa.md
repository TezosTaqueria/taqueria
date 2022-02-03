---
title: Flextesa Plugin
---

 [Flextesa]([here](https://tezos.gitlab.io/flextesa/)) is a popular Tezos sandbox environment that's easy to work with. This plugin provides a quick and easy way to start, stop, and query Flextesa instances 

The plugin runs a docker image called `taqueria/flextesa`, which is available [here](https://tezos.gitlab.io/flextesa/) along with comprehensive documentation

The Flextesa plugin provides the following tasks to Taqueria:
- `start sandbox [sandboxName]`
- `stop sandbox [sandboxName]`
- `list accounts [sandboxName]`

Multiple sandboxes can be configured in your Taqueria `config.json` file and then targeted by adding `sandboxName` to the commands as shown above


## Requirements

The Flextesa plugin requires [Docker]((https://www.docker.com/)) v0.8.4 or later to be installed

## Installation

To install the Flextesa plugin on a Taqueria project, navigate to the project folder and run:
```shell
taq install @taqueria/plugin-flextesa
```

## Sandbox Configuration

Configuration 

## Usage

This plugin provides access to a Flextesa sandbox instance which runs a Tezos node in a docker container on your machine. As this is a self contained environment running independently on your machine, there is a lifecycle to be aware of. In order to query or originate to a sandbox network, it must be started and running

:::note
The first time you start a sandbox, it might take several minutes to start. This is normal when starting a Flextesa image
:::

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



## Plugin Configuration

This plugin stores the sandbox configuration in the `./.taq/config.json` file

***More coming soon***

## Plugin Architecture

This is a plugin developed for Taqueria built on NodeJS using the Taqueria Node SDK










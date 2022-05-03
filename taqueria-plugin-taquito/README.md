# Taqueria Taquito Plugin

The Taquito plugin provides a task to originate a smart contract to a Tezos network

## Requirements

- Taqueria v0.0.6 or later
- Node.js v16 or later
- Docker v0.8.4 or later

## Installation

To install the Taquito plugin on a Taqueria project, navigate to the project folder and run:
```shell
taq install @taqueria/plugin-taquito
```

## Configuration

***Coming soon***

## Usage

The Taquito plugin exposes an `originate` task in Taqueria which will originate the specified Michelson contract to the configured network

### Originating a Michelson Contract

***Coming soon***

### Examples

***Coming soon***

## Plugin Architecture

This is a plugin developed for Taqueria built on NodeJS using the Taqueria Node SDK

The plugin provides a single task `originate`, used for originating Michelson contracts to a Tezos network:

|  attribute |  value                   | 
|------------|:-------------------------|
|  task      | 'deploy'                 | 
|  command   | 'deploy [contract]`      | 
|  aliases   | ['originate']            |  

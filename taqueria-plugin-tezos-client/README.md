# Taqueria Tezos Client Plugin

The Tezos Client plugin provides tasks to analyze contracts including type checking and simulating of Michelson (`.tz`) smart contracts. They both execute against a protocol (currently kathmandu). We'll enable a `--protocol` flag in the future to allow users to specify a protocol to use

> ### :page_with_curl: Note
> This plugin no longer relies on the Flextesa plugin.

## Requirements

- Taqueria v0.22.1 or later
- Node.js v16.17.1 or later
- Docker v20.10.12 or later

## Installation

To install the Tezos Client plugin on a Taqueria project, navigate to the project folder and run:
```shell
taq install @taqueria/plugin-tezos-client
```

## The `taq typecheck` task

Basic usage is:
```shell
taq typecheck <contractName>
```

### Basic description
This task typechecks a Michelson file in `artifacts` and reports a failure or success

## The `taq simulate` task

Basic usage is:
```shell
taq simulate <contractName> <--param paramFileName>
```

### Basic description
This task runs a Michelson file in `artifacts` as a simulation and ouputs a result suggesting a failure or success. If it's a success, it shows the updated storage value, emitted operations, and big map differences

### Options

- By default, the storage file it will use to simulate the contract is CONTRACT.default_storage.tz where CONTRACT is the name of the contract. If you wish to specify another storage file in `artifacts`, use the `--storage` flag

- The `--param` flag is mandatory and you must supply the filename, in `artifacts`, that contains the actual parameter value

- By default, the entrypoint is `default`, which points to no specific annotated entrypoint. Use `--entrypoint` to specify an annotated entrypoint to call. E.g. if the parameter type of a Michelson contract is `(or (or (int %decrement) (int %increment)) (unit %reset))`, then there are two ways to call the `increment` entrypoint, with parameter `(Left (Right 14))` or with parameter `14` if your command contains `--entrypoint increment`

## Plugin Architecture

This is a plugin developed for Taqueria built on NodeJS using the Taqueria Node SDK and distributed via NPM

# Taqueria LIGO Plugin

The LIGO plugin provides a task to compile LIGO smart contracts to Michelson `.tz` files

## Requirements

- Taqueria v0.8.0 or later
- Node.js v16.3 or later
- Docker v0.8.4 or later

## Installation

To install the LIGO plugin on a Taqueria project, navigate to the project folder and run:
```shell
taq install @taqueria/plugin-ligo
```

## The `taq compile` Task

Basic usage is:

```shell
taq compile <filename>
```

> ### :warning: CAUTION
> The `compile` task can be implemented by more than one compiler plugin installed on a project (LIGO, Archetype, SmartPy). If this is the case, you must use the `--plugin ligo` flag to specify a particular compiler

### Basic description
The LIGO plugin exposes a `compile` task in Taqueria which can target one LIGO contract in the `contracts` folder and compile them to a Michelson `.tz` file output to the `/artifacts` folder.

### A frictionless smart contract development workflow
Our LIGO plugin introduces a smart contract development workflow by means of two simple file naming formats.

Suppose you have a contract named `hello.mligo` and you create a file in the same directory as the contract with the naming format of `CONTRACT.storages.EXT`, where `CONTRACT` is the name of the contract this storages file is associated with and `EXT` must match the extension of the associated contract. In our case, the former is `hello` and the latter is `mligo`, so it'd be named `hello.storages.mligo`.

You can define a list of LIGO variables in `hello.storages.mligo` in the form of `let VARIABLE_NAME: STORAGE_TYPE = EXPRESSION` (explicit typing is optional but recommended) and the expressions will be treated as initial storage values for `hello.mligo`.

> ### :page_with_curl: Note
> Note that the form is actually mligo code. Variable definitions in other syntax variants will differ.

Similarly with `hello.parameters.mligo` but in the form of `let VARIABLE_NAME: PARAMETER_TYPE = EXPRESSION`.

`taq compile hello.storages.mligo` will compile each definition in `hello.storages.mligo` and will produce a Michelson `.tz` file that contains the storage value, as a Michelson expression, for each of them. If the name of a variable is `storage1`, then its emitted Michelson file will be named `hello.storage.storage1.tz`. For `taq compile hello.parameters.mligo`, the name will be `hello.parameter.param1.tz` if there's a variable named `param1` defined in `hello.parameters.mligo`.

Furthermore, the first variable definition in `hello.storages.mligo` will be treated as the default storage and will produce a Michelson file named `hello.default_storage.tz` instead. The `deploy` task from the Taquito plugin will take advantage of this. Go to that plugin documentation to learn how.

Lastly, `taq compile hello.mligo` will compile `hello.mligo` and emit `hello.tz`. Then it'll look for `hello.storages.mligo` and `hello.parameters.mligo` and compile them too if they are found.

> ### :warning: CAUTION
> Make sure you name it `hello.storages.mligo` and not `hello.storage.mligo` (note the extra `s`).

### Options

None for now.

## Template creation
The LIGO plugin also exposes a contract template via the `taq create contract <contractName>` task. This task will create a new LIGO contract in the `contracts` directory, insert some boilerplate LIGO contract code and will register the contract with Taqueria

### The `create contract` Template

The `create contract` task is used to create a new LIGO contract from a template. Running this task will create a new LIGO smart contract in the `contracts` directory, insert boilerplate contract code and will register that contract with Taqueria
    
```shell
taq create contract <contractName>
```

The `create contract` task takes a filename a required positional argument. The filename must end with a LIGO extension (`.jsligo`, `.mligo`, etc)

## Plugin Architecture

This is a plugin developed for Taqueria built on NodeJS using the Taqueria Node SDK

Docker is used under the hood to provide a self contained environment for Archetype to prevent the need for it to be installed on the user's local machine
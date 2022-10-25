# Taqueria LIGO Plugin

The LIGO plugin provides a task to compile LIGO smart contracts to Michelson `.tz` files

## Requirements

- Taqueria v0.22.2 or later
- Node.js v16.17.1 or later
- Docker v20.10.12 or later

## Installation

To install the LIGO plugin on a Taqueria project, navigate to the project folder and run:
```shell
taq install @taqueria/plugin-ligo
```

## The `taq compile` Task

Basic usage is:

```shell
taq compile <contractName>
```

> ### :warning: CAUTION
> The `compile` task is implemented by more than one compiler plugin (LIGO, Archetype, SmartPy). If more than one of these plugins are installed on a project, you need to use the `--plugin ligo` flag to specify a particular compiler

### Basic description
The LIGO plugin exposes a `compile` task in Taqueria which can target one LIGO contract in the `contracts` folder and compile them to a Michelson `.tz` file output to the `artifacts` folder

### A frictionless smart contract development workflow
Our LIGO plugin introduces a smart contract development workflow by means of two simple file naming formats

Suppose you have a contract named `hello.mligo` and you create a file in the same directory as the contract with the naming format of `CONTRACT.storages.EXT`, where `CONTRACT` is the name of the contract this storages file is associated with and `EXT` must match the extension of the associated contract. In our case, the former is `hello` and the latter is `mligo`, so it'd be named `hello.storages.mligo`

You can define a list of LIGO variables in `hello.storages.mligo` in the form of `let VARIABLE_NAME: STORAGE_TYPE = EXPRESSION` (explicit typing is optional but recommended) and the expressions will be treated as initial storage values for `hello.mligo`

> ### :page_with_curl: Note
> Note that the form is actually mligo code. Variable definitions in other syntax variants will differ.

Similarly with `hello.parameters.mligo` but in the form of `let VARIABLE_NAME: PARAMETER_TYPE = EXPRESSION`

`taq compile hello.storages.mligo` will compile each definition in `hello.storages.mligo` and will produce a Michelson `.tz` file that contains the storage value, as a Michelson expression, for each of them. If the name of a variable is `storage1`, then its emitted Michelson file will be named `hello.storage.storage1.tz`. For `taq compile hello.parameters.mligo`, the name will be `hello.parameter.param1.tz` if there's a variable named `param1` defined in `hello.parameters.mligo`

Furthermore, the first variable definition in `hello.storages.mligo` will be treated as the default storage and will produce a Michelson file named `hello.default_storage.tz` instead. The `deploy` task from the Taquito plugin will take advantage of this. Go to that plugin documentation to learn how

Lastly, `taq compile hello.mligo` will compile `hello.mligo` and emit `hello.tz`. Then it'll look for `hello.storages.mligo` and `hello.parameters.mligo` and compile them too if they are found

> ### :warning: CAUTION
> Make sure you name it `hello.storages.mligo` and not `hello.storage.mligo` (note the extra `s`)

### Options

None for now

## The `taq test` Task

Basic usage is:

```shell
taq test <fileName>
```

### Basic description
This task tests the LIGO source code and reports either a failure or success. Normally you'd have a contract file and a separate test file that includes the contract's code, both within the `contracts` directory

For example, refer to the following 2 code snippets:
```ligo title="counter.mligo"
type storage = int

type parameter =
  Increment of int
| Decrement of int
| Reset

type return = operation list * storage

// Two entrypoints

let add (store, delta : storage * int) : storage = store + delta
let sub (store, delta : storage * int) : storage = store - delta

(* Main access point that dispatches to the entrypoints according to
   the smart contract parameter. *)

let main (action, store : parameter * storage) : return =
 ([] : operation list),    // No operations
 (match action with
   Increment (n) -> add (store, n)
 | Decrement (n) -> sub (store, n)
 | Reset         -> 0)
```

```ligo title="testCounter.mligo"
#include "counter.mligo"

let initial_storage = 42

let test_initial_storage =
 let (taddr, _, _) = Test.originate main initial_storage 0tez in
 assert (Test.get_storage taddr = initial_storage)

let test_increment =
 let (taddr, _, _) = Test.originate main initial_storage 0tez in
 let contr = Test.to_contract taddr in
 let _ = Test.transfer_to_contract_exn contr (Increment 1) 1mutez in
 assert (Test.get_storage taddr = initial_storage + 1)
```

By running `taq test testCounter.mligo`, you should get the following:
```
┌───────────────────┬──────────────────────────────────────────────┐
│ Contract          │ Test Results                                 │
├───────────────────┼──────────────────────────────────────────────┤
│ testCounter.mligo │ Everything at the top-level was executed.    │
│                   │ - test_initial_storage exited with value (). │
│                   │ - test_increment exited with value ().       │
│                   │                                              │
│                   │ 🎉 All tests passed 🎉                      │
└───────────────────┴──────────────────────────────────────────────┘
```

## Template creation
The LIGO plugin also exposes a contract template via the `taq create contract <contractName>` task. This task will create a new LIGO contract in the `contracts` directory and insert some boilerplate LIGO contract code

### The `create contract` Template

The `create contract` task is used to create a new LIGO contract from a template. Running this task will create a new LIGO smart contract in the `contracts` directory and insert boilerplate contract code
    
```shell
taq create contract <contractName>
```

The `create contract` task takes a filename a required positional argument. The filename must end with a LIGO extension (`.jsligo`, `.mligo`, etc)

## Plugin Architecture

This is a plugin developed for Taqueria built on NodeJS using the Taqueria Node SDK and distributed via NPM

Docker is used under the hood to provide a self contained environment for LIGO to prevent the need for it to be installed on the user's local machine
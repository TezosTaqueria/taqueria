---
title: SmartPy Plugin
---

The SmartPy plugin provides a task to compile SmartPy smart contracts to Michelson

Specifics of the SmartPy plugin's task implementation:

|  attribute |  value                   | 
|------------|:------------------------:|
|  task      | 'compile'                | 
|  command   | 'compile [sourceFile]    | 
|  aliases   | ['c', 'compile-smartpy'] |        

## Requirements

The SmartPy plugin requires SmartPy v0.27 or later to be installed locally

A guide to installing SmartPy can be found [here](https://SmartPylang.org/docs/intro/installation)

## Installation

To install the SmartPy plugin on a Taqueria project, navigate to the project folder and run:
```shell
taq install @taqueria/plugin-SmartPy
```

## Usage

The SmartPy plugin exposes a `compile` task in Taqueria which can target one, or all SmartPy contracts in the `contracts` folder and compile them to Michelson code output to the `artifacts` folder

### Running the Compile Task

The SmartPy plugin's `taq compile` task can be run with or without arguments. The basic syntax for the task is `taq compile <file-name>`

Running the `compile` task with no options will result in any source SmartPy smart contracts in the `contracts` folder being compiled to Michelson files in the `artifacts` folder. If you speficy an optional filename, only SmartPy contracts matching the specified filename in the `contracts` folder will be compiled

:::note
The `compile` task can be implemented by more than one compiler plugin installed on a project (SmartPy, SmartPY). If this is the case, you must use the `--plugin SmartPy` flag to specify a particular compiler
::



### Basic Usage

***Coming Soon***

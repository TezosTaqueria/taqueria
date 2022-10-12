# Taqueria SmartPy Plugin

The SmartPy plugin provides a task to compile SmartPy smart contracts to Michelson `.tz` files

## Requirements

The SmartPy plugin requires: 
- SmartPy v0.8.4 or later to be installed [locally](https://smartpy.io/docs/cli/#installation)
- Node.js v16.17.1 or later

## Installation

To install the SmartPy plugin on a Taqueria project, navigate to the project folder and run:
```shell
taq install @taqueria/plugin-smartpy
```

## Usage

The SmartPy plugin's `taq compile` task must be run with arguments. The basic syntax for the command is: 
```shell
taq compile <contractName>
```

Running the `compile` task with no options will result in no SmartPy smart contracts in the `contracts` folder being compiled to Michelson files in the `artifacts` folder. If you speficy an optional filename, only SmartPy contracts matching the specified filename in the `contracts` folder will be compiled

> ### :page_with_curl: Note
> The `compile` task is implemented by more than one compiler plugin installed on a project (LIGO, Archetype, SmartPy). If more than one of these plugins are installed on a project, you need to use the `--plugin smartpy` flag to specify a particular compiler

The plugin provides a `compile` task used for compiling SmartPy smart contracts to Michelson

|  attribute |  value                   | 
|------------|:------------------------:|
|  task      | 'compile'                | 
|  command   | 'compile [sourceFile]    | 
|  aliases   | ['c', 'compile-smartpy'] |        

## Plugin Architecture

This is a plugin developed for Taqueria built on NodeJS using the Taqueria Node SDK and distributed via NPM
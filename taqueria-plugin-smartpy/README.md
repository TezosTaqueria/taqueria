# Taqueria SmartPy Plugin

The SmartPy plugin provides a task to compile SmartPy smart contracts to Michelson

## Requirements

- Taqueria v0.0.6 or later
- Node.js v16 or later
- Docker v0.8.4 or later

The SmartPy plugin requires SmartPy v0.8.4 or later to be installed locally

SmartPy is available [here](https://smartpy.io/)

## Installation

To install the SmartPy plugin on a Taqueria project, navigate to the project folder and run:
```shell
taq install @taqueria/plugin-smartpy
```

## Usage

The SmartPy plugin's `taq compile` task can be run with or without arguments. The basic syntax for the command is: 
```shell
taq compile <file-name>
```

Running the `compile` task with no options will result in any source SmartPy smart contracts in the `contracts` folder being compiled to Michelson files in the `artifacts` folder. If you speficy an optional filename, only SmartPy contracts matching the specified filename in the `contracts` folder will be compiled

The `compile` task can be implemented by more than one compiler plugin installed on a project (SmartPy, SmartPY). If this is the case, you must use the `--plugin` flag to specify a particular compiler

## Plugin Architecture

This plugin is developed for Taqueria built using TypeScript for NodeJS using the Taqueria Node SDK

The plugin provides a `compile` task used for compiling SmartPy smart contracts to Michelson

|  attribute |  value                   | 
|------------|:------------------------:|
|  task      | 'compile'                | 
|  command   | 'compile [sourceFile]    | 
|  aliases   | ['c', 'compile-smartpy'] |        

# Taqueria LIGO Plugin

The LIGO plugin provides a task to compile LIGO smart contracts to Michelson `.tz` files

## Requirements

- Taqueria v0.0.6 or later
- Node.js v16.3 or later
- Docker v0.8.4 or later

## Installation

To install the LIGO plugin on a Taqueria project, navigate to the project folder and run:
```shell
taq install @taqueria/plugin-ligo
```

## Configuration

No additional configuration is available
## Usage

The LIGO plugin exposes a `compile` task in Taqueria which can target one, or all the LIGO contracts in the `contracts` folder and compile them to Michelson `.tz` files  output to the `artifacts` folder

### Running the Compile Task

The LIGO plugin's `taq compile` task can be run with or without arguments. The basic syntax for the task is `taq compile <file-name>`

Running the `compile` task with no options will result in any source LIGO smart contracts in the `contracts` folder being compiled to Michelson files in the `artifacts` folder. If you speficy an optional filename, only LIGO contracts matching the specified filename in the `contracts` folder will be compiled

> ### :warning: CAUTION
> The `compile` task can be implemented by more than one compiler plugin installed on a project (LIGO, SmartPY). If this is the case, you must use the `--plugin ligo` flag to specify a particular compiler

### Options

The LIGO `compile` task will accept the following optional parameters:

| flag  |  name       | description                           |   
|:-----:|:------------|---------------------------------------|
|  -e   | entry-point | The entry point that will be compiled |
|  -s   | syntax      | The syntax used in the contract       |    
|  -i   | infer       | Enable type inference                 |   


## Plugin Architecture

This is a plugin developed for Taqueria built on NodeJS using the Taqueria Node SDK

Docker is used under the hood to provide a self contained environment for LIGO to prevent the need for it to be installed on the user's local machine

The plugin provides a single task `compile`, used for compiling LIGO smart contracts to Michelson:

|  attribute |  value                   | 
|------------|:------------------------:|
|  task      | 'compile'                | 
|  command   | 'compile [sourceFile]    | 
|  aliases   | ['c', 'compile-ligo']    |  

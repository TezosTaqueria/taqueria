---
title: LIGO Plugin
---

The LIGO plugin provides a task to compile LIGO smart contracts to Michelson

## Requirements

The LIGO plugin requires LIGO v0.27 or later to be installed locally

A guide to installing LIGO can be found [here](https://ligolang.org/docs/intro/installation)

## Installation

To install the LIGO plugin on a Taqueria project, navigate to the project folder and run:
```shell
taq install @taqueria/plugin-ligo
```

## Usage

The LIGO plugin exposes a `compile` task in Taqueria which can target one, or all LIGO contracts in the `contracts` folder and compile them to Michelson code output into the `artifacts` folder

### Running the Compile Task

The LIGO plugin's `taq compile` task can be run with or without arguments. The basic syntax for the task is `taq compile <file-name>`

Running the `compile` task with no options will result in any source LIGO smart contracts in the `contracts` folder being compiled to Michelson files in the `artifacts` folder. If you speficy an optional filename, only LIGO contracts matching the specified filename in the `contracts` folder will be compiled

::note
The `compile` task can be implemented by more than one compiler plugin installed on a project (LIGO, SmartPY). If this is the case, you must use the `--plugin ligo` flag to specify a particular compiler
::

### Options

The LIGO `compile` task will accept the following optional parameters

| flag  |  name       | description                           |   
|-------|:-----------:|---------------------------------------|
|  -e   | entry-point | The entry point that will be compiled |
|  -s   | syntax      | The syntax used in the contract       |    
|  -i   | infer       | Enable type inference                 |   


### Basic Usage

***Coming Soon***







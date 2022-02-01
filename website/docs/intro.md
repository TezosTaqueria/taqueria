---
title: Introduction
---
<!-- 
content-type: getting started
audience: crypto literate readers and developers looking to USE Taqueria (rather than build on it)

goal: to get the main concepts accross to the in 3 mins or less without losing non-technical folk
purpose: help the user understand what Taqueria is, what it does, and how to proceed

- what are the things a totally green user needs to know to understand Taqueria?
- what can Taqueria do for the user?
- what are the basic things you need to know about how to install and use taqueria?
 -->


Taqueria is here to help make your Tezos development experience easier. Taqueria can help make common dApp development work faster and easier by providing an easy way to run tasks involved in the dApp development lifecycle

Some of the things Taqueria can do for you include:
- Compiling smart contracts written in LIGO or SmartPY
- Running a Flextesa sandbox (a local Tezos testnet)
- Originating a smart contract 
- Generating TypeScript types from a Michelson contract
- Autocompletion in VS Code

## What is Taqueria?

Taqueria is an extensible, open source plugin based framework and task runner for Tezos dApp development

In more practical terms, Taqueria is a command line interface (CLI) you use in your terminal via the `taq` command, and a library of plugins that add tasks to Taqueria to do cool and useful things like smart contract compiling, originating, and type generation

Taqueria also provides a core SDK and protocol which the CLI and all Taqueria plugins rely on. Anyone can use the SDK to create a custom plugin

### The Taqueria CLI

The Taqueria CLI is the core component of Taqueria and implements the SDK and Protocol. It's distributed as a binary for macOS/Linux/Windows machines and once installed, provides it's functionality through a command named `taq`

`taq` has two important tasks provided by the core CLI:
- `init` - used to initialize a Taqueria project (available in all contexts)
- `install' - used to install Taqueria plugins (available in any Taqueria project thas has been initialized as a NPM project)

Each plugin installed will add tasks to taqueria that will show up under `taq --help` and can be called via `taq [taskName]`, or in the VS Code Command Palette

![Taqueria CLI Help Output](/img/taq-help-cli.png)



## How Do You Use Taqueria?

The most common way to use Taqueria is as a task runner you execute from the command line or the VS Code Extension. 

You canable to type a command like `taq compile` from their command line, or 

Once the correct plugins for the project are installed, the user is able to run tasks with the `taq [task]` command from the CLI, or use the command palette in VS Code


## Core Components
Taqueria is composed of a core SDK and Protocol that provide the foundation for the CLI and all plugins. Most developers don't need to be concerned with these components but they are there should you choose to make a plugin of your own


### Main Components

The core SDK/pretocol implements the core functionality, and plugins are used to implement specific functionality such as a compiler or test-net


The core component of Taqueria 
 

It implements the Taqueria SDK and Taqueria Protocol 





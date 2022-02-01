---
title: Introduction
---

Taqueria is here to help make your Tezos development experience easier. Taqueria can help make common dApp development work faster and easier by providing an easy way to run tasks involved in the dApp development lifecycle. Some of the tasks Taqueria can do for you are:
- Compiling smart contracts written in LIGO or SmartPY
- Running a Flextesa sandbox (a local Tezos test-net)
- Originating a smart contract 
- Generating TypeScript types from a Michelson contract


### What is Taqueria?

In a very basic sense is a command line interface (CLI) that you can use in your terminal with the `taq` command, and a variety of plugins that add tasks to Taqueria to do cool and useful things like compiling, originating, and type generation

Taqueria is an extensible, open source plugin based framework for Tezos dApp development. Anyone can contribute to the Taqueria codebase or make a custom plugin

### Main Components

The core SDK/pretocol implements the core functionality, and plugins are used to implement specific functionality such as a compiler or test-net

that has 2 main layers:
- a core SDK and Protocol which implements the CLI functionality and provides the interface through which Taqueria plugins operate
-
The main way to interact with Taqueria through the CLI, or the 

Taqueria is composed o

The core component of Taqueria is the CLI which provides a terminal command called `taq` that can run tasks provided by the CLI or plugins 

The CLI application is distributed as a binary and implements the `taqueria/node-sdk` and `taqueria/protocol`


 can compile smart contracts in multiple languages, launch sandboxes, and originate contracts with a simple task based interface

It implements the Taqueria SDK and Taqueria Protocol 





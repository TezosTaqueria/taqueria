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
- what are the high level concepts you need to know about how to install and use taqueria?
- what is the MINIMAL amount of detail necessary in this document?
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

## How Do You Use Taqueria?

The most common way to use Taqueria is as a task runner available from the command line. Once installed and configured, you can run tasks like `taq compile`, `taq originate` or `taq --help` from the command line. Taqueria also comes with an optional VS Code Plugin which allows you to run Taqueria tasks right from the command palette

## Basic Concepts

### Taqueria Projects

Taqueria projects serve as the context from which you run Taqueria tasks for a project. The `taq init` command is used to create a Taqueria project. At this time, Taqueria projects also must by node.js projects

A Taqueria project which will have folders for the `app`, `contracts`, and `artifacts`; as well as a `./.taq/` directory which contains the config.json and state.json files used for configuration

### Taqueria CLI

The Taqueria CLI is the main way you interact with Taqueria through a command named `taq`. You can see what tasks are available to run in any given context by running `taq --help` from the command line

The CLI is a core component of Taqueria which is a requirement for all plugins and other functionality. The Taqueria CLI is disributed as a binary application for macOS, Linux, and Windows and is installed globally in the user's `$PATH`. The binary is used by all plugins and the CLI itself 

### Taqueria Plugins

Taqueria comes with a few core tasks like `init` and `install`, but most of the tasks you will want to use will be provided by plugins. Currently available plugins are implemented as NPM packages, but plugins can be created in any language or framework compatible with the Taqueria SDK

Taqueria 














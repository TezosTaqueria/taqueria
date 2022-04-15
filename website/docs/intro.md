---
title: Introduction
---

import Term from "@docusaurus-terminology/term";

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

<Term popup="This hover text will appear in the documentation page that you reference this term" reference="/docs/terms/taquito">Name of the term</Term>

Taqueria is here to help make developing on Tezos easier. Taqueria supercharges your projects with a powerful and centralized configuration and access to top Tezos development tools through tasks that you run from the command line

Some of the things Taqueria can do for you include:

-   Compiling smart contracts written in LIGO or SmartPY
-   Running a Flextesa sandbox (a local Tezos testnet)
-   Originating a smart contract
-   Generating TypeScript types from a Michelson contract
-   Autocompletion in VS Code

## What is Taqueria?

Taqueria is an extensible, open source plugin based framework and task runner for Tezos development

In more practical terms, Taqueria is a task runner that you can use from the command line or the VS Code command palette to quickly accomplish things like starting a sandbox or originating a contract. Taqueria comes with a few basic tasks, but relies on plugins to add tasks that provide complex and domain specific functionality

Taqueria has a few major components:

-   A command line interface (CLI) you use in your terminal through a command named `taq`
-   A library of plugins that add tasks to Taqueria to do cool and useful things like smart contract compiling, originating, and type generation
-   A VS Code Extension which provides the ability to run Taqueria tasks from the command palette

## Basic Components

### Taqueria CLI

The CLI is the main user interface for Taqueria which provides a command `taq` through which you can initialize a project, install/uninstall plugins, and run tasks

Basic usage of the Taqueria CLI involves running a command following the pattern

```shell
taq [task] [options]
```

You can see what tasks are available to run in any given context by running `taq --help` from the command line

### Taqueria Project

A Taqueria project is one that has been initialized by Taqueria using the `taq init` command. It will have the following folder structure created:

-   `app`
-   `contracts`
-   `artifacts`
-   `./.taq`

The `./.taq` folder contains the Taqueria configuration for a given project. Configuration for Taqueria plugins and sandboxes is done in `./.taq/config.json`

:::note
At this time, all Taqueria projects must also be initialized as node projects by running `npm init -y` from the root of your project directory
:::

### Taqueria Plugins

Taqueria plugins add functionality to Taqueria by adding tasks to Taqueria. Plugins are managed right in Taqueria using the `taq install [pluginName]` and `taq uninstall [pluginName]` commands

Taqueria plugins are installed on a **_per-project_** basis which allows you to customize the combination of technologies used and tasks avalable on a project. This means that the tasks available to run in each project will differ based on the plugins installed

Currently available plugins include:

-   LIGO Compiler
-   SmartPy Compiler
-   Flextesa Sandbox
-   Taquito
-   TS Type Generator

### Taqueria SDK

Taqueria has an SDK and protocol at its core which all Taqueria plugins and the cli depend on

> Note: Most developers won't ever interact with the SDK directly unless they are developing a plugin

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

Taqueria is here to make your Tezos development experience faster and easier. Taqueria understands the Tezos development lifecycle and provides you with a powerful set of tools that take care of common development tasks so you can focus on what matters 

## What is Taqueria?

Taqueria is an extensible, open source plugin based framework for Tezos dApp development

In more practical terms, Taqueria is a task runner that you can use from the command line or the VS Code command palette to quickly accomplish things like starting a sandbox or originating a contract. Taqueria comes with a few basic tasks, but relies on plugins to add tasks that provide complex and domain specific functionality

Taqueria has a few major components:
 - A command line interface (CLI) you use in your terminal through a command named`taq`
 - A library of plugins that add tasks to Taqueria to do cool and useful things like smart contract compiling, originating, and type generation
 - A VS Code Extension which provides the ability to run Taqueria tasks from the command palette

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
- `app`
- `contracts`
- `artifacts`
- `./.taq`

The `./.taq` folder contains the Taqueria configuration for a given project. Configuration for Taqueria plugins and sandboxes is done in `./.taq/config.json`

:::note
At this time, all Taqueria projects must also be initialized as node projects by running `npm init -y` from the root of your project directory
:::
### Taqueria Plugins

Taqueria plugins add functionality to Taqueria by adding tasks to Taqueria. Plugins are managed right in Taqueria using the `taq install [pluginName]` and `taq uninstall [pluginName]` commands

Taqueria plugins are installed on a ***per-project*** basis which allows you to customize the combination of technologies used and tasks avalable on a project. This means that the tasks available to run in each project will differ based on the plugins installed

Currently available plugins include:
- LIGO Compiler
- SmartPy Compiler
- Flextesa Sandbox
- Taquito 
- TS Type Generator

### Taqueria SDK

Taqueria has an SDK and protocol at it's core wich are dependencies for the CLI and all plugins. They are provided in the binary file, as well as plugins (npm packages)

Most developers won't ever interact with directly unless they are developing a Taqueria plugin, but it's helpful to know they are there
















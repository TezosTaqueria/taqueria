---
title: Quickstart
---


<!-- 
Content Type: Getting Started Documentation

Purpose: To get a developer set up and ready to go with Taqueria in under 5 minutes

Goal: To onboard as many devs as possible by translating their interest into them actually developing on Taqueria

Questions:
- What is the quickest explanation of Taqueria and what it does?
- What are the most important questions new users will have?
- What are the cool things you can do with Taqueria? 

-->


## Overview

This quickstart guide is a high-level, hands-on guide that will teach you the fundamentals of using Taqueria in 10 minutes by going through the process of running some basic tasks in Taqueria from the CLI

What you will accomplish:
- Initialize a project using a pre-configured Taqueria scaffold
- Compile a LIGO smart contract to Michelson
- Start a local Flextesa sandbox 
- Originate the smart contract to the Flextesa sandbox

- Use the front end app to view the contract 

## Requirements

To successfully follow this guide, you must ensure that:
- The Taqueria CLI has been [installed](./installation.mdx) and is available in your `$PATH` 
- Docker is installed and currently running

Optional:
- Taqueria VS Code Extension is installed
:::note
The Taqueria VS Code Extension provides direct access to Taqueria tasks from the command palette. Under the hood, the VS Code Extension makes calls to the CLI, so you can be assured the behaviour of tasks will remain consistent regardless of wether they are executed from a terminal or the command palette. The steps in this guide are for using the Taqueria CLI, but you can also run the commands from the Taqueria extension via the VS Code command palette if you prefer
:::

### Getting Started

Taqueria is a plugin based task runner that can be extended through plugins

The tasks available to run on the current Taqueria project can be viewed with the `taq --help` command. Which tasks are available in a given context (directory) depends on wether the directory has been initialized a Taqueria project, and what plugins are installed on that project

Running `taq --help` from an uninitialazed directory will return the following:
```
> taq --help
taq [command]

Commands:
  taq init [projectDir]                  Initialize a new project
  taq scaffold [scaffoldUrl] [scaffoldP  Generate a new project using a pre
  rojectDir]                             -configured scaffold

Options:
      --version     Show version number                           [boolean]
  -p, --projectDir  Path to your project directory          [default: "./"]
  -d, --configDir   Config directory (default ./.taq)   [default: "./.taq"]
  -e, --env         Specify an environment configuration

Taqueria is currently in BETA. You've been warned. :)

Your config.json file is invalid
```
:::note
The message `Your config.json file is invalid` appears because this directory does not have a valid Taqueria `config.json` file in hidden Taqueria directory `./.taq`
:::

As you can see, there are two default commands available to run on an uninitialized directory: `init` and `scaffold and these are the two ways you can initialize a Taqueria project

Each command can have it's own set of required or optional parametoers. Requred parameters are shown surrounded with angled brackets `<requiredParameter>`, while optional parameters are surrounded with square brackets `[optionalParameter]`. For example:
- The command `taq init [projectDir]` has one optional parameter, `projectDir`
- The command `taq list accounts <sandboxName>` has one required parameter, `sandboxName`

The Taqueria CLI also provides optional parameters using CLI flags. The avail 

:::note
This guide will detail initialization and configuration of Taqueria using the `taq init` command. A quickstart guide detailing the usage of `taq scaffold` can be found in [this guide](./scaffolding.md)
:::






Once plugins have been installed


## Configuration


## Installing Plugins


## Taq'ifying a Project


## Compiling a Smart Contract 


## Using a Sandbox


## Originating a Smart Contract


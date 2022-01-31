---
title: Taqueria Plugins
---

TODO: Add pretty table of plugins with descriptions, and links to deeper pages


- Ligo Plugin
- SmartPy Plugin
- etc.

  - [Node.js](https://nodejs.org/) 
  - [LIGO](https://ligolang.org)
  - [Python](https://www.python.org/)
  - [SmartPY](https://smartpy.io/)

  ## Installing Taqueria Plugins

Taqueria plugins each implement a specific function such as a smart contract language, testnet, sandbox, or test framework. Taqueria plugins often rely on 3rd party software libraries such as LIGO or Docker which need to be installed on your machine for the plugin to work correctly

Taqueria is designed to be flexible, streamlined, and customizable so plugins are installed on a per-project basis depending on the particular smart contract language, test framework, sandbox environment, and testnet used in the project

Once installed, plugins provide their functionality by exposing tasks in the Taqueria CLI. The tasks available to run on a particular project can be viewed by running the `shell taq --help ` command in a project directory that's using Taqueria

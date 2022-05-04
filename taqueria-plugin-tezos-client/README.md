# Taqueria Tezos Client Plugin

This is a plugin developed for Taqueria built on NodeJS using the Taqueria Node SDK and distributed via NPM

The Tezos Client plugin exposes the typecheck and simulate tasks. The typecheck task will type check one or more Michelson contracts found in the /artifacts subfolder of the project root. The simulate task will dry run a Michelson contract found in the same abovementioned subfolder.

## Tasks

The Tezos Client plugin provides the following tasks to Taqueria:
- `taq typecheck <sourceFiles> [--sandboxName local]`
- `taq simulate [sourceFile] [inputParameters] <--storage initialStorage> < --sandboxName local>`

## Requirements

- Taqueria v0.0.6 or later
- Node.js v16 or later
- Docker v0.8.4 or later

## Installation

The Tezos Client plugin is distributed as an NPM package that can be installed and uninstalled on a project from the Taqueria CLI

To install the Tezos Client plugin on a Taqueria project, navigate to the project folder and run:
```shell
taq install @taqueria/plugin-tezos-client
```

## Plugin Architecture

This is a plugin developed for Taqueria built on NodeJS using the Taqueria Node SDK and distributed via NPM

For detailed usage and configuration information, view the Tezos Client plugin documentation on the Taqueria website [here](https://taqueria.io/docs/plugins/plugin-tezos-client) 
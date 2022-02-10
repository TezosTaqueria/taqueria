# Taqueria LIGO Plugin

This is a plugin developed for Taqueria built on NodeJS using the Taqueria Node SDK and distributed via NPM

The LIGO plugin exposes a compile task in Taqueria which can target one, or all the LIGO contracts in the contracts folder and compile them to Michelson code output to the artifacts folder

## Tasks

The LIGO plugin provides the following tasks to Taqueria:
- `compile`

## Requirements

- Taqueria v0.0.6 or later
- Node.js v16 or later
- Docker v0.8.4 or later

## Installation

The LIGO plugin is distributed as an NPM package that can be installed and uninstalled on a project from the Taqueria CLI

To install the LIGO plugin on a Taqueria project, navigate to the project folder and run:
```shell
taq install @taqueria/plugin-ligo
```

## Plugin Architecture

This is a plugin developed for Taqueria built on NodeJS using the Taqueria Node SDK and distributed via NPM

For detailed usage and configuration information, view the LIGO plugin documentation on the Taqueria website [here](https://taqueria.io/docs/plugins/plugin-ligo) 
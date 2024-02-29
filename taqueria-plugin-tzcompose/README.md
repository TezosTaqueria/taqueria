# Tzcompose Plugin for Taqueria

This plugin provides integration with tzcompose, a tool by Blockwatch that provides an automation framework for complex transaction sequences on Tezos.

It is written in TypeScript and compiled to a JavaScript bundle for NodeJS using [tsup](https://github.com/egoist/tsup) and uses the `@taqueria/node-sdk` - as are all plugins that the Pinnacle Labs team develops for Taqueria.

## Requirements

- Taqueria v0.42.0 or later
- Node.js v18.18.0 or later

## Building

To build the Tzcompose plugin, run the following command from the root of this repository:

```shell
npm run build -w taqueria-plugin-tzcompose
```

## Installation

To install the Tzcompose plugin on a Taqueria project, navigate to the project folder and run:

```shell
cd [taqueria-project]
taq init # if the project isn't already initialized
taq install @taqueria/plugin-tzcompose
```

## Usage:

The Tzcompose plugin provides a single command to Taqueria: `taq run [pipeline.yaml]`.

For more information of how to create a YAML file for your pipelines, please see the Tzcompose [[documentation]](https://github.com/blockwatch-cc/tzgo/blob/master/cmd/tzcompose/README.md).
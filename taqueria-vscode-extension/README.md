# Taqueria for Visual Studio Code

## Taqueria, A New Way to Build on Tezos

The Taqueria developer suite provides a seamless development workflow to easily build, test and deploy your Tezos applications

## Taqueria VS Code Features:
Run Taqueria commands right in the VS Code Command Palette:
- Initialize Taqueria projects
- Install and manage plugins
- Compile smart contracts in in Ligo, SmartPy, or Archetype
- Launch and query Flextesa sandboxes
- Originate contracts to sandbox and testnet environments

### Requirements

- Taqueria v0.1.8 or later must be [installed](https://taqueria.io/docs/getting-started/installation/) and available in your system's `#PATH`
- Node.js v16 or later
- Docker v0.8 or later

### Running Taqueria Commands in VS Code
1. Open the VS Code command palette by pressing the keys `cmd` + `shift` +`P` together
2. Type `taq` to filter the list of commands to Taqueria
3. Select a Taqueria command from the list to run it

### Quickstart

A basic workflow in Taqueria is:

1. Initialize the project by running the `taq init` command
2. Install necessary plugins (LIGO, SmarPy, Flextesa, Taquito, ect)
3. Compile the source code of your smart contracts
4. Launch a local sandbox and originate contracts to it
5. Originate contracts to a testnet

## Available Plugins

| name         |  pluginName                       |  description                                                |
|--------------|------------------------------     |-------------------------------------------------------------|
| LIGO         | `@taqueria/plugin-ligo`           | A compiler for the LIGO smart contract language             |
| SmartPy      | `@taqueria/plugin-smartpy`        | A compiler for the SmartPy contract language                |
| Flextesa     | `@taqueria/plugin-flextesa`       | A sandbox test network running Tezos Flextesa               | 
| Taquito      | `@taqueria/plugin-taquito`        | A front-end Tezos framework used to originate               |
| TS Generator | `@taqueria/plugin-contract-types` | A type generator that produces TS types from Michelson code |

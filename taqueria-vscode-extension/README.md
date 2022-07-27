# Taqueria for Visual Studio Code

## Taqueria, A Better Way to Build on Tezos

The Taqueria developer suite provides a seamless development workflow to easily build, test and deploy your Tezos applications

## Taqueria VS Code Features:
Run Taqueria commands right in the VS Code Command Palette or Taqueria Side Bar panel:
- Initialize Taqueria projects
- Scaffold a project from a set of templates
- Install and manage plugins
- Compile smart contracts in in Ligo, SmartPy, or Archetype to Michelson
- Launch and query Flextesa sandboxes
- Originate contracts to sandbox and testnet environments
- Validate your contracts' type safety
- Generate typescript types for your contracts
- Test your contracts

### Requirements

- Taqueria v0.8.0 or later must be [installed](https://taqueria.io/docs/getting-started/installation/) and available in your system's `#PATH`
- Node.js v16 or later
- Docker v0.8 or later

### Running Taqueria Commands using command pallet
1. Open the VS Code command palette by pressing the keys `ctrl` + `shift` +`P` (in mac: `cmd` + `shift` +`P`) together
2. Type `taq` to filter the list of commands to Taqueria
3. Select a Taqueria command from the list to run it.

### Running Taqueria Commands using Side Bar Panel
1. Initialize, Scaffold, or open a Taqified folder in Vscode
2. Activate Taqueria's sidebar panel by clicking on Taqueria icon in Activity Bar
3. Use Plugins view to install and uninstall plugins
4. Use Sandboxes view to start, stop, and list accounts of sandboxes
5. Use contracts view to compile your contracts
6. Use environments view to typecheck your contracts to an environment

### Quickstart

A basic workflow in Taqueria is:

1. Create a project by either of the following ways:
    1.1. Initialize the project by running the `Taqueria: Initialize Project` command
    1.1. Scaffold a project by running the `Taqueria: Scaffold Project` command
2. Install necessary plugins (LIGO, SmartPy, Flextesa, Taquito, Tezos Client, ect)
3. Compile the source code of your smart contracts
4. Launch a local sandbox and originate contracts to it
5. Originate contracts to a testnet

## Available Plugins

| name         |  pluginName                       |  description                                                |
|--------------|------------------------------     |-------------------------------------------------------------|
| LIGO         | `@taqueria/plugin-ligo`           | A compiler for the LIGO smart contract language             |
| SmartPy      | `@taqueria/plugin-smartpy`        | A compiler for the SmartPy contract language                |
| Archetype    | `@taqueria/plugin-archetype`      | A compiler for the Archetype contract language              |
| Flextesa     | `@taqueria/plugin-flextesa`       | A sandbox test network running Tezos Flextesa               | 
| Taquito      | `@taqueria/plugin-taquito`        | A front-end Tezos framework used to originate               |
| TS Generator | `@taqueria/plugin-contract-types` | A type generator that produces TS types from Michelson code |
| Tezos Client | `@taqueria/plugin-tezos-client`   | Interacts with Tezos client: type checking and simulating   |
| Jest         | `@taqueria/plugin-jest`           | Provides the ability to test your smart contracts           |


---
title: Taqueria Roadmap
---

 This roadmap indicates high level features which are in development, planning, or have been released

## In Development

These features will be launching in upcoming releases:
- Jest plugin
- Smart contract testing with Jest
- Complex origination workflows 
- Contract metadata support
- State API
- Artifact Registry

## On the Horizon
- CI integration with CI/CD tests
- Multi-file smart contract compilation, origination, and testing
- Token metadata support
- Contract metadata with support for off-chain events and errors
- Versioning of smart contracts
- Sandbox baking
- Full SmartPy support
- Explorer integration
- Account integration
- Formal proof of verification for smart contracts

## Shipped

:::note
For full detail on changes, fixes, and improvements made in each release, please refer to the [Taqueria Release Page](https://github.com/ecadlabs/taqueria/releases)

- Taqueria v0.1.1 shipped in February 2022 which added two major features:
  - Project scaffolding
  - TS Type Generation from Michelson`.tz` files which includes:
    - A new Taqueria NPM plugin: @taqueria/plugin-contract-types
    - Awareness of generated types in VS Code Extension
      - Intellisense tooltips for contract parameters
      - Compile time type checking for TS types 



-The first MVP of Taqueria was shipped in January 2022. This release included:
  - CLI
  - Visual Studio Code Extension
  - Initialization of a Tezos Project
  - A demo smart contract and app, `hello-tacos`
  - Compile LIGO and SmartPy smart contracts
  - Using a local sandbox with test accounts
  - SDK for developers to build their own plugins
  - Origination to local, test, and main networks
  - Several plugins:
    - LIGO
    - SmartPy
    - Taquito
    - Flextesa

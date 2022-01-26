---
id: vscode_extension
title: ADR for VS Code Extension
description: Architecture Design Record for Taqueria's VS Code Extension
keywords:
- adr
- vscode
---

## *DRAFT* Context and Problem Statement


Taqueria will publish a VS Code Extension so that Tezos application developers have a good Developer Experience when developing, testing, debugging and deploying their application to the Tezos blockchain.

VS Code extensions enable extension developers to *contribute* new *commands* and capabilities to the VS Code environment. In Taqueria's case, development actions specific to the Tezos developer's context and needs will be added to the VS Code environment. See VS Codes [Extension Capabilities Overview](https://code.visualstudio.com/api/extension-capabilities/overview) for detailed information on what an Extension can add to VS Code.

Taqueria is a plugin orientated product. Most functionality is represented as a plugin, and plugins offer the Taqueria user different features & capabilities. We want to surface the features provided by Taqueria plugins via the VS Code Extension, allowing the user to run commands specific to Taqueria plugins from the VS Code command pallet.

VS Code Extention commands get registered via the `command` property in the extensions [Contribution Point](https://code.visualstudio.com/api/references/contribution-points). Commands are defined statically in the Extensions Manifest. There is no run-time API to modify the commands offered by the extension. 


## Considered Options

### 1. Hard code all commands into the Taqueria Contribution Point extension at extension build time
### 2. Use VS Code _Tasks_ instead of using a VS Code Extension at all
### 3. Monkey patch the VS Code extension at startup time making Commands dynamic
### 4. Ship a parent Taqueria Extension, and have each Taqueria Plugin ship their extension


## Decision Outcome

Chosen Outcome: 
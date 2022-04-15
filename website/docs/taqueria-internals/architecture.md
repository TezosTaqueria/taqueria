---
title: Architecture
sidebar_position: 2
---

Taqueria is a developer tool that helps Tezos application and smart-contract developers be more productive. Taqueria is a specialized task runner specific to the Tezos software development domain at its core.

Taqueria consists of:

### The Taqueria SDK

The Taqueria SDK is the core of Taqueria. It manages the invocation and composition of all the Taqueria plugins. The user interface that Taqueria users interact with is a CLI named `taq` and a VS-Code plugin.

A project managed by `taqueria` will have a directory named `.taq` in its root directory. This directory contains configuration details specific to the project and temporary data related to recent deployments of contracts to a testnet, sandbox or mainnet.

### Taqueria Plugins

Functionality not implemented in the Taqueria SDK is, instead, implemented in a Taqueria Plugin. Plugins allow Taqueria a standard interface to interact with other tools such as Smart-Contract language compilers, static analysis tools or other activities such as the discovery of and deployment to Tezos networks, such as testnets, sandboxes, or mainnet.

![Taqueria Architecture Diagram](/img/taqueria_diagram.png)

---
title: Overview 
sidebar_position: 1
pagination_next: hello_world
---

:::caution
Taqueria is in the early stages of development. APIs and User Interfaces are unstable and likely to change. 
:::

# What is Taqueria

Taqueria is for software developers building Products and Sevices on the Tezos blockchain. Taqueria is a development suite that gives Tezos application developers a familiar workflow that provides a cohesive developer experience when developing, debugging and testing all the elements that go into building a modern Tezos application.

## Getting Started

### Building Taqueria

:::caution
As Taqueria is in the early stages of development, you must build the tool yourself. Pre-built binaries of Taqueria will be published in the near future.
:::

#### Prerequisites. 

You must install the latest stable version of [deno][deno]

To build Taqueria, clone the taqueria project, and from the root of the project directory, run `./bin/build.sh`
The `build.sh` script creates an executable file named `taqueria`.

:::tip
The rest of our documentation assumes you have the `taqueria` command installed in your `$PATH`. All command-line examples are written as `taqueria ...` 
:::

## Generate a new Tezos project

1. Initialize a new project: `taqueria init test-project`
2. Change directories: `cd test-project`
3. Initialize the project as an NPM project: `npm init -y`
4. Install the LIGO plugin: `npm i -D ../taqueria-plugin-ligo` <!-- FIXME: This assumes the user init'd the project in the taqueria source code -->
5. Activate the LIGO plugin by adding the following to the plugins array in ./.taq/config.json:

```json
{
    "name": "taqueria-plugin-ligo",
    "type": "npm"
}
```

:::note
Step 3 to 5 are temporary and will be automated by `taqueria` soon.
:::

6. Continue steps 4-5 for each additional plugin you want to install

## Taqueria Plugins

Taqueria has a plugin system, where a plugin represents most functionality. Plugins allow Taqueria users to use only the tools relevant to them. Advanced users can even create their own Taqueria plugins using the Taqueria SDK.

### Available Plugins

|Name| Purpose |
|---|---|
|ligo| Compiles [Ligo][ligo] smart contracts to Michelson|
|smartpy| Compiles [SmartPy][smartpy] smart contracts to Michelson|
|taqueria-sdk| The core of the Taqueria framework, relevant only to Taqueria plugin developers|

---

[deno]: https://deno.land/#installation
[smartpy]: https://smartpy.io/
[ligo]: https://ligolang.org/
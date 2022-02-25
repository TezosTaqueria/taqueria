

<p align="center">
  <a href="https://taqueria.io">
    <img alt="Taqueria" src="https://user-images.githubusercontent.com/1114943/150659418-e55f1df3-ba4d-4e05-ab26-1f729858c7fb.png" width="" />
  </a>
</p>
<h1 align="center">
  Taqueria - A New Way to Build on Tezos
</h1>

> WARNING: This project has not officially been made public. Congratulations on finding it. Have a look around, but be aware, it's not yet ready for public consumption.! CLIs and APIs are unstable and likely to change.

## What is Taqueria?

Taqueria is an extensible, open source plugin based framework for Tezos dApp development

In more practical terms, Taqueria is a task runner that you can use from the command line or the VS Code command palette to quickly accomplish tasks related to Tezos development. Taqueria uses a plugin architecture to implement tasks that provide complex and domain specific functionality

Taqueria includes:
 - A command line interface (CLI) you use in your terminal through a command named `taq`
 - A library of plugins that add tasks to Taqueria
 - A VS Code Extension which provides the ability to run Taqueria tasks from the command palette

## Installing the Taqueria CLI

The Taqueria CLI is an executable binary named `taq` installed globally in your shell's `$PATH`

1. Download the correct build of Taqueria for your operating system
2. Make the Taqueria binary `taq` executable
3. Add `taq` to your shell's `$PATH`

Builds for the latest release of Taqueria:
| OS      | URL                                     |  
|---------|-----------------------------------------|
| MacOS   | https://taqueria.io/get/macos/taq       |
| Linux   | https://taqueria.io/get/linux/taq       |
| Windows | https://taqueria.io/get/windows/taq.exe |

Builds are also available on the [releases](https://github.com/ecadlabs/taqueria/releases) page on Github

> Detailed instructions for installing and using Taqueria can be found [here](https://taqueria.io/docs/getting-started/installation)

## Getting Started

Once installed, Taqueria is run from the command line using the `taq` command. The basic structure of a Taqueria command is:
```shell
taq <taskName> [options]
```

You can use `taq --help` to list the available tasks in a given context
![taq help output](/website/static/img/taq-help-cli.png)

### Plugins

Taqueria plugins extend the functionality of Taqueria by adding additional tasks that can be run on a project. Currently available plugins are:
| name         |  pluginName                       |  description                                                |
|--------------|------------------------------     |-------------------------------------------------------------|
| LIGO         | `@taqueria/plugin-ligo`           | A compiler for the LIGO smart contract language             |
| SmartPy      | `@taqueria/plugin-smartpy`        | A compiler for the SmartPy contract language                |
| Flextesa     | `@taqueria/plugin-flextesa`       | A sandbox test network running Tezos Flextesa               | 
| Taquito      | `@taqueria/plugin/taquito`        | A front-end Tezos framework used to originate               |
| TS Generator | `@taqueria/plugin-contract-types` | A type generator that produces TS types from Michelson code |

Taqueria manages plugins by providing installation/uninstallation via the `taq install <pluginName>` and `taq uninstall <pluginName>` tasks. Plugins are installed on a per-project basis during which the NPM package is downloaded and installed on the project, and configuration is added in the `./.taq/config.json` file

### Steps to Create a Taqueria Project

There are two approaches to initializing a Taqueria project: initializing an empty project, or using a pre-configured project scaffold

#### Initializing an empty Taqueria project
1. Initialize a new project: `taq init test-project`
2. Change directories: `cd test-project`
3. Initialize the project as an NPM project: `npm init -y`
4. Install the LIGO plugin: `taq install @taqueria/plugin-ligo`
6. Continue steps 4-5 for each additional plugin you want to install

#### Using a Taqueria Project Scaffold
1. Run the command `taq scaffold https://github.com/ecadlabs/taqueria-scaffold-quickstart test-project`
2. Change directories: `cd test-project`
3. Run the project setup command `npm run setup`
4. Start the app by running `npm run start`

---
title: Installing Taqueria
---

<!-- -----
Content Type: How-to Guide

Purpose: To guide a developer through process of installing the Taqueria CLI, basic plugins, and the VS Code Extension 

Audience: Novice to intermediate developers with a very basic understanding of Taqueria and CLI usage

Goal: To provide a simple, easy, and reliable installation process for developers to follow so there is minimal churn due to frustration or inability to use the product due to installation or configuration issues

Questions:
- What do you need to understand about Taqueria to understand the installion process?
- What options are there for installing Taqueria?
- What are the exact steps a user will need to follow for each OS?
- What are the most frequent friction points new users will have?

----- -->

## Installation Basics

Installing Taqueria is a quick and easy process if you understand a few basic concepts and follow the steps outlined in this guide

Taqueria is a software suite that includies a CLI interface, a library of Node.js plugins, and a VS Code extension. Each of these are installed separatley. A Taqueria installation can be as simple as just the Taqueria CLI, or a more standard installation which would also include: the VS Code extension, and several plugins including: 
- A sandbox plugin such as taqueria-plugin-flextesa
- A complier plugin such as taqueria-plugin-ligo

To be explicit, the components you need to install are:
- 'taq', an executable binary file installed globally in your $PATH that implements the Taqueria CLI, SDK and protocol
- Any number of optional Taqueria plugins which are Node.js packages installed via NPM on a per-project basis
- An optional VS Code plugin 'Taqueria' installed directly through the VS Code Extension Marketplace

## Requirements

### Taqueria CLI

The requirements for the Taqueria CLI are minimal:
- A unix shell or compatable operating system:
    - Windows (10 or later)
    - MacOS (Catalina or later)
    - Linux (Ubuntu???, Other distro???)
- Administrator privileges on your machine to allow unsigned software to run

### Taqueria Plugins

Taqueria plugins are Node.js packages installed via NPM. You will need to have a recent version of [Node.js](https://nodejs.org/) installed if you want to use any of the currently available plugins

Some plugins have their own dependencies which also need to be installed for the plugin to work correctly. Dependencies for popular plugins include: 
- 'taqueria-plugin-ligo'
    - LIGO which can be installed [here](https://ligolang.org/docs/intro/installation/)
- 'taqueria-plugin-smartpy'
    - A recent version of [python](https://www.python.org/)
    - [SmartPY](https://smartpy.io/) which is installed as detailed in [this guide](https://smartpy.io/docs/cli/#direct-installation)
- 'taqueria-plugin-flextesa'
    - Requires a recent version of Docker which is available [here]()

### VS Code Extension

The VS Code Extension requires a recent version of Microsoft Visual Studio Code which can be installed [here](https://code.visualstudio.com/) 

## Installing the Taqueria CLI

### Overview

Installing the Taqueria CLI involves the following steps:

1. Download the correct build of Taqueria for your operating system
2. Make the Taqueria binary (taq) executable
3. Move the binary to a desired installation directory (ie. /usr/local/bin, /opt, ~/taqueria, ect)
4. Update your shell's $PATH to include the Taqueria installation directory
5. Configure your OS security settings to allow the Taqueria CLI/SDK (taq) to run

:::note

The Taqueria executable is not currently code signed for Mac or Windows operating systems and at this time you will recieve warnings about 'insert actual error message' from your OS and you must explicitly allow the taq executable to run using the reccomended solutions detailed in the OS specific installation instructions

Once these steps are complete, you will be able to run Taqueria from your terminal using the 'taq' command

Step by step instructions for installing Taqueria with the LIGO, Flextesa, and VS Code plugins installed on a Windows, MacOS, or Linux machine are detailed in the following section. If you are comfortable with downloading the unsigned Taqueria binary and configuring it to run in your terminal on your own, you can find the correct build for your local machine [here](https://github.com/ecadlabs/taqueria/releases) and then skip to the [quick-start guide](#getting-started/quickstart) 

### OS Specific Installation Instructions



## Installing Taqueria Plugins

Taqueria plugins each implement a specific function such as a smart contract language, testnet, sandbox, or test framework. Taqueria plugins are simple in nature and usualy rely on 3rd party softwore libraries like LIGO and SmartPY which need to be installed on your machine for the plugin to work correctly

Taqueria is designed to be flexible, streamlined, and customizable so plugins are installed on a per-project basis based on the particular smart contract language, test framework, sandbox environment, and testnet required for the project

Once installed, plugins provide their functionality through tasks in the Taqueria CLI. The Taqueria plugins currently installed on the project add tasks toavailable tasks show up when you run the 'taq --help' command in that particular project


---
title: Installing Taqueria
---

<!-- -----
Content Type: How-to

Purpose: To guide a developer through the setup and configuration process as easily as possible

Audience: Novice to intermediate developers with a very basic understanding of CLI usage

Goal: To provide a simple, easy, and reliable installation process for developers to follow so there is minimal churn due to frustration or inability to use the product due to installation or configuration issues

Questions:

- What do you need to understand about Taqueria to understand the installion process?
- What options are there for installing Taqueria?
- What are the exact steps a user will need to follow for each OS?
- What are the most frequent friction points new users will have?
----- -->

## The Basics

Taqueria is comprised of 3 main components which each have a different installation process:
- An executable binary file installed globally in your $PATH that implements the Taqueria CLI, SDK and Protocol
- Any number of optional plugins installed on a per-project level which implement specific functionality such as sandboxes, compilers, or test frameworks
- An optional VS Code plugin installed directlsy through the VS Code Extension Marketplace

## Requirements

### Taqueria Binary

The requirements for the Taqueria binary are minimal and include:
- A compatable operating system:
    - Windows (Version XX or later)
    - MacOS (Version XX or later)
    - Linux (Ubuntu version XX or later, Other distro version XX or later)
- Administrator privileges on your machine to allow unsigned software to run

### Taqueria Plugins

Taqueria plugins are NPM packages which require Node.JS version XX or later

Each plugin may have it's own dependencies which also need to be installed:
- LIGO Plugin
    - Requires LIGO v XX
- SmartPY Plugin
    - Requires SmartPY v XX
- Sandbox Plugin
    - Requires Docker v XX

### VS Code Extension

The VS Code Extension requires Microsoft Visual Studio Code version XX or later

## Installing the Taqueria CLI

### Overview

Installing the Taqueria CLI involves the follawing high level steps:

1. Download the correct build of Taqueria for your operating system from the [releases](link) page
2. Make the binary file executable
3. Move binary to desired location (ie. /usr/local/bin, /opt, ~/, ect)
4. Update your shell's $PATH to include the location of your Taqueria installation
5. Configure your OS security settings to allow Taqueria to run

Once these steps are complete, you will be able to run Taqueria from your terminal using the 'taq' command

### OS Specific Installation Instructions

## Installing Taqueria Plugins

Taqueria plugins each implement a specific feature such as a smart contract compiler, or sandbox. Taqueria is designed to be flexible, streamlined, and customizable so no 

Taqueria plugins are installed on a per-project basis based on the particular smart contract language compiler or sandbox that project needs

Once installed, plugins provide tasks to the Taqueria CLI which are available when you run the 'taq' command in that particular project. To see what plugins tasks are available in the current project,  run  ```taq --help``` in your terminal from your project directory
# Taqueria Flextesa Plugin

This plugin provides the ability to easily configure and run Flextesa sandbox instances within Taqueria that you can use for development and testing

## Tasks

The Flextesa plugin provides the following tasks to Taqueria:
- `start sandbox`
- `stop sandbox`
- `list accounts`

## Requirements

The Flextesa plugin requires Docker v0.8.4 or later to be installed locally

Docker is available [here](https://www.docker.com/)

## Installation

The Flextesa plugin is distributed as an NPM package that can be installed and uninstalled on a project from the Taqueria CLI

To install the Flextesa plugin on a Taqueria project, navigate to the project folder and run:
```shell
taq install @taqueria/plugin-flextesa
```

## Plugin Architecture

This is a plugin developed for Taqueria built on NodeJS using the Taqueria Node SDK and distributed via NPM

For detailed usage and configuration information, view the Flextesa plugin documentation [here](https://taqueria.io/docs/plugins/plugin-flextesa) 
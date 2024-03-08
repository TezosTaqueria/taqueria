---
title: run
---

## Overview

Taq `run` is used to execute a script using TzCompose, a powerful automation framework developed by Blockwatch for executing complex transaction sequences on Tezos. This task allows you to run custom scripts that interact with the Tezos blockchain, perform various operations, and automate complex workflows.

In order to use `run`, you need to have the TzCompose plugin installed in your Taqueria project. For additional details, please see the [TzCompose plugin](/docs/plugins/plugin-tzcompose) documentation.

### Command

```shell
taq run <scriptPath>
```

### Task Details

| Task Name | Command           | Type             | Description                                     |
| --------- | ----------------- | ---------------- | ----------------------------------------------- |
| `run`     | `taq run <scriptPath>` | Plugin - TzCompose | Runs a script using TzCompose                   |

### Command-Line Arguments

| Argument     | Required | Description                                                  | Example Usage                     |
| ------------ | -------- | ------------------------------------------------------------ | --------------------------------- |
| `<scriptPath>` | Yes      | The path of the script to run using TzCompose               | `taq run ./scripts/deploy.yaml`  |

### Options

| Option          | Description                                                  |
| --------------- | ------------------------------------------------------------ |
| `-e, --env`     | Specify an environment configuration                         |
| `-v, --verbosity` | Verbose level (1-3)                                        |

## Usage

To run a script using TzCompose, navigate to your Taqueria project directory and execute the following command:

```shell
taq run <scriptPath>
```

Replace `<scriptPath>` with the path to your TzCompose script file (e.g., `./scripts/deploy.yaml`).

You can optionally specify an environment configuration using the `-e` or `--env` flag, which allows you to customize the behavior of your script based on different environments (e.g., development, staging, production).

The `-v` or `--verbosity` flag allows you to control the verbosity level of the output. You can provide a value from 1 to 3, with 1 being the least verbose and 3 being the most verbose.

For detailed information on creating YAML files to define your TzCompose scripts, please refer to the [TzCompose documentation](https://github.com/blockwatch-cc/tzgo/blob/master/cmd/tzcompose/README.md).

## Examples

To run a script located at `./scripts/deploy.yaml`:

```shell
taq run ./scripts/deploy.yaml
```

To run a script with a specific environment configuration:

```shell
taq run ./scripts/deploy.yaml --env production
```

To run a script with increased verbosity:

```shell
taq run ./scripts/deploy.yaml --verbosity 3
```
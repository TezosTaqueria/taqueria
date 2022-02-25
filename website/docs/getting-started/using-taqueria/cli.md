---
title: Taqueria CLI
---

Taqueria is a plugin based task runner that can be extended through plugins

The tasks available to run on the current Taqueria project can be viewed with the `taq --help` command. Which tasks are available in a given context (directory) depends on wether the directory has been initialized a Taqueria project, and what plugins are installed on that project

Running `taq --help` from an uninitialazed directory will return the following:
```
> taq --help
taq [command]

Commands:
  taq init [projectDir]                  Initialize a new project
  taq scaffold [scaffoldUrl] [scaffoldP  Generate a new project using a pre
  rojectDir]                             -configured scaffold

Options:
      --version     Show version number                           [boolean]
  -p, --projectDir  Path to your project directory          [default: "./"]
  -d, --configDir   Config directory (default ./.taq)   [default: "./.taq"]
  -e, --env         Specify an environment configuration

Taqueria is currently in BETA. You've been warned. :)

Your config.json file is invalid
```
:::note
The message `Your config.json file is invalid` appears because this directory does not have a valid Taqueria `config.json` file in hidden Taqueria directory `./.taq`
:::

As you can see, there are two default commands available to run on an uninitialized directory: `init` and `scaffold and these are the two ways you can initialize a Taqueria project

Each command can have it's own set of required or optional parametoers. Requred parameters are shown surrounded with angled brackets `<requiredParameter>`, while optional parameters are surrounded with square brackets `[optionalParameter]`. For example:
- The command `taq init [projectDir]` has one optional parameter, `projectDir`
- The command `taq list accounts <sandboxName>` has one required parameter, `sandboxName`

The Taqueria CLI also provides optional parameters using CLI flags. The avail 

:::note
This guide will detail initialization and configuration of Taqueria using the `taq init` command. A quickstart guide detailing the usage of `taq scaffold` can be found in [this guide](./scaffolding.md)
:::
# Taqueria Taquito Plugin

The Taquito plugin provides stateful tasks to originate and interact with smart contracts in Tezos sandboxes or testnets

## Installation

To install the Taquito plugin on a Taqueria project, navigate to the project folder and run:
```shell
taq install @taqueria/plugin-taquito
```

## Configuration

The target networks, sandboxes, and environments are configured in the Taqueria project's `config.json` file. For additional information on configuring network, documentation can be found [here](/docs/config/networks/)

##  The `taq originate` task

Basic usage is:

```shell
taq originate <filename>
```

### Basic description

The Taquito plugin exposes a `taq originate` (or `taq deploy`) task in Taqueria which will originate the specified Michelson contract to a Taqueria environment.

This will originate a Michelson `.tz` file in the `/artifacts` directory to the default environment (the sandbox named `local`).

By default, the storage value used for origination will live in a file named `CONTRACT.default_storage.tz`, in `/artifacts`, where `CONTRACT` is the name of the contract to originate. If it can't find it, it'll not originate the contract. Alternatively, you can explicitly specify a storage file with the `--storage` option described below.

After origination, an alias will be created to refer to the originated contract's address in `config.json`, in the targeted environment. By default, the name of the alias will be the name of the contract, without the `.tz` extension. If this alias already exists in the environment you're originating the contract to, then the address will be overriden with the new address. As such, the alias will always refer to the address of the latest origination of the contract. This facilitates hot reloading when doing dApp development.

### Options

- To target a different environment, use the `--env` flag with the named Taqueria environment you want to target. E.g. `taq originate filename -e jakartanetEnv`.

- To originate a contract with a specific storage value, use the `--storage` flag and supply the name of the storage file that contains the storage value. E.g. `taq originate filename --storage someStorage.tz`

- To provide an alias for the originated contract explicitly, use the `--alias` flag and supply a name.

##  The `taq transfer` task

Basic usage is:

```shell
taq transfer <contract alias or address>
```

### Basic description

The Taquito plugin exposes a `taq transfer` (or `taq call`) task in Taqueria which will call the specified Michelson contract deployed to a Taqueria environment (default environment is one with sandbox named `local`).

This allows interactions from implicit accounts to implicit or smart contract accounts.

### Options

- To target a different environment, use the `--env` flag with the named Taqueria environment you want to target.

- By default, the amount of tez sent is `0`. Use the `--tez` flag to specify an amount you want.

- By default, the parameter is `Unit`. Use the `--param` flag to specify a filename, in `/artifacts`, that contains the content of the parameter for the transfer/call.

- By default, the entrypoint is `default`, which points to no specific annotated entrypoint. Use `--entrypoint` to specify an annotated entrypoint to call. E.g. if the parameter type of a Michelson contract is `(or (or (int %decrement) (int %increment)) (unit %reset))`, then there are two ways to call the `increment` entrypoint, with parameter `(Left (Right 14))` or with parameter `14` if your command contains `--entrypoint increment`.

### Examples

`taq call counter --param counter.parameter.param1.tz` will call a smart contract aliased as `counter` in the default environment with the parameter contained in that `.tz` file, transferring `0` tez.

`taq transfer tz1VSUr8wwNhLAzempoch5d6hLRiTh8Cjcjb --tez 20` will transfer `20` tez to that address, which is some implicit account.

> ### :page_with_curl: Note
> `transfer` and `call` are exactly the same task. They are synonyms.

## Plugin Architecture

This is a plugin developed for Taqueria built on NodeJS using the Taqueria Node SDK

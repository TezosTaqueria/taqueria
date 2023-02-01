# Taqueria Flextesa Plugin

[Flextesa](https://tezos.gitlab.io/flextesa/) is a flexible Tezos sandbox environment that's easy to work with. It runs a Tezos node and network in a Docker container on your local machine

This plugin provides the ability to easily configure and run Flextesa sandbox instances within Taqueria that you can use for development and testing
 
## Overview

With the Flextesa plugin you configure various sandboxes for use in Taqueria that you can start, stop, and query from the CLI and Visual Studio Code extension


Some helpful things to know:
- Multiple sandboxes can be configured and run concurrently
- You can configure the Tezos `protocol` for each sandbox to test against current, and future network upgrades
- Accounts and balances will be initialized each time a sandbox is started
- Sandboxes can be added to Taqueria environments and then targeted from the CLI using the `--env [envName]` option 

## Requirements

- Taqueria v0.26.0 or later
- Node.js v16.16 or later. (v17.x.x or later is not supported)
- Docker v20.10.12 or later

## Installation

The Flextesa plugin is distributed as an NPM package that can be installed and uninstalled on a project from the Taqueria CLI

To install the Flextesa plugin on a Taqueria project, navigate to the project folder and run:
```shell
taq install @taqueria/plugin-flextesa
```

> ### :page_with_curl: Note
> The first time you start a sandbox, it might take several minutes to start. This is expected behavior as it takes time to download the flextesa docker image to your computer

Once installed, you can confirm functionality by running the command `taq start sandbox` which will start a sandbox with the default `local` configuration

> ### :page_with_curl: Note
> You can override the Flextesa version used by the plugin by creating the environment variable `TAQ_FLEXTESA_IMAGE` and setting it to your desired Flextesa Docker image

## CLI Commands

The Flextesa plugin allows you to start, stop, and query the sandboxes configured in `.taq/config.json` from the CLI

The following commands are available from the CLI:
- `taq start sandbox [sandboxName]`
- `taq stop sandbox [sandboxName]`
- `taq list accounts [sandboxName]`
- `taq bake [sandboxName]`
- `taq show-protocols [sandboxName]`

> ### :page_with_curl: Note
> In the tasks above, `[sandboxName]` can be substituted with `[environmentName]` if using Taqueria v0.28.0.

## Plugin Configuration

Configuration is done in the project's `.taq/config.json` file. Here you can configure additional sandboxes


### The Default Development Environment

> ### :page_with_curl: Note
> Note, as of Taqueria *v0.28.0*, the schema has been updated. The examples below will not work if using an earlier version of Taqueria.

Taqueria has the concept of an environment which can be targeted when invoking a Taqueria task. An environment provides an execution context
that facilitate the means for plugins to do the following:
- Distinguishing when a testnet is being targeted versus a flextesa sandbox (or something some other environment type provided by another plugin)
- Retrieve the addresses of contracts deployed to the environment
- Separate account instances from one environment to another

There are different types of environments, but as of v0.28.0, we support two environment types: a) simple; b) flextesa

In this doc, we will focus on the _flextesa_ environment type.

If an explicit environment isn't specified, then Taqueria will invoke tasks using the default environment, which is specified by the
`environmentDefault` key in your `.taq/config.json` file.

To use a different environment, you may specify `taq --env [environmentName]` flag when invoking a Taqueria task and that environment will be used
as the execution context for that particular task invocation.

When a Taqueria project is initialized using `taq init`, an environment is created for you called _development_, which is also configured
as the default environment. This environment is of type _flextesa_ and configured as shown below:

```json
"environments": {
        "development": {
            "type": "flextesa",
            "label": "Local Tezos Sandbox"
        },
        ...
    },
```

### Accounts

Accounts are defined in the `accounts` property of `config.json` and are global to the project. These accounts are referred to as _declared accounts_.

Taqueria provides five default declared accounts in the default configuration:

```json
"accounts": {
        "bob": {
            "balance": {
                "amount": "3_000_000_000",
                "units": "mutez"
            }
        },
        "alice": {
            "balance": {
                "amount": "3_000_000_000",
                "units": "mutez"
            }
        },
        "john": {
            "balance": {
                "amount": "3_000_000_000",
                "units": "mutez"
            }
        },
        "jane": {
            "balance": {
                "amount": "3_000_000_000",
                "units": "mutez"
            }
        },
        "joe": {
            "balance": {
                "amount": "3_000_000_000",
                "units": "mutez"
            }
        }
    },
```

When the sandbox for this environment is started, the declared accounts defined in the configuration will be _instantiated_. This means that they will be created
on the sandbox and a `config.local.development.json` file will be created for you. This file is environment _and_ developer specific, and should not be checked
into source control. It's contents will resemble the following:

```json
{
    "accountsDefault": "bob",
    "accounts": {
        "bob": {
            "encryptedKey": "edpkurPsQ8eUApnLUJ9ZPDvu98E8VNj4KtJa1aZr16Cr5ow5VHKnz4",
            "publicKeyHash": "tz1aSkwEot3L2kmUvcoxzjMomb9mvBNuzFK6",
            "secretKey": "unencrypted:edsk3RFfvaFaxbHx8BMtEW1rKQcPtDML3LXjNqMNLCzC3wLC1bWbAt"
        },
        "alice": {
            "encryptedKey": "edpkvGfYw3LyB1UcCahKQk4rF2tvbMUk8GFiTuMjL75uGXrpvKXhjn",
            "publicKeyHash": "tz1VSUr8wwNhLAzempoch5d6hLRiTh8Cjcjb",
            "secretKey": "unencrypted:edsk3QoqBuvdamxouPhin7swCvkQNgq4jP5KZPbwWNnwdZpSpJiEbq"
        },
        "john": {
            "encryptedKey": "edpktt6t2ENhxiQqun6bXPPWC6tFVvNPTDRh1gEPGX4BgDgbDnmGzP",
            "publicKeyHash": "tz1Zwoh1QCVAvJ4sVTojMp9pLYp6Ji4NoZy6",
            "secretKey": "unencrypted:edsk3Un2KRUUoWZufi914HQem96ejVFnkyD8GXRPUSkgqy5etsYXEN"
        },
        "jane": {
            "encryptedKey": "edpkvS6TDSWcqqj3EJi3NRrCMyN7oNw1B3Hp37R19tMThqM8YNhAuS",
            "publicKeyHash": "tz1aHUAC4oviwJuZF1EvVSvFz7cu9KMNYBph",
            "secretKey": "unencrypted:edsk3UkdS1UBfTBkMAoFxmfdmUHmCdNhTzDJ1cSJuZhU1b6k6fZZoQ"
        },
        "joe": {
            "encryptedKey": "edpkuT1QYPYbLLQz9dXhQS33ncsixxeGHbNGmntPTR4VBbWmskHPrV",
            "publicKeyHash": "tz1MVGjgD1YtAPwohsSfk8i3ZiT1yEGM2YXB",
            "secretKey": "unencrypted:edsk3Un2FU9Zeb4KEoATWdpAqcX5JArMUj2ew8S4SuzhPRDmGoqNx2"
        }
    },
    "label": "Local Tezos Sandbox",
    "rpcUrl": "http://localhost:20000"
}
```

### Adding/Editing a New Sandbox Configuration

Sandbox configurations are added as key/value pairs to the main `environments` object using the format:

```json
environmentName : { sandboxConfigObject }
```

Inside the `sandboxConfigObject`, there are the following properties you can configure:

> ### :warning: CAUTION
> Changes to a your flextesa environment will not take effect till you restart the sandbox.

#### 'type'
Indicates which type of environment is defined.

> ### :page_with_curl: Note
> Environment types are provided by plugins, except for the _simple_ type which is built-in to Taqueria, and used to specify a remote RPC node.

#### 'label'
An arbitrary string used to describe a particular configuration

#### 'protocol'

A string value which accepts valid Tezos protocol hashes. This value will configure the sandbox to run a particular version of the Tezos network which can be used
for testing upcoming network changes, or testing backwards-compatibility.

To see a list of protocols supported by the flextesa plugin, please run: `taq show-protocols [environmentName]`.

#### 'rpcUrl'

A string which corresponds to the local URL you would like the sandbox to run on

#### `accountsDefault`

The name of the account to use by default when a task requires an account to perform its function.

#### `annotations`

Used to specify configuration options specific to the environment type, which can then be referenced and interpreted by the plugin which provided the associated
environment type.

> ### :page_with_curl: Note
> In addition to the fields above, when a sandbox is first started, a list of accounts specific to the sandbox configuration will be generated and appended to the sandboxConfigObject. These accounts will respect the declared balances from the accounts field in the root of your config.json

### Baking

As of Taqueria v0.28.0, the ability to configure how baking works for a sandbox is available.

#### Changing the block time

The default block time for a flextesa sandbox is _5_, but can be configured in your `.taq/config.json` file:

```json
{
    "environments": {
        "development": {
            "type": "flextesa",
            "label": "Local Tezos Sandbox",
            "annotations": {
                "block_time": 1
            }
        },
        ...
    },
    ...
}
```

The _block_time_ property can be set to any integer greater than 1.

#### Disable Baking

By default, a flextesa sandbox will launch a baker daemon which will bake blocks according to the provisioned block time. However, baking can be
disabled to give developers more flexibility and control of the baking process. To disable baking, adjust your environment in your `.taq/config.json` file:

```json
{
    "environments": {
        "development": {
            "type": "flextesa",
            "label": "Local Tezos Sandbox",
            "annotations": {
                "block_time": 1,
                "baking": "disabled"
            }
        },
        ...
    },
    ...
}
```

After restarting your sandbox, operations can be injected to the flextesa node, but those operations will reside in the mempool and not be baked until you
manually run:

```
taq bake [sandboxName]
```

##### Baking on Demand

Rather than have to run `taq bake` manually each time wish to bake a block, you can do the following to bake immediately after an operation is injected:

1. Set the block time to _1_.
2. Run bake task in watch mode: `taq bake -w [sandboxName]`


### Flextesa Plugin Task Registry

#### The `start sandbox` Task

|  attribute |  value                         |  
|------------|:------------------------------:|
|  task      | 'start sandbox'                | 
|  command   | 'start sandbox [sandboxName]'  | 
|  aliases   | ['start flextesa']             |  


#### The `stop sandbox` Task

|  attribute |  value                         | 
|------------|:------------------------------:|
|  task      | 'stop sandbox'                 | 
|  command   | 'stop sandbox [sandboxName]'   | 
|  aliases   | ['stop flextesa']              |  

#### The `list accounts` Task

|  attribute |  value                         | 
|------------|:------------------------------:|
|  task      | 'list accounts'                | 
|  command   | 'list accounts [sandboxName]'  | 
|  aliases   | [ ]                            |

#### The `list accounts` Task

|  attribute |  value                         | 
|------------|:------------------------------:|
|  task      | 'list accounts'                | 
|  command   | 'list accounts [sandboxName]'  | 
|  aliases   | [ ]                            |

#### The `taq bake` Task

|  attribute |  value                         | 
|------------|:------------------------------:|
|  task      | 'bake'                | 
|  command   | 'bake [sandboxName]'  | 
|  aliases   | ['b']                          |

#### The `show-protocols` Task

|  attribute |  value                         | 
|------------|:------------------------------:|
|  task      | 'show-protocols'               | 
|  command   | 'show-protocols [sandboxName]' | 
|  aliases   | ['list protocols']             |

## Plugin Architecture

This is a plugin developed for Taqueria built on NodeJS using the Taqueria Node SDK and distributed via NPM
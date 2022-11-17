# Change Log

## Taqueria v0.24.2  

| Details     |               |
| ----------- | ------------- |
|Release Date | Nov 17, 2022  |
|Release Type | Minor         |
|Release Page | [v0.24.2](https://github.com/ecadlabs/taqueria/releases/tag/v0.24.2) |

### Summary of Impactful Changes

- Ligo storage and parameter files are now created by default (ignored during compilation if they remain empty)
- The new naming convention for LIGO contract storage and parameter files is `<CONTRACT_NAME>.storageList.<EXTENSION>` and `<CONTRACT_NAME>.parameterList.<EXTENSION>` (`<CONTRACT_NAME>.storages.<EXTENSION>` and `<CONTRACT_NAME>.parameters.<EXTENSION>` will still be supported)
- The version of Ligo used in the Ligo plugin has been downgraded to `v0.54.1` due to instability in `v0.55.0`
- A mechanism to override the docker images used by plugins via environment variables has been added

### New Features

#### Override Docker Images Used by Plugins

Taqueria now provides the means to override the docker images used by Taqueria plugins via setting environment variables in your shell or CI/CD 

The available constants you can set to override are:

- TAQ_FLEXTESA_IMAGE environment variable to override the default image for the flextesa plugin
- TAQ_ARCHETYPE_IMAGE environment variable to override the default image for the archetype plugin
- TAQ_LIGO_IMAGE environment variable to override the default image for the ligo plugin
- TAQ_TEZOS_CLIENT_IMAGE environment variable to override the default image for the tezos client plugin

### Bug Fixes

- Tests now use compliant TS modules

### Deprecations and Breaking Changes

- The use of `<CONTRACT_NAME>.storages.<EXTENSION>` and `<CONTRACT_NAME>.parameters.<EXTENSION>` are now deprecated and will be removed in the future

### Other Product Changes

- A `quickstart.md` file is no longer created on `taq init`

### Migrating from Legacy Versions

To upgrade, you must download Taqueria v0.24.2 binary, replacing the legacy version

This can be done by following these steps:

1) Change into the installation directory

```shell
sudo cd /usr/local/bin
```

2) Remove the existing `taq` binary

```shell
sudo rm taq
```

3) Download the appropriate Taqueria v0.24.2 binary for your operating system

```shell
sudo curl -LO https://taqueria.io/get/macos/taq
sudo curl -LO https://taqueria.io/get/linux/taq
```

:::warning
The Flextesa plugin can hang or crash if old docker images exist on your machine. Install the new `@taqueria/plugin-core` plugin on the project, then run the following command to remove legacy images from your system

```shell
taq clean
```
:::

You can update your existing projects to use Taqueria v0.24.2 plugins using the following command:

```shell
plugins=$(jq -r '.plugins[].name' .taq/config.json) && echo $plugins | xargs -n 1 taq uninstall && echo $plugins | xargs -n 1 taq install
```

### Pull Requests

- 🚀 Release ➾ Taqueria v0.24.1 by @hu3man in [#1447](https://github.com/ecadlabs/taqueria/pull/1447)
- Updating tests to become modules for TS requirement by @alexzbusko in [#1500](https://github.com/ecadlabs/taqueria/pull/1500)
- 🛠️ Fix ➾ Update Taqueria.io Documentation by @hu3man in https://github.com/ecadlabs/taqueria/pull/1496
- 🧽 Chore ➾ Bump loader-utils from 2.0.2 to 2.0.4 in /website by @dependabot in [#1497](https://github.com/ecadlabs/taqueria/pull/1497)
- 👷 Refactor ➾ Updates to Docusaurus Docs by @hu3man in [#1506](https://github.com/ecadlabs/taqueria/pull/1506)
- 🧽 Chore ➾ Update Docusaurus to `v2.2.0` by @hu3man in [#1505](https://github.com/ecadlabs/taqueria/pull/1505)
- 🛠️ Fix ➾ Do Not Create the `quickstart.md` File on New Taqueria Projects by @jchenche in [#1491](https://github.com/ecadlabs/taqueria/pull/1491)
- ✨ Feature ➾ Rename `<CONTRACT>.storages.mligo` to `<CONTRACT>.storageList.mligo` and similarly for the parameter part by @jchenche in [#1507](https://github.com/ecadlabs/taqueria/pull/1507)
- ✨ Feature ➾ Allow docker images to be overwritten via environment variable (#1425) by @mweichert in [#1445](https://github.com/ecadlabs/taqueria/pull/1445)

## New Contributors

- @dependabot made their first contribution in [#1497](https://github.com/ecadlabs/taqueria/pull/1497)

**Full Changelog**: https://github.com/ecadlabs/taqueria/compare/v0.24.1...v0.24.2

## Taqueria v0.24.1  

| Details     |               |
| ----------- | ------------- |
|Release Date | Nov 15, 2022  |
|Release Type | Minor         |
|Release Page | [v0.24.1](https://github.com/ecadlabs/taqueria/releases/tag/v0.24.1) |

### Summary of Impactful Changes

- A new plugin `@taqueria/plugin-core` has been added. It provides a task `taq clean` which removes stale docker images and state (note: plugin is implicitly installed when running `taq init` or `taq scaffold`)
- VsCE now has a UI to execute entrypoints on contracts deployed on a Flextesa sandbox
- VsCE has a Micheline editor which allows users to easily provide values needed for calling endpoints
- A `taq instantiate-accounts` task has been added which creates instances of declared accounts in a target environment
- A `taq fund` task has been added which funds each of the instantiated accounts from the `taqueria operator` account
- An optional flag has been added to `taq originate` and `taq call` to specify an account to use
- Arbitrary commands can now be run by the underlying binary (LIGO and Octez-client) from the Taq CLI 

### New Features

#### `taq instantiate-accounts` and `taq fund`

Improvements to declared accounts and funding have been added in this release

You can now use the `taq instantiate-account` task to instantiate declared accounts and then call `taq fund` to fund instantiated accounts. Both tasks work under a specific environment

Additionally, users can now specify the sender of operations via the `--sender` flag for `taq originate` and `taq call`

:::warning
The value for amount specified with `--tez` has been changed to  `--mutez` for `taq transfer` to allow more granular amount and give origination the ability to specify an initial balance for the originated contract
:::

#### Call Endpoints on Deployed Contracts via VsCE UI

The Taqueria VsCE now allows users to easily call endpoints on contracts deployed to a sandbox. Once deployed, contracts will appear in the Flextesa browser. You can now expand each contract in the browser which will show a list of entrypoints for a particular contract. Each of these entrypoints can be called using the icon on the right. Clicking on this icon will open a Micheline editor in a new page. The Micheline editor provides a UI to enter the parameters required for the entrypoint call in plain text, and will parse the input into valid Michelson which is then used to call the entrypoint

#### Execute Arbitrary Commands from Taq CLI

##### The `taq ligo` Task

Basic usage is:

```shell
taq ligo --command <command to pass to the underlying LIGO binary>
```

Wrap the value for the `--command` flag with quotes.

:::caution
This task allows you to run arbitrary LIGO native commands, but they might not benefit from the abstractions provided by Taqueria
:::caution

#### The `taq client` Task

##### The `taq client` task

Basic usage is:

```shell
taq client --command <command to pass to the underlying octez-client binary>
```

Wrap the value for the `--command` flag with quotes.

:::caution
This task allows you to run arbitrary octez-client native commands, but they might not benefit from the abstractions provided by Taqueria
:::

#### The `taq clean` Task `@taqueria/plugin-core`

:::note
As of Taqueria v0.24.1, this plugin will be installed when `taq init` or `taq scaffold` is called
:::

##### Installation

For legacy projects, `@taqueria/plugin-core` can be installed by running:

```shell
taq install @taqueria/plugin-core
```

##### Basic Usage

```shell
taq clean
```

##### Basic Description

This task will delete all Taqueria-related states and docker images

### Bug Fixes

- Fixed a bug in `@taqueria/plugin-contract-types` where there was no `lambda` type for export
- Fixed a bug where Taqueria would disregard the environment set as default in `config.json`

### Other Product Changes

- Improved GitHub issue templates
- NPM packages and binaries are now published on each PR
- VsCE now supports the `taq typecheck` task
- NFT scaffold documentation improved for clarity
- References to `tezos-client` have been refactored to `octez-client` to support Octez 15
- When specifying an amount of tez to send via `taq call` or `taq originate`, the units are now mutez rather than tez

### Migrating from Legacy Versions

To upgrade, you must download Taqueria v0.24.1 binary, replacing the legacy version

This can be done by following these steps:

1) Change into the installation directory

```shell
sudo cd /usr/local/bin
```

2) Remove the existing `taq` binary

```shell
sudo rm taq
```

3) Download the appropriate Taqueria v0.24.1 binary for your operating system

```shell
sudo curl -LO https://taqueria.io/get/macos/taq
sudo curl -LO https://taqueria.io/get/linux/taq
```

:::warning
The Flextesa plugin can hang or crash if old docker images exist on your machine. Install the new `@taqueria/plugin-core` plugin on the project, then run the following command to remove legacy images from your system

```shell
taq clean
```
:::

You can update your existing projects to use Taqueria v0.24.1 plugins using the following command:

```shell
plugins=$(jq -r '.plugins[].name' .taq/config.json) && echo $plugins | xargs -n 1 taq uninstall && echo $plugins | xargs -n 1 taq install
```

### Pull Requests

- 👷 Refactor ➾ Improve Issue and PR Templates by @hu3man in [#1412](https://github.com/ecadlabs/taqueria/pull/1412)
- 🛠️ Fix ➾ Update Current Version in Release Notes to v0.22.2 by @hu3man in [#1419](https://github.com/ecadlabs/taqueria/pull/1419)
- 👷 Refactor ➾ (ci): Publish Packages for PR by @GImbrailo in [#1383](https://github.com/ecadlabs/taqueria/pull/1383)
- 🛠️ Fix ➾ Typecheck Command in the VsCode Extension by @AlirezaHaghshenas in [#1422](https://github.com/ecadlabs/taqueria/pull/1422)
- 👷 Refactor ➾ Update NFT Scaffold Website Docs by @alexzbusko in [#1362](https://github.com/ecadlabs/taqueria/pull/1362)
- 🛠️ Fix ➾ Typos on Release Notes by @michaelkernaghan in [#1424](https://github.com/ecadlabs/taqueria/pull/1424)
- 🛠️ Fix ➾ Add instructions for Updating `taq` Binary to Release Notes by @hu3man in [#1426](https://github.com/ecadlabs/taqueria/pull/1426)
- ✨ Feature ➾ Implement a GUI for Micheline Data entry by @AlirezaHaghshenas in [#1247](https://github.com/ecadlabs/taqueria/pull/1247)
- ✨ Feature ➾ Implement `taq instantiate-account` and `taq fund` to Generate and Fund Declared Accounts in a Target Environment by @jchenche in [#1427](https://github.com/ecadlabs/taqueria/pull/1427)
- 🛠️ Fix ➾ Remove `default` from Zod Schema for `env` Field by @jchenche in [#1437](https://github.com/ecadlabs/taqueria/pull/1437)
- 🧽 Chore ➾ Update Default Assignee on Bug Report Template to `alexzbusko` from `sinapsist` by @hu3man in [#1444](https://github.com/ecadlabs/taqueria/pull/1444)
- 🛠️ Fix ➾ Use `octez-client` instead of `tezos-client` in new Flextesa image version in our plugins by @jchenche in [#1443](https://github.com/ecadlabs/taqueria/pull/1443)
- 👷 Refactor ➾ (ci): Reintroduce a preid to Prereleases by @GImbrailo in [#1423](https://github.com/ecadlabs/taqueria/pull/1423)
- Update tzkt to match flextesa by @AlirezaHaghshenas in [#1449](https://github.com/ecadlabs/taqueria/pull/1449)
- ✨ Feature ➾ Add a new taq clean task and create a new core plugin to host it by @jchenche in [#1451](https://github.com/ecadlabs/taqueria/pull/1451)
- 🧽 Chore ➾ Add the Work Description Field Back into the dev-task Issue Template by @hu3man in [#1463](https://github.com/ecadlabs/taqueria/pull/1463)
- Added test network tests for transfer and funding by @alexzbusko in [#1450](https://github.com/ecadlabs/taqueria/pull/1450)
- 🧽 Chore ➾ Contract Types: added tests for different aliased commands and type mode by @alexzbusko in [#1457](https://github.com/ecadlabs/taqueria/pull/1457)
- 🛠️ Fix ➾ Implement Typescript Generation for Lambda by @AlirezaHaghshenas in [#1433](https://github.com/ecadlabs/taqueria/pull/1433)
- ✨ Feature ➾ Implement arbitrary command passing from Taq CLI to underlying binary (LIGO and Octez-client) by @jchenche in [#1466](https://github.com/ecadlabs/taqueria/pull/1466)
- Export Generated Storage type in Contract Types Plugin by @AlirezaHaghshenas in [#1483](https://github.com/ecadlabs/taqueria/pull/1483)
- 🛠️ Fix ➾ Remove Dependency on play-sound-mp3 Package by @hu3man in [#1485](https://github.com/ecadlabs/taqueria/pull/1485)
- 🛠️ Fix ➾ Typos in the Taqueria Documentation by @michaelkernaghan in [#1470](https://github.com/ecadlabs/taqueria/pull/1470)
- 🧽 Chore ➾ (ci) pin node version to v16.16.x by @GImbrailo in [#1486](https://github.com/ecadlabs/taqueria/pull/1486)

## Taqueria v0.22.2  

| Details     |               |
| ----------- | ------------- |
|Release Date | Oct 25, 2022  |
|Release Type | Minor         |
|Release Page | [v0.22.2](https://github.com/ecadlabs/taqueria/releases/tag/v0.22.2) |

### Summary of Impactful Changes

- A new and streamlined funding mechanism for Teztnet accounts has been implemented
- The default config for a new project now comes pre-configured with an environment named `testing` that targets Ghostnet
- The Taqueria CLI binary can now be installed directly from the VsCE
- Taqueria now allows developers to use Beacon Wallet on a Flextesa sandbox

### New Features

#### Streamlined Account Funding Mechanism

Taqueria now makes it easier than ever to fund testnet accounts. Under the hood, Taqueria now has a `root account` for each environment. This root account has a keypair generated implicitly and when an operation is submitted to a testnet environment, Taqueria will check to see if the account is funded. If not, you will be provided the PHK of the root account, and a link to the new Teztnets faucet. Simply copy/paste the PKH into the faucet, and click on `Request 2001tz`

Funding of the root account only needs to be done once, making the overall funding experience much more streamlined than the legacy faucet file method

:::note
In future releases, a task will be added which can fund each of the declared accounts automatically using the root account. This way you only need to visit the faucet site once for the root account
:::

#### Support for Beacon Wallet on Flextesa Sandbox

Taqueria has implemented support for using Beacon Wallet on a Flextesa sandbox without running into CORS issues

Here are the summary of required steps necessary to connect your dapp to a local sandbox:

1) Start the sandbox

2) In your dapp:

```typescript
// Import your taqueria config.json file so that we can dynamically
// determine the sandbox label & RPC url
import taqConfig from "taq/config.json"

// Use Taquito and the Beacon SDK to add the sandbox network to your wallet
import { TezosToolkit } from "@taquito/taquito";
import { BeaconWallet } from "@taquito/beacon-wallet"

const Tezos = new TezosToolkit(taqConfig.sandbox.local.rpcUrl);

const wallet = new BeaconWallet({
  name: "Beacon/Sandbox Test"
});

Tezos.setWalletProvider(wallet)

wallet.requestPermissions({
      network: {
        type: 'custom' as NetworkType,
        name: taqConfig.sandbox.local.label,
        rpcUrl: taqConfig.sandbox.local.rpcUrl
      }
```

3) Use `taq transfer` to transfer funds from Bob to your wallet address.

You can retrieve your public key hash using
```typescript
const current = await wallet.client.getActiveAccount()
console.log(current)
```

A demonstration dApp has been created to showcase how this works: [https://github.com/ecadlabs/taqueria-beacon-sandbox](https://github.com/ecadlabs/taqueria-beacon-sandbox)

### Other Product Changes

- The default `config.json` provided by `taq init` now uses the K protocol by default
- Typecheck and Simulate tasks now target protocol K by default
- The Ligo plugin now uses a fixed stable version of the Ligo CLI rather than @next/@stable

### Migrating from Legacy Versions

To upgrade, you must download Taqueria v0.22.2 binary, replacing the legacy version

This can be done by following these steps:

1) Change into the installation directory

```shell
sudo cd /usr/local/bin
```

2) Remove the existing `taq` binary

```shell
sudo rm taq
```

3) Download the appropriate Taqueria v0.22.2 binary for your operating system

```shell
sudo curl -LO https://taqueria.io/get/macos/taq
sudo curl -LO https://taqueria.io/get/linux/taq
```

:::note
For additional details on installing Taqueria, see the documentation [here](https://taqueria.io/docs/getting-started/installation/)
:::

You can update your existing projects to use Taqueria v0.22.2 plugins using the following command:

```shell
plugins=$(jq -r '.plugins[].name' .taq/config.json) && echo $plugins | xargs -n 1 taq uninstall && echo $plugins | xargs -n 1 taq install
```

### Pull Requests

- docs: Make plugin update instructions more prominent by @jevonearth in [#1300](https://github.com/ecadlabs/taqueria/pull/1300)
- docs: sync web docs with README from taco-shop scaffold by @jevonearth in [#1302](https://github.com/ecadlabs/taqueria/pull/1302)
- Docs: taco-shop minor edits and fix taq call example by @jevonearth in [#1303](https://github.com/ecadlabs/taqueria/pull/1303)
- chore: unlist the quickstart scaffold as it is being retired by @jevonearth in [#1304](https://github.com/ecadlabs/taqueria/pull/1304)
- refactor(ci): Workflows run for push to main by @GImbrailo in [#1298](https://github.com/ecadlabs/taqueria/pull/1298)
- chore: remove docs husky hook by @GImbrailo in [#1308](https://github.com/ecadlabs/taqueria/pull/1308)
- 🏗️ ➾ Add historical release notes to website by @hu3man in [#1313](https://github.com/ecadlabs/taqueria/pull/1313)
- Improve templates by @hu3man in [#1324](https://github.com/ecadlabs/taqueria/pull/1324)
- Update mechanism for funding accounts by @jchenche in [#1295](https://github.com/ecadlabs/taqueria/pull/1295)
- updated test to now accept main as a taqueria build version by @alexzbusko in [#1334](https://github.com/ecadlabs/taqueria/pull/1334)
- Improve templates by @hu3man in [#1336](https://github.com/ecadlabs/taqueria/pull/1336)
- ✨ Feature ➾ Improve PR and Issue Templates by @hu3man in [#1337](https://github.com/ecadlabs/taqueria/pull/1337)
- Vs code cli testing by @sinapsist in [#1309](https://github.com/ecadlabs/taqueria/pull/1309)
- Install Taqueria from VS Code Extension by @MichalLytek in [#1261](https://github.com/ecadlabs/taqueria/pull/1261)
- remove deprecated scaffolds by @AlirezaHaghshenas in [#1352](https://github.com/ecadlabs/taqueria/pull/1352)
- 1209 docusaurus website changes by @alexzbusko in [#1312](https://github.com/ecadlabs/taqueria/pull/1312)
- refactor(ci): publish workflows by @GImbrailo in [#1310](https://github.com/ecadlabs/taqueria/pull/1310)
- fix(ci): added docker build before tests by @GImbrailo in [#1385](https://github.com/ecadlabs/taqueria/pull/1385)
- 🛠️ Fix (#1375) ➾ Update Protocol Target for Typecheck and Simulate Tasks to Kathmandu by @jchenche in [#1384](https://github.com/ecadlabs/taqueria/pull/1384)
- ✨ New feature => Add Ghostnet Configuration and `testing` Environment to Default `config.json`  by @hu3man in [#1364](https://github.com/ecadlabs/taqueria/pull/1364)
- fix(ci): changed publish job to need build-and-cache-node-modules by @GImbrailo in [#1388](https://github.com/ecadlabs/taqueria/pull/1388)
- Fixes #1046, ensures that flextesa works without CORS issues by @mweichert in [#1296](https://github.com/ecadlabs/taqueria/pull/1296)
- Change ligo from next to stable version by @jchenche in [#1373](https://github.com/ecadlabs/taqueria/pull/1373)
- 🏗️ Refactor ➾ Improve Issue & PR Templates and Automation by @hu3man in [#1395](https://github.com/ecadlabs/taqueria/pull/1395)
- 🧹 Chore ➾ Update Docusaurus to v0.2.1 by @hu3man in [#1392](https://github.com/ecadlabs/taqueria/pull/1392)
- fix taq installation detection by @AlirezaHaghshenas in [#1409](https://github.com/ecadlabs/taqueria/pull/1409)
- 🚀 PR ➾ Release Taqueria v0.22.0 by @hu3man in [#1393](https://github.com/ecadlabs/taqueria/pull/1393)
- 🚀 Release ➾ Taqueria v0.22.1 by @hu3man in [#1413](https://github.com/ecadlabs/taqueria/pull/1413)
- chore: prevent vsix publishing on PR by @GImbrailo in [#1414](https://github.com/ecadlabs/taqueria/pull/1414)
- 🚀 Release ➾ Taqueria v0.22.2 by @hu3man in [#1417](https://github.com/ecadlabs/taqueria/pull/1417)


**Full Changelog**: https://github.com/ecadlabs/taqueria/compare/v0.20.2...v0.22.2

## Taqueria v0.20.2  

| Details     |               |
| ----------- | ------------- |
|Release Date | Sept 29, 2022 |
|Release Type | Minor         |
|Release Page | [v0.20.2](https://github.com/ecadlabs/taqueria/releases/tag/v0.20.2) |

### Summary of Impactful Changes

- Significant improvements to the Ligo development workflow
- `@taqueria/plugin-taquito` now has a `transfer` task which allows interaction with deployed contracts
- `@taqueria/plugin-ligo` now provides a `test` task used for running native Ligo tests
- The VScE has added support for `@taqueria/plugin-metadata`
- Improvements to the sandbox visualization in the VScE
- The Ligo plugin's `taq compile <fileName>` task now requires an explicit file name to be provided: `taq compile hello-tacos.jsligo`

#### ⚠️ Breaking Change

[Teztnets.xyz](https://teztnets.xyz) no longer provides json faucet files for testnet accounts which is a breaking change for Taqueria users. Taqueria v0.20.2 includes an interim solution in which users can generate and fund an account via the new Teztnets faucet, and manually configure

:::note
We're working on an improved workflow for funding testnet accounts and will be deprecating and removing faucet files from Taqueria in a future release
:::

Follow these steps to fund and configure a testnet account:

1. Go [here](https://resilience-me.github.io/Tezos-paper-wallet/) and click _Generate_
2. From step #2, copy the Public Key and set as the value for "pkh" in the faucet configuration
3. From step #2, copy the Private Key (which is actually a mnemonic seed phrase) and set as the value for "mnemonic" in the faucet configuration

Your network configuration should now look like the following:
```json
{
   "network":{
      "ghostnet":{
         "label":"Ghostnet Protocol Testnet",
         "rpcUrl":"https://ghostnet.ecadinfra.com",
         "protocol":"PtKathmankSpLLDALzWw7CGD2j2MtyveTwboEYokqUCP4a1LxMg",
         "faucet":{
            "pkh": "tz1SrwfccRGEM74T8GLXVzPZAaVk7WjoMPok",
		    "mnemonic": "dice must lawsuit remain december shed scorpion member loud subject mixture fan trust beauty crush",
            "email": "",
            "password": "",
            "amount": "",
            "activation_code": ""
        }
      }
   }
```

4. Go to teztnets.xyz, click on the link for the faucet of the desired testnet, and then request to have funds sent to your public key hash address (which would be _tz1SrwfccRGEM74T8GLXVzPZAaVk7WjoMPok_ in your example above)


:::caution Update plugins on existing Taqueria projects

Taqueria projects built have plugins installed within the project. If your project was created with an earlier version of Taquiera, you you must update your project's plugins.

Copy and paste this command to make sure your project's plugins are using the latest taqueria plugins. (you must have the [jq](https://stedolan.github.io/jq/) utility installed):

```sh
plugins=$(jq -r '.plugins[].name' .taq/config.json) && echo $plugins | xargs -n 1 taq uninstall && echo $plugins | xargs -n 1 taq install
```

_Note: A built in `taq update plugins` feature is planned for a future release_
:::


### New Features

#### ✅ Call entrypoints on a deployed contract: `taq transfer` / `taq call`

The Taquito plugin now exposes a `taq transfer` (or `taq call`) task in Taqueria which will call the specified Michelson contract deployed to a Taqueria environment (default environment is one with sandbox named local)

This allows interactions from implicit accounts to implicit or smart contract accounts

Basic usage is:

```shell
taq transfer <contract alias or address>
```

Examples:

- `taq call counter --param counter.parameter.param1.tz` will call a smart contract aliased as counter in the default environment with the parameter contained in that `.tz` file, transferring `0` tez
- `taq transfer tz1VSUr8wwNhLAzempoch5d6hLRiTh8Cjcjb --tez 20` will transfer 20 tez to that address, which is some implicit account

Full documentation can be found [here](https://taqueria.io/docs/plugins/plugin-taquito/#the-taq-transfer-task)

#### ✅ Run Ligo native tests: `taq test`

This task tests the LIGO source code and ouputs a result suggesting a failure or success. Normally you'd have a contract file and a separate test file that includes the contract's code, both within the /contracts directory

Basic usage is:

```shell
taq test <filename>
```

Full documentation can be found [here](https://taqueria.io/docs/plugins/plugin-ligo/#the-taq-test-task)

### Migrating from Legacy Versions

You can update your existing projects to use Taqueria v0.20.2 plugins using the following command:

```shell
plugins=$(jq -r '.plugins[].name' .taq/config.json) && echo $plugins | xargs -n 1 taq uninstall && echo $plugins | xargs -n 1 taq install
```

Note, this does require the `jq` cli tool to be installed ('brew install jq')

### Other Product Changes

- The default `config.json` provided by `taq init` now uses the K protocol by default
- Improvements to the Taqueria CI/CD pipeline
- Improved error messaging when a value in `config.json` was invalid
- Fixed issues with automated tests and decreased run time 
- Documentation improvements
- Scaffolds updated to use Taqueria v0.20.2

### Pull Requests

- New Taquito plugin task called `transfer` to enable interaction with deployed contracts by @jchenche in [#1245](https://github.com/ecadlabs/taqueria/pull/1245)
- Adding links to scaffold projects in the table by @sinapsist in [#1252](https://github.com/ecadlabs/taqueria/pull/1252)
- add mock and metadata plugins by @AlirezaHaghshenas in [#1251](https://github.com/ecadlabs/taqueria/pull/1251)
- updating quickstart section and a few other places by @alexzbusko in [#1250](https://github.com/ecadlabs/taqueria/pull/1250)
- Add test task for ligo plugin by @jchenche in [#1255](https://github.com/ecadlabs/taqueria/pull/1255)
- removed tutorial from sidebar and website. Also removed legacy hello-… by @alexzbusko in [#1256](https://github.com/ecadlabs/taqueria/pull/1256)
- run tests in parallel by @AlirezaHaghshenas in [#1232](https://github.com/ecadlabs/taqueria/pull/1232)
- 🏗️ PR ➾Update default sandbox protocol to Jakarta by @hu3man in [#1264](https://github.com/ecadlabs/taqueria/pull/1264)
- Fix originate and compile commands in command pallet by @AlirezaHaghshenas in [#1258](https://github.com/ecadlabs/taqueria/pull/1258)
- Use esbuild to bundle TVsCE instead of Parcel by @MichalLytek in [#1235](https://github.com/ecadlabs/taqueria/pull/1235)
- updated test configs to use specific ports for tzkt instances by @alexzbusko in [#1266](https://github.com/ecadlabs/taqueria/pull/1266)
- Fix build issues for taqueria-protocol on node v16.16.0+ by @mweichert in [#1243](https://github.com/ecadlabs/taqueria/pull/1243)
- Transfer call e2e tests by @sinapsist in [#1263](https://github.com/ecadlabs/taqueria/pull/1263)
- 🏗️ PR ➾ Update default protocol to K by @hu3man in [#1269](https://github.com/ecadlabs/taqueria/pull/1269)
- 🏗️ PR ➾ Refactor Tezos-client (decoupled from the flextesa plugin) and updated typecheck and simulate by @jchenche in [#1272](https://github.com/ecadlabs/taqueria/pull/1272)
- 1042 - Relax faucet validation and display error hints by @mweichert in [#1262](https://github.com/ecadlabs/taqueria/pull/1262)
- 🏗️ PR ➾ Prerelease 0.19.0 and GH wf improvements by @hu3man in [#1271](https://github.com/ecadlabs/taqueria/pull/1271)

**Full Changelog**: [https://github.com/ecadlabs/taqueria/compare/v0.18.0...v0.20.2](https://github.com/ecadlabs/taqueria/compare/v0.18.0...v0.20.2)

## Taqueria v0.18.0   

| Details     |               |
| ----------- | ------------- |
|Release Date | Sept 13, 2022 |
|Release Type | Minor         |
|Release Page | [v0.18.0](https://github.com/ecadlabs/taqueria/releases/tag/v0.18.0) |

### Summary of Impactful Changes

Bugfixes for build issues, test stub generation, and persistant state

### What's Changed

- Build SDK using tsup by @mweichert in https://github.com/ecadlabs/taqueria/pull/1230
- Fixed test stubs generated by Jest plugin by @mweichert in https://github.com/ecadlabs/taqueria/pull/1234
- Fix persistent state by @ricklove in https://github.com/ecadlabs/taqueria/pull/1222

**Full Changelog**: https://github.com/ecadlabs/taqueria/compare/v0.16.0...v0.18.0

## Taqueria v0.16.0   

| Details     |               |
| ----------- | ------------- |
|Release Date | Sept 08, 2022 |
|Release Type | Minor         |
|Release Page | [v0.16.0](https://github.com/ecadlabs/taqueria/releases/tag/v0.16.0) |

### Summary of Impactful Changes

- This release adds indexing capabilities to the Flextesa plugin via a TzKT instance
- The VScE now has a sandbox visualization 

### What's Changed

- Simple view of Sandbox state by @AlirezaHaghshenas in [1121]https://github.com/ecadlabs/taqueria/pull/1121
- 1200 taq api for dapp jcc by @jchenche in [1224]https://githubcom/ecadlabs/taqueria/pull/1224
- Fix failing tests after TVsCE feature merge by @AlirezaHaghshenas in [1227]https://github.com/ecadlabs/taqueria/pull/1227
- Doc for ligo taquito and toolkit by @jchenche in [1228]https://github.com/ecadlabs/taqueria/pull/1228
- Document fix after 0.14 release by @sinapsist in [1225]https://github.com/ecadlabs/taqueria/pull/1225
- Update originate command to select contract file by @AlirezaHaghshenas in [1231]https://github.com/ecadlabs/taqueria/pull/1231

**Full Changelog**: https://github.com/ecadlabs/taqueria/compare/v0.14.2...v0.16.0

## Taqueria v0.14.4

| Details     |               |
| ----------- | ------------- |
|Release Date | Sept 02, 2022 |
|Release Type | Minor         |
|Release Page | [v0.16.0](https://github.com/ecadlabs/taqueria/releases/tag/v0.16.0) |

### Summary of Impactful Changes

- The VS Code Extension (VSCE) now has a GUI and significant UX improvements
- Taqueria plugins can now expose templates and the comptiler plugins now have a `taq create contract` task
- Taqueria now supports multi-file Ligo smart contracts
- Contract registry: enables powerful functionality when working with contracts in Taqueria
- IPFS Pinata Plugin - Upload and pin metadata or other files with the new `@taqueria/plugin-ipfs-pinata` plugin
- Added missing functionality from the VSCE 
- The initial storage values in `config.json` now support complex data types via object literals
- Support for contract and token metadata
- Taqueria now has a GitHub action for use in CI/CD Pipelines

#### Conceptual Changes to Note

- Taqueria now requires contracts to be registered in order to compile and originate them
- For multi-file contracts, register the file that contains the `main` entrypoint
- Contracts created using templates 'taq create contract < contractName >` are automatically registered
- Contracts added to the project's `contracts` directory are registered using `taq add-contract < contractName >`
- Taqueria now supports plugin templates which provide a means for plugins to create artifacts
- Compiler plugins now come with a template to create a new contract which is automatically registered `taq create contract < contractName >`

### New Features

#### Contract Registry

Taqueria now has a contract registry which provides support for multi-file contracts, and will support advanced state management features in the future

***With this release, contracts now have to be registered in Taqueria in order to compile or originate them***

There are two paths to register a contract:

1. Add a Ligo or Archetype contract to the `contracts` directory, then run `taq add-contract < contractName >`. This will register the contract you have added to the `contracts` directory 
2. Create a Ligo or Archetype contract from a template. Install a compiler plugin and then run `taq create contract < contractName >`. This will create a new contract in the `contracts` directory, and will register the contract

In order to view the contracts currently registered on a project, you can run:

```shell
taq list-contracts
```

:::note
If you are working with multi-file Ligo smart contracts, only register the files that contain the `main` entrypoint
:::

##### Contract Registry Tasks

The contract registry adds three new tasks to Taqueria:

| Command                          | Description
|----------------------------------|-----------------------------------------------|
| taq add-contract < sourceFile >  | Add a contract to the contract registry       |
| taq rm-contract < contractName > | Remove a contract from the contract registry  |
| taq list-contracts               | List registered contracts                     |

#### Plugin Templates

Taqueria now provides plugin developers a way to expose templates to users. In this release, templates are used by the compiler plugins to provide an easy way to create and register a contract

Templates use the `taq create <templateName>` task and will appear in the help menu once a supporting plugin is installed

##### Usage

To use templates to create a new Ligo or Archetype contract, you will run the `taq create contract` task

For example, to create a new Ligo contract called `taco-shop` using the jsligo syntax, you would run:

```shell
taq create contract taco-shop.jsligo
```

You will see the contract is created in the `contracts` directory and the contract has been added to the contract registry. You can confirm this by running `taq list-contracts`

#### New Plugin: `@taqueria/plugin-ipfs-pinata`

pluginName: `@taqueria/plugin-ipfs-pinata`

Included in this release is the first version of the Taqueria IPFS Pinata plugin. This plugin provides a `publish` task which uploads files from the specified directory to IPFS via Pinata

The structure of the publish task is: `taq publish < path >`

The plugin takes a path as a positional argument and will publish the files from that directory to IPFS

##### Installation

To install the IPFS Pinata plugin on a Taqueria project, run the following:

```shell
taq install @taqueria/plugin-ipfs-pinata
```

##### Use 

To use this plugin, add a metadata or media file to a directory inside your project, and then run `taq publish < path >` using the path to the directory containing the files you want to publish

#### Taqueria Github Action

Taqueria now provides a GitHub action which has been published on the GitHub marketplace

This action allows you to use Taqueria in your CI/CD pipeline so you can test, deploy, and maintain your projects in CI as you do locally

The action can be found on the marketplace here

For more information, [read the documentation](/docs/features/github-action) or see a live example in the [Taco Shop Scaffold](https://github.com/ecadlabs/taqueria-scaffold-taco-shop/blob/main/.github/workflows/main.yml) project

### Migrating from Legacy Versions

This release of Taqueria introduces breaking changes to the way contracts are managed in Taqueria. To migrate existing projects, you will need to follow these steps:

1. Ensure you are running Taqueria v0.8.0: `taq --version`
2. Update Taqueria plugins to the latest version: `npm update && npm i`
3. Add each contract you would like to compile or originate to the contract registry: `taq add-contract < contractName >`

:::note
If you are working with a multi-file Ligo contract, only register the file which contains the `main` entrypoint
:::

Once all your contract

### Other Product Changes

#### Bugfixes

- SDK's getContracts method not honoring regex pattern [#1011](https://github.com/ecadlabs/taqueria/issues/1011/)
- Fix build pipeline: lock parcel to v2.6.1 [#1007](https://github.com/ecadlabs/taqueria/issues/1007/)
- Fix scaffold verbosity by writing stdOut to `scaffold.log` file [#1001](https://github.com/ecadlabs/taqueria/issues/1001/)
- Adjust jest plugin to return appropriate exit code [#995](https://github.com/ecadlabs/taqueria/issues/995/)
- Updated tests to ensure sure npm package.json is available in all test projects [#899](https://github.com/ecadlabs/taqueria/issues/899/)
- Enable all commands in the VSCE when config cannot be loaded [#955](https://github.com/ecadlabs/taqueria/issues/955/)
- Fix `taq` runtime bug [#983](https://github.com/ecadlabs/taqueria/issues/983/)
- Show error for all contracts that lack storage [#950](https://github.com/ecadlabs/taqueria/issues/950/)


#### Other Improvements

- Compiler plugins refactored to use registered contracts [#981](https://github.com/ecadlabs/taqueria/issues/981/)
- CI/CD now uses Deno package caching [#982](https://github.com/ecadlabs/taqueria/issues/982/)
- Improvements to the `taq scaffold` task [#966](https://github.com/ecadlabs/taqueria/issues/966/) [#953](https://github.com/ecadlabs/taqueria/issues/953/)
- Scaffolds now use a file `scaffold.json` to define a postInit script run during task execution [#993](https://github.com/ecadlabs/taqueria/issues/993/)
- Added a contract template for Archetype [#984](https://github.com/ecadlabs/taqueria/issues/984/)
- Refactor of automated tests: separate cli commands into separate files [#909](https://github.com/ecadlabs/taqueria/issues/909/)
- Changed the partition's config file to use relative path #951 [#951](https://github.com/ecadlabs/taqueria/issues/951/)
- Added tests for all Michelson data types [#919](https://github.com/ecadlabs/taqueria/issues/919/)
- Update Taquito to v13 [#951](https://github.com/ecadlabs/taqueria/issues/951/)
- The VLCE is now a `workspace` type project [#971](https://github.com/ecadlabs/taqueria/issues/971/)
- Added the template construct [#946](https://github.com/ecadlabs/taqueria/issues/946/)
- Added ability to register contracts [#908](https://github.com/ecadlabs/taqueria/issues/908/)

## Taqueria v0.12.0   

| Details     |               |
| ----------- | ------------- |
|Release Date | Aug 03, 2022  |
|Release Type | Minor         |
|Release Page | [v0.12.0](https://github.com/ecadlabs/taqueria/releases/tag/v0.12.0) |

### What's Changed

- Improvements to TVsCE 02 by @AlirezaHaghshenas in https://github.com/ecadlabs/taqueria/pull/1034
- docs: fix/update version on installation doc page by @jevonearth in https://github.com/ecadlabs/taqueria/pull/1054
- Updates to workflows for build versions by @hu3man in https://github.com/ecadlabs/taqueria/pull/1073
- implement a welcome UX by @AlirezaHaghshenas in https://github.com/ecadlabs/taqueria/pull/1070
- Taqueria v0.12.0 release by @hu3man in https://github.com/ecadlabs/taqueria/pull/1076

**Full Changelog**: https://github.com/ecadlabs/taqueria/compare/v0.10.0...v0.12.0

## Taqueria v0.10.0   

| Details     |               |
| ----------- | ------------- |
|Release Date | Jul 26, 2022  |
|Release Type | Minor         |
|Release Page | [v0.10.0](https://github.com/ecadlabs/taqueria/releases/tag/v0.10.0) |

### What's Changed

- Use types from protocol in VsX by @AlirezaHaghshenas in https://github.com/ecadlabs/taqueria/pull/786
- Documentation Updates by @hu3man in https://github.com/ecadlabs/taqueria/pull/975
- Fixes #876, limits the number of task outputs which are persisted by @mweichert in https://github.com/ecadlabs/taqueria/pull/882
- Testing by @ricklove in https://github.com/ecadlabs/taqueria/pull/1016
- Doc refactor for 0.8.0 by @hu3man in https://github.com/ecadlabs/taqueria/pull/1027
- Improvements to TVsCE 01 by @AlirezaHaghshenas in https://github.com/ecadlabs/taqueria/pull/1012
- Unique port and name for sandboxes by @jchenche in https://github.com/ecadlabs/taqueria/pull/1028
- Updates to website docs from review by @alexzbusko in https://github.com/ecadlabs/taqueria/pull/1015
- Add logos and adjust hero text by @russellmorton in https://github.com/ecadlabs/taqueria/pull/1026
- Update index Title by @russellmorton in https://github.com/ecadlabs/taqueria/pull/1041
- chore: fix website documentation by @GImbrailo in https://github.com/ecadlabs/taqueria/pull/1040
- Typescript testing generation by @ricklove in https://github.com/ecadlabs/taqueria/pull/818
- Fixes #572, adds jest test stubs by @mweichert in https://github.com/ecadlabs/taqueria/pull/852
- allowing latest 16 node version in pipeline by @alexzbusko in https://github.com/ecadlabs/taqueria/pull/918
- Catch error right after parsing JSON and pass back correct JSON values from tezos-client to CLI by @jchenche in https://github.com/ecadlabs/taqueria/pull/1037
- Adjusted pre-commit hook to only generate Deno lock file CLI source has changed by @mweichert in https://github.com/ecadlabs/taqueria/pull/1043
- Disable publish step for contract-types plugin by @mweichert in https://github.com/ecadlabs/taqueria/pull/1044
- Return JSON response from CLI by @MichalLytek in https://github.com/ecadlabs/taqueria/pull/1031
- Alex quickstart readme investigation by @alexzbusko in https://github.com/ecadlabs/taqueria/pull/1038
- chore: removed vscode workflow on windows by @GImbrailo in https://github.com/ecadlabs/taqueria/pull/1048

**Full Changelog**: https://github.com/ecadlabs/taqueria/compare/v0.8.0...v0.10.0


## Taqueria v0.8.0   

| Details     |               |
| ----------- | ------------- |
|Release Date | July 15, 2022 |
|Release Type | Minor         |
|Release Page | [v0.8.0](https://github.com/ecadlabs/taqueria/releases/tag/v0.8.0) |

## Summary of Impactful Changes

- The VS Code Extension (VSCE) now has a GUI and significant UX improvements
- Taqueria plugins can now expose templates and the comptiler plugins now have a `taq create contract` task
- Taqueria now supports multi-file Ligo smart contracts
- Contract registry: enables powerful functionality when working with contracts in Taqueria
- IPFS Pinata Plugin - Upload and pin metadata or other files with the new `@taqueria/plugin-ipfs-pinata` plugin
- Added missing functionality from the VSCE 
- The initial storage values in `config.json` now support complex data types via object literals
- Support for contract and token metadata
- Taqueria now has a GitHub action for use in CI/CD Pipelines

### Conceptual Changes to Note

- Taqueria now requires contracts to be registered in order to compile and originate them
- For multi-file contracts, register the file that contains the `main` entrypoint
- Contracts created using templates 'taq create contract <contractName>` are automatically registered
- Contracts added to the project's `contracts` directory are registered using `taq add-contract <contractName>`
- Taqueria now supports plugin templates which provide a means for plugins to create artifacts
- Compiler plugins now come with a template to create a new contract which is automatically registered `taq create contract <contractName>`

## New Features

### Contract Registry

Taqueria now has a contract registry which provides support for multi-file contracts, and will support advanced state management features in the future

***With this release, contracts now have to be registered in Taqueria in order to compile or originate them***

There are two paths to register a contract:

1. Add a Ligo or Archetype contract to the `contracts` directory, then run `taq add-contract <contractName>`. This will register the contract you have added to the `contracts` directory 
2. Create a Ligo or Archetype contract from a template. Install a compiler plugin and then run `taq create contract <contractName>`. This will create a new contract in the `contracts` directory, and will register the contract

In order to view the contracts currently registered on a project, you can run:

```shell
taq list-contracts
```

:::note
If you are working with multi-file Ligo smart contracts, only register the files that contain the `main` entrypoint
:::

#### Contract Registry Tasks

The contract registry adds three new tasks to Taqueria:

| Command                        | Description
|--------------------------------|-----------------------------------------------|
| taq add-contract <sourceFile>  | Add a contract to the contract registry       |
| taq rm-contract <contractName> | Remove a contract from the contract registry  |
| taq list-contracts             | List registered contracts                     |

### Plugin Templates

Taqueria now provides plugin developers a way to expose templates to users. In this release, templates are used by the compiler plugins to provide an easy way to create and register a contract

Templates use the `taq create <templateName>` task and will appear in the help menu once a supporting plugin is installed

#### Usage

To use templates to create a new Ligo or Archetype contract, you will run the `taq create contract <contractName>` task

For example, to create a new Ligo contract called `taco-shop` using the jsligo syntax, you would run:

```shell
taq create contract taco-shop.jsligo
```

You will see the contract is created in the `contracts` directory and the contract has been added to the contract registry. You can confirm this by running `taq list-contracts`

### New Plugin: `@taqueria/plugin-ipfs-pinata`

pluginName: `@taqueria/plugin-ipfs-pinata`

Included in this release is the first version of the Taqueria IPFS Pinata plugin. This plugin provides a `publish` task which uploads files from the specified directory to IPFS via Pinata

The structure of the publish task is: `taq publish <path>`

The plugin takes a path as a positional argument and will publish the files from that directory to IPFS

#### Installation

To install the IPFS Pinata plugin on a Taqueria project, run the following:

```shell
taq install @taqueria/plugin-ipfs-pinata
```

#### Use 

To use this plugin, add a metadata or media file to a directory (`dirName`) inside your project, and then run `taq publish <dirName>`

### Taqueria Github Action

Taqueria now provides a GitHub action which has been published on the GitHub marketplace

This action allows you to use Taqueria in your CI/CD pipeline so you can test, deploy, and maintain your projects in CI as you do locally

The action can be found on the marketplace here

For more information, VIEW THE DOCS or see a live example in the TACO-SHOP-SCAFFOLD REPO

## Migrating from Legacy Versions

This release of Taqueria introduces breaking changes to the way contracts are managed in Taqueria. To migrate existing projects, you will need to follow these steps:

1. Ensure you are running Taqueria v0.8.0: `taq --version`
2. Update Taqueria plugins to the latest version: `npm update && npm i`
3. Add each contract you would like to compile or originate to the contract registry: `taq add-contract <contractName>`

:::note
If you are working with a multi-file Ligo contract, only register the file which contains the `main` entrypoint
:::

Once all your contract

## Other Product Changes

### Bugfixes

- SDK's getContracts method not honoring regex pattern [#1011](https://github.com/ecadlabs/taqueria/issues/1011/)
- Fix build pipeline: lock parcel to v2.6.1 [#1007](https://github.com/ecadlabs/taqueria/issues/1007/)
- Fix scaffold verbosity by writing stdOut to `scaffold.log` file [#1001](https://github.com/ecadlabs/taqueria/issues/1001/)
- Adjust jest plugin to return appropriate exit code [#995](https://github.com/ecadlabs/taqueria/issues/995/)
- Updated tests to ensure sure npm package.json is available in all test projects [#899](https://github.com/ecadlabs/taqueria/issues/899/)
- Enable all commands in the VSCE when config cannot be loaded [#955](https://github.com/ecadlabs/taqueria/issues/955/)
- Fix `taq` runtime bug [#983](https://github.com/ecadlabs/taqueria/issues/983/)
- Show error for all contracts that lack storage [#950](https://github.com/ecadlabs/taqueria/issues/950/)


### Other Improvements

- Compiler plugins refactored to use registered contracts [#981](https://github.com/ecadlabs/taqueria/issues/981/)
- CI/CD now uses Deno package caching [#982](https://github.com/ecadlabs/taqueria/issues/982/)
- Improvements to the `taq scaffold` task [#966](https://github.com/ecadlabs/taqueria/issues/966/) [#953](https://github.com/ecadlabs/taqueria/issues/953/)
- Scaffolds now use a file `scaffold.json` to define a postInit script run during task execution [#993](https://github.com/ecadlabs/taqueria/issues/993/)
- Added a contract template for Archetype [#984](https://github.com/ecadlabs/taqueria/issues/984/)
- Refactor of automated tests: separate cli commands into separate files [#909](https://github.com/ecadlabs/taqueria/issues/909/)
- Changed the partition's config file to use relative path #951 [#951](https://github.com/ecadlabs/taqueria/issues/951/)
- Added tests for all Michelson data types [#919](https://github.com/ecadlabs/taqueria/issues/919/)
- Update Taquito to v13 [#951](https://github.com/ecadlabs/taqueria/issues/951/)
- The VLCE is now a `workspace` type project [#971](https://github.com/ecadlabs/taqueria/issues/971/)
- Added the template construct [#946](https://github.com/ecadlabs/taqueria/issues/946/)
- Added ability to register contracts [#908](https://github.com/ecadlabs/taqueria/issues/908/)

# Taqueria v0.6.5   

| Details     |               |
| ----------- | ------------- |
|Release Date | June 30, 2022 |
|Release Type | Minor         |
|Release Page | [v0.6.5](https://github.com/ecadlabs/taqueria/releases/tag/v0.6.5) |

## Summary of Impactful Changes

- The Taqueria VS Code Extension now dynamically shows and hides available tasks based on project context
- Optional usage analytics added to the CLI
- Added support for more plugins and supported tasks in the VS Code Extension

## Bug Fixes 

- Fixed a docker image permission issue 
- Fixed the failing assertion when test project initialized
- Fixed issue where config.json content would be trimmed

## Other Improvements

- Logging for the VS Code Extension
- Support for provisioning stateful operations added under the hood
- Migrated automated tests to use ghostnet

# Taqueria v0.4.2   

| Details     |               |
| ----------- | ------------- |
|Release Date | June 8, 2022  |
|Release Type | Patch         |
|Release Page | [v0.4.2](https://github.com/ecadlabs/taqueria/releases/tag/v0.4.2) |

## Summary of Impactful Changes

- [Bug Fix] VS Code Extension doesn't update `config.json` with installed plugin when installing from NPM

# Taqueria v0.4.0   

| Details     |               |
| ----------- | ------------- |
|Release Date | June 6, 2022  |
|Release Type | Major         |
|Release Page | [v0.4.0](https://github.com/ecadlabs/taqueria/releases/tag/v0.4.0) |

## Summary of Impactful Changes

- Taqueria State functionality
- A new JS/TS library `@taqueria/state` to interact with Taqueria State (access data persisted to state and reference accounts by name)
- A new plugin `@taqueria/plugin-jest` that allows you to test your smart contracts and dapps with Jest in creative and powerful ways  
- Implicit accounts and desired balances are declared at the root of the config.json file **Note: Breaking Change!**
- Robust data integrity checks following the "parse; don't validate" practice
- @taqueria/plugin-taquito - The `originate` task is now stateful and persists the contract address
- @taqueria/plugin-tezos-client -  Added support for invoking endpoints by annotation

## New features

### Taqueria State

> Message from the Taqueria team:
`We've made many under-the-hood changes to give Taqueria a wide array of capabilities when it comes to persisting the state of your project. Although they're not visible on the surface, you'll soon have the ability to provision on-chain and off-chain operations which produce outputs that persist across the project lifecycle and environments
These operations can link to and depend on one-another.` 
`Internally they are represented as a directed acyclic graph (DAG) which will ultimately provide much flexibility and powerful capabilities. We don't want to spoil this for you, but just know that we've put all the things in place to start making this visible very shortly!`

Taqueria now keeps a record of the stateful tasks and operations executed, along with the values in the resulting state  

In the initial implementation, `@taqueria/plugin-taquito` has been refactored so the `taq originate` task is now stateful. When run, a record is created which includes the deployed contract address

This data is stored in a new auto-generated file named `development-state.json`. This file is JSON encoded and is stored in the `./.taq` directory of the project


> Note: This file is not generated until the first time you run a supported task or operation. Currently, this will occur the first time you run `taq originate` in the project



Records follow the format shown below:

```json
        "@taqueria/plugin-taquito.deploy.1654212273655": {
            "time": 1654212273655,
            "output": [
                {
                    "contract": "test.tz",
                    "address": "KT1ShFinJPuXqdAUXomKAB8t6s3q6JGjAN2G",
                    "destination": "local"
                }
            ]
        }
```



> Note: At this time, only the `originate` task is supported but full support for operations and additional plugin tasks is coming soon!

### The `@taqueria/state` Library

Included in this release is a new NPM package `@taqueria/state`. This is an abstraction library which provides an easy way to interact with Taqueria State

To install the library on your project, run:

```shell
taq install @taqueria/state
```

To use the package in your front end code or tests, you can import it into any JS or TS file:

```js
import loadProject from "@taqueria/state"
```

Once imported, you can retrieve the list of originations like this:

```js
const {getOriginations} = await loadProject()
const results = getOriginations("increment.tz")
console.log(results)
```

To retrieve the most recently deployed version of a contract and the address:


```js
const [latest] = getOriginations("increment.tz")
```

To retrieve a list of all contracts deployed to the sandbox `local`:

```js
const results = getOriginations()
     .filter(contract => contract.destination === "local")
```

## Jest Plugin 

pluginName: `@taqueria/plugin-jest`

> Note: The Taqueria team is excited to include the first version of the Jest plugin `@taqueria/plugin-jest` in this release. This plugin allows you to partition your tests in powerful and flexible ways while easing the burden of managing Jest configuration files. The next feature already under active development is automatic test stub generation from Michelson files using generated types

The `@taqueria/plugin-jest` plugin provides the `taq test` task which provides a means to instantiate test directories and run Jest tests

### Installation

To install the Jest plugin on a Taqueria project, run:

```shell
taq install @taqueria/plugin-jest
```

### Usage

The Jest plugin will automatically initialize a Jest test directory when you run `taq test <test-directory>`

The easiest way to start using the plugin is to:

1. Create a new directory in the root of your project `/tests`
2. Add one or more tests to the directory
3. Run `taq test tests`


### Initializing Partitions

The Jest plugin uses partitions. These are just directories with their own JEST config but allow you to group and manage your tests with great flexibility. This allows you to segment and run tests in different buckets such as:

- By type (unit tests, integration tests, acceptance tests, e2e tests)
- Structural (dapp, smart contract, serverless functions)

To create a new partition (initialized test directory), run:

```shell
taq test --init
```

This will do several things:

- Create a new directory (in this case it uses the default directory `/tests`)
- Create a Jest configuration in the directory
- Create a global Jest configuration file in `./.taq/jest.config.js`

> Note: You can create any number of partitions. By default there are no partitions

To create additional partitions, simply run:

```shell
taq test [partitionName]`
```

### Running Jest tests

The `taq test [partitionName]` task will run the Jest tests associated with a particular partition

Create tests in that folder `tests/example.spec.ts`

### Jest Configuration

A Global Config for Jest is created in the project's Taq directory: `./.taq/jest.config.js`

Each partition will have it's own Jest configuration file (`./tests/jest.config.js`)

The Jest configurations cascade down from the global config. If you want to override a value in the global config, simply define it in the partition config. The partition config will override the global config

> Note: The default root directory for Jest can be overridden by setting `"jestTestsRootDir"` in `taqueria.config.js`

## Implicit accounts

> WARNING: This release makes a breaking change to the schema of `config.json`. If you use Taqueria v0.4.0 on an existing project, you will need to make minor adjustments to your `config.json` file

Taqueria now allows you to be declarative when naming your implicit accounts and the desired balance for each. These accounts are declared at the root level in `config.json`. Previously, accounts were defined in each sandbox configuration

The default configuration for Taqueria projects includes five pre-defined accounts as shown here:

```json
{
    "language": "en",
    "plugins": [ ],
    "contractsDir": "contracts",
    "testsDir": "tests",
    "artifactsDir": "artifacts",
    "environment": {
        "default": "development",
        "development": {
            "networks": [],
            "sandboxes": [
                "local"
            ],
        }
    },
    "sandbox": {
        "local": {
            "label": "Local Tezos Sandbox",
            "protocol": "PtKathmankSpLLDALzWw7CGD2j2MtyveTwboEYokqUCP4a1LxMg",
            "rpcUrl": "http://localhost:20000"
        }
    },
    "network": {},
    "accounts": {
        "bob": "3_000_000_000",
        "alice": "3_000_000_000",
        "john": "3_000_000_000",
        "jane": "3_000_000_000",
        "joe": "3_000_000_000"
    }
}
```

You may define as many accounts as you need. Taqueria imposes no limits on how many accounts you would like to reference in your project

These accounts will be created and funded automatically when a sandbox starts. After starting a sandbox, you will see the defined accounts appear in the configuration:

```json
{
    "sandbox": {
        "local": {
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
                }
            },
            "label": "Local Tezos Sandbox",
            "protocol": "PtKathmankSpLLDALzWw7CGD2j2MtyveTwboEYokqUCP4a1LxMg",
            "rpcUrl": "http://localhost:20000"
        }
    },
    "network": {},
    "accounts": {
        "bob": "3_000_000_000",
        "alice": "3_000_000_000"
    }
}
```

> Note: Future improvements will extend implicit account provisioning to testnets

To set a default account for a sandbox, you must now define it explicitly in the sandbox config:

```json
    "sandbox": {
        "local": {
            "accounts": {
                "default": "bob",
                "bob": {
                    "encryptedKey": "edpkurPsQ8eUApnLUJ9ZPDvu98E8VNj4KtJa1aZr16Cr5ow5VHKnz4",
                    "publicKeyHash": "tz1aSkwEot3L2kmUvcoxzjMomb9mvBNuzFK6",
                    "secretKey": "unencrypted:edsk3RFfvaFaxbHx8BMtEW1rKQcPtDML3LXjNqMNLCzC3wLC1bWbAt"
                },
                "alice": {
                    "encryptedKey": "edpkvGfYw3LyB1UcCahKQk4rF2tvbMUk8GFiTuMjL75uGXrpvKXhjn",
                    "publicKeyHash": "tz1VSUr8wwNhLAzempoch5d6hLRiTh8Cjcjb",
                    "secretKey": "unencrypted:edsk3QoqBuvdamxouPhin7swCvkQNgq4jP5KZPbwWNnwdZpSpJiEbq"
                }
            },
            "label": "Local Tezos Sandbox",
            "protocol": "PtKathmankSpLLDALzWw7CGD2j2MtyveTwboEYokqUCP4a1LxMg",
            "rpcUrl": "http://localhost:20000"
        }
    },
```

### Migration from Legacy Versions

To migrate a project to the new `config.json` schema, only minor changes are required:

1. Define your list of implicit accounts at the root level of `config.json`
2. Remove the "accounts" property from the "sandbox" config
3. (Optional) Set a default account for each sandbox

## Other Product Changes

### @taqueria/plugin-tezos-client - `simulate` task improved

The Tezos Client now supports invoking entrypoints by annotation. The flag `--entrypoint` has been added to the simulate task

For example, you can now invoke an entrypoint annotated `decrement` by running the following:

```shell
taq simulate sample.tz '3' --storage 5 --entrypoint decrement
```

Previously, a raw Michelson expression was required:

```shell
taq simulate sample.tz 'Left (Left 3)' --storage 5
```

### Reduced Number of CLI Commands Required

This release improves the Taqueria workflow by improving the `taq init` and `taq scaffold` tasks, reducing the number of CLI commands required to setup a project

Specifically:
- `taq init` now runs `npm init -y` implicitly
- `taq scaffold` now runs `taq init`, `npm i`, and several housekeeping tasks implicitly 

### Conceptual Changes to Note

- Taqueria has a new auto-generated file `development-state.json` located in the `./.taq/` directory 
- Taqueria's `ephermal state` (`state.json`) will now be referred to as the Taqueria `cache`
- Implicit accounts are now defined at the root level in the `config.json` file
- On startup, a sandbox will create and fund each defined implicit account  

### Bugfixes

- @taqueria/plugin-flextesa: Deploying multiple contracts can fail [#512](https://github.com/ecadlabs/taqueria/issues/512)
- @taqueria/plugin-flextesa: Contract contents in sandbox deployment don't match what is printed out in console message[#707](https://github.com/ecadlabs/taqueria/issues/707)
- @taqueria/plugin-tezos-client: Tezos client plugin storage or input value of 0 is treated as empty [#702](https://github.com/ecadlabs/taqueria/issues/702)

### Other Improvements

- The Taqueria protocol now uses schema based type enforcement 
- MacOS runners added to CI pipeline which has enabled automated testing in MacOs environments
- E2E tests now asynchronously and in batches, up to 4x faster 
- Plugin documentation is now all built from a common source
- Dependency injection added to VS Code Extension
- Improved test coverage of VS Code Extension

## [Shipped]

> For full detail on changes, fixes, and improvements made in each release, please refer to the [Taqueria Release Page](https://github.com/ecadlabs/taqueria/releases)

- April 2022:
  - Released the Archetype plugin
  - Released the Tezos-Client plugin
  - Added a new basic project scaffold `taqueria-scaffold-demo`

- March 2022:
  - Major refactor to the taqueria-sdk library
  - Improvements and bugfixes for the Flextesa plugin
  - Updated the UX for the Taquito plugin
  - Added Michelson types to the Contract Types plugin
  

- February 2022:
  - Project scaffolding
  - TS Type Generation from Michelson`.tz` files which includes:
    - A new Taqueria NPM plugin: @taqueria/plugin-contract-types
    - Awareness of generated types in VS Code Extension
      - Intellisense tooltips for contract parameters
      - Compile time type checking for TS types 


- January 2022:
  - CLI
  - Visual Studio Code Extension
  - Initialization of a Tezos Project
  - A demo smart contract and app, `hello-tacos`
  - Compile LIGO and SmartPy smart contracts
  - Using a local sandbox with test accounts
  - SDK for developers to build their own plugins
  - Origination to local, test, and main networks
  - Several plugins:
    - LIGO
    - SmartPy
    - Taquito
    - Flextesa

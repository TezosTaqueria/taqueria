# Quick Start

## Install Desired Plugins

Taqueria is extensible via plugins. Most projects will require plugins to be installed, which will extend Taqueria with tasks for compiling contracts, origination, and testing.

Taqueria supports many types of plugins, with several published on npmjs.com:
- **LIGO** (@ecadlabs/taqueria-plugin-ligo) - provides the ability to compile LIGO contracts
- **Taqueria** (@ecadlabs/taqueria-plugin-taquito) - provides the ability to originate (deploy) contracts to a testnet or sandbox
- **Flextesa** (@ecadlabs/taqueria-plugin-flextesa) - sandbox support

To install a plugin:
1. Run `npm install @ecadlabs/taqueria-plugin-ligo`
2. Add the following to your plugins array in .taq/config.json:
```
{ "plugin": "@ecadlabs/taqueria-plugin-ligo", "type": "npm"}
```

## Getting Started

### Contracts

The source code for smart contracts are expected to be in the *contracts* directory by default.

Compilation plugins, such as *@ecadlabs/taqueria-plugin-ligo, will expect smart contracts written using LIGO syntax to be located in this directory.

> NOTE: The contracts directory can by customized by changing the *contractsDir* in *.taq/config.json*

### Artifacts

Compiled artifacts, such as smart contracts that were compiled to Michelson, will be output to the *artifacts* directory by default.

Plugins that make use of compiled artifacts, such as *@ecadlabs/taqueria-plugin-taquito*, will search for Michelson contracts in this directory when originating a contract.

> NOTE: The artifacts directory can by customized by changing the *artifactsDir* in *.taq/config.json*

### Contract Origination

To originate a contract, the Michelson artifact will need to exist in the artifacts directory.

Additionally, the initial storage value will need to be specified in the environment configuration section of .taq/config.json

E.g., to specify the initial storage for a contract called increment.tz:

```
"environment": {
    "default": "development",
    "development": {
        "networks": [],
        "sandboxes": [
            "local"
        ],
        "storage": {
            "increment.tz": 1
        }
    }
}
```
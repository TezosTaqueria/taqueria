# Tzcompose Plugin for Taqueria

This plugin integrates [Tzcompose](https://github.com/blockwatch-cc/tzgo/blob/master/cmd/tzcompose/README.md), a powerful automation framework developed by Blockwatch for executing complex transaction sequences on Tezos, into the Taqueria development environment.

The plugin is written in TypeScript and compiled to a JavaScript bundle for Node.js using [tsup](https://github.com/egoist/tsup). It leverages the `@taqueria/node-sdk`, following the same development practices as other plugins created by our team for Taqueria.

## Requirements

- Taqueria v0.42.0 or later
- Node.js v18.18.0 or later

## Building

To build the Tzcompose plugin, run the following command from the root of the plugin repository:

```shell
npm run build -w taqueria-plugin-tzcompose
```

## Installation

To install the Tzcompose plugin in a Taqueria project, navigate to the project folder and run:

```shell
cd [taqueria-project]
taq init # if the project isn't already initialized
taq install @taqueria/plugin-tzcompose
```

## Usage

The Tzcompose plugin adds a single command to Taqueria:

```shell
taq tzcompose [pipeline.yaml]
```

This command runs the specified Tzcompose pipeline YAML file within your Taqueria project.

For detailed information on creating YAML files to define your Tzcompose pipelines, please refer to the [Tzcompose documentation](https://github.com/blockwatch-cc/tzgo/blob/master/cmd/tzcompose/README.md).

## Contributing

Contributions to improve the Tzcompose plugin are welcome! Please submit issues and pull requests on the plugin's GitHub repository.

## License

The Tzcompose plugin is open-source software licensed under the [Apache 2 License](../LICENSE).
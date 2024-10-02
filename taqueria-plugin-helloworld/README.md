# Hello World Plugin for Taqueria

The Hello World plugin provides a basic example of a Taqueria plugin. This plugin is intended to be used as a template for creating new plugins.

It is written in TypeScript and compiled to a JavaScript bundle for NodeJS using [tsup](https://github.com/egoist/tsup) and uses the `@taqueria/node-sdk` - as are all plugins that the our team develops for Taqueria.

## Requirements

- Taqueria v0.42.0 or later
- Node.js v18.18.0 or later

## Building

To build the Hello World plugin, run the following command from the root of this repository:

```shell
pnpm run build --filter taqueria-plugin-helloworld
```

## Installation

To install the Hello World plugin on a Taqueria project, navigate to the project folder and run:

```shell
cd [taqueria-project]
taq init # if the project isn't already initialized
taq install /path/to/taqueria-repo/taqueria-plugin-helloworld
```

## Usage:

The Hello World plugin provides a single command to Taqueria: `taq hello`.

## Plugin Development

We suggest cloning our hello-world plugin and using as a boilerplate.

See the following documentation from our Taqueria website, [taqueria.io](https://taqueria.io):
- [Building a Taqueria Plugin](https://taqueria.io/docs/taqueria-dev/making-plugins/)
- [Taqueria Architecture](https://taqueria.io/docs/taqueria-internals/architecture/)
# Taqueria Flextesa Plugin

[Flextesa](https://tezos.gitlab.io/flextesa/) is a flexible Tezos sandbox environment that's easy to work with. It runs a Tezos node and network in a Docker container on your local machine

This plugin provides the ability to easily configure and run Flextesa sandbox instances within Taqueria that you can use for development and testing.

With the Flextesa plugin you configure various sandboxes for use in Taqueria that you can start, stop, and query from the CLI and Visual Studio Code extension

Some helpful things to know:
- Multiple sandboxes can be configured and run concurrently
- You can configure the Tezos `protocol` for each sandbox to test against current, and future network upgrades
- Accounts and balances will be initialized each time a sandbox is started
- Sandboxes can be added to Taqueria environments and then targeted from the CLI using the `--env [envName]` option 

For more information, please see our documentation for the [Flextesa plugin](https://taqueria.io/docs/plugins/plugin-flextesa/)
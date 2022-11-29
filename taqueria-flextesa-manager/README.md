# @taqueria/flextesa-manager

This NPM package provides an abstraction and interface for managing flextesa mininets, as configured using Taqueria.

This package is complemented with a docker image published as:
`ghcr.io/ecadlabs/taqueria-flextesa`

## Build instructions

To build the NPM package, run `npm run build`.

To build the docker package, run `npm run build-docker`.

## Usage:

To start the sandbox, run the following from a taq'ified project:
```
docker run --name [sandboxName] --rm --detach 20000:20000 -v "`cwd`:/project" -w /app ghcr.io/ecadlabs/taqueria-flextesa node index.js --sandbox [sandboxName]
```

This will start a flextesa mininet with an RPC server listening on port 20000.

---

The image has `tezos-client` installed but needs to be configured to connect to the mininet above. To do so, run:
```
docker exec [sandboxName] node index.js --sandbox [sandboxName] --configure
```

---

To add all accounts configured in .taq/config.json, run:
```
docker exec [sandboxName] node index.js --sandbox [sandboxName] --importAccounts
```

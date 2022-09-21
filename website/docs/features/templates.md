---
title: Templates
---

Taqueria plugins are able to define templates that can be used to generate project components such as contracts, tests, or operations. Templates are exposed via plugins and use the `create` task to create and register the templates output

## Available Templates

| Template                              | < template >        | Plugin                       | Command                                   | Description                                                                                                        |
|---------------------------------------|---------------------|------------------------------|-------------------------------------------|--------------------------------------------------------------------------------------------------------------------|
| Ligo contract                         | `contract`          | `@taqueria\plugin-ligo`      | `taq create contract <path>`              | Instantiates a new Ligo contract at the provided `<path>` and registers the contract in the contract registry      |
| Archetype contract                    | `archetypeContract` | `@taqueria\plugin-archetype` | `taq create contract <path>`              | Instantiates a new Archetype contract at the provided `<path>` and registers the contract in the contract registry |
| Generate tests for Michelson contract | `contract-test`     | `@taqueria\plugin-jest`      | `taq create contract-test <contractName>` | Instantiates a new test suite (or entire tests folder including jest config) for a contract                        |

## Using Templates

To use a template, you first need to install the appropriate plugin, then use the `create` task

The structure of the `create` task is:

```shell
taq create <template> <path/contractName>
```

### Positional Arguments

- `template`: The name of the template to use (see above)
- `path`: The path to the file to create (ie: (`contracts/newContract.jsligo`))
- `contractName`: The path to the file to use as a source (ie: (`contract.tz`))

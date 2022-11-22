---
title: test
---

## Overview

Taq `test` is used to initialize test partitions and run Jest tests in Taqueria. Taqueria Partitions are directories that contain test configurations and test specs. You can easily run all tests in a given partition by passing the name of the partition to the `test` command

:::note
If you run `taq test` without any arguments, it will initialize a default test partition in a folder called `tests`
:::

## Plugin Implementations
                     
This task is implemented by the following plugins:

| Plugin Name                  | Description                                    |
| ---------------------------- | ---------------------------------------------- |
| `@taqueria/plugin-jest`      | Initializes Jest configurations and runs tests |

### Command

```shell
taq test [partition]
```

### Task Details

| Task Name              | Command                             | Type                      | Description                                                  | 
| ---------------------- | ----------------------------------- | ------------------------- | ------------------------------------------------------------ |
| `test`                 | `taq test [partition]`              | Plugin - testing          | Runs the tests in the provided partition(folder)             |

### Command-Line Arguments

| Argument      | Required | Shortflag | Description                                              | Example Usage                                         |
| ------------- | -------- | --------- | -------------------------------------------------------- | ----------------------------------------------------- |
| `[partition]` | No       |           | The name of the partition (test folder) to target        | `taq test e2e-tests`                                  |
| `testPattern` | No       | `-t`      | Run test files that match the provided pattern           | `taq test -t /e2e/gms`                                |      
| `init`        | No       | `-i`      | Initialize a new test partition                          | `taq test -i integration-tests`                       |

### Usage

| Description                                    | Command                                     | Behaviour                                                                     |
| ---------------------------------------------- | ------------------------------------------- | ----------------------------------------------------------------------------- |
| Run all tests in the default folder            | `taq test`                                  | Runs all test specs found in the default partition  (`/tests` folder)      |
| Initialize a new test partition                | `taq test [partition] --init`               | Creates a new test partition named with the provided name                     |
| Run all tests in a given partition             | `taq test [partition]`                      | Runs all test specs found in the provided partition (folder)               |
| Run test files that match the provided pattern | `taq test -testPattern <testPattern>`       | Runs the tests that match the provided regex expression                       |


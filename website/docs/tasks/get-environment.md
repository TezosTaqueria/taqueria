---
title: get-environment
---

## Overview

This task provides the ability to retrieve the name of the default environment that is targeted when running any other taqueria task.

Please see [Environments](/docs/config/environments) to learn more about what environments are.

## Plugin Implementations

This task is implemented by the following plugins:

| Plugin Name                            | Description                             |
| -------------------------------------- | --------------------------------------- |
| N/A                                    | Core task - no plugin implementations   |

### Command

```shell
taq get-environment
```

### Task Details

| Task Name        | Command                       | Type                      | Description                                                  | 
| ---------------- | ----------------------------- | ------------------------- | ------------------------------------------------------------ |
| `get-environment`|`taq get-environment`          | Core CLI                  | Get the default environment, used by other tasks.            |

### Usage

| Description                               | Command                            | Behavior                                                                      |
| ----------------------------------------- | ---------------------------------- | ----------------------------------------------------------------------------- |
| Get the default environment               | `taq get-environment`              | Gets the _environmentDefault_ property in your .taq/config.json file          |
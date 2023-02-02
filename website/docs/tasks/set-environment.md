---
title: set-environment
---

## Overview

This task provides the ability to change the default environment that is targeted when running any other taqueria task.

Please see [Environments](/docs/config/environments) to learn more about what environments are.

## Plugin Implementations

This task is implemented by the following plugins:

| Plugin Name                            | Description                             |
| -------------------------------------- | --------------------------------------- |
| N/A                                    | Core task - no plugin implementations   |

### Command

```shell
taq set-environment [environmentName]
```

### Task Details

| Task Name        | Command                       | Type                      | Description                                                  | 
| ---------------- | ----------------------------- | ------------------------- | ------------------------------------------------------------ |
| `set-environment`|`taq set-environment [envName]`| Core CLI                  | Set the default environment, used by other tasks.            |

### Usage

| Description                               | Command                            | Behavior                                                                     |
| ----------------------------------------- | ---------------------------------- | ----------------------------------------------------------------------------- |
| Set the default environment               | `taq set-environment [envName]`    | Sets the _environmentDefault_ property in your .taq/config.json file          |
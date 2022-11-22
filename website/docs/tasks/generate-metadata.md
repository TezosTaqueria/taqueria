---
title: generate-metadata
---

## Overview

Taq `generate-metadata` task is used to generate-metadata for a smart contract.
Taq `generate-project-metadata` task is used to generate metadata for a project and add it to the `.taq/config.json` file to ease creating contract specific metadata


### Command

```shell
taq generate-metadata <contractName> 
```

```shell
taq generate-project-metadata 
```

### Task Details
 
| Task Name                   | Command                                  | Type              | Description                                | 
|-----------------------------|------------------------------------------|-------------------|--------------------------------------------|
| `generate-metadata`         | `taq generate-metadata <contractName>`   | Plugin - Metadata | Generate metadata for a smart contract     |
| `generate-project-metadata` | `taq generate-project-metadata`          | Plugin - Metadata | Generate metadata for a taq'ified project  |

### Command-Line Arguments

| Argument         | Required | Description                              | Example Usage                       |
|------------------| -------- |------------------------------------------|-------------------------------------|
| `<contractName>` | Yes      | Contract Name to generate metadata for   | `taq generate-metadata increment.tz` |


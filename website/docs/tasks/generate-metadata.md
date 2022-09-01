---
title: generate metadata
---

## Overview

Taq `generate metadata` task is using to generate metadata for a contract.
Taq `generate-project-metadata` task is using to generate metadata for a project and add it to `config.json` file


### Command

```shell
taq generate <contractName> 
```

```shell
taq generate-project-metadata 
```

### Task Details
 
| Task Name                   | Command                         | Type              | Description                     | 
|-----------------------------|---------------------------------|-------------------|---------------------------------|
| `generate metadata`         | `taq generate <contractName>`   | Plugin - Metadata | Generate metadata for a contact |
| `generate project metadata` | `taq generate-project-metadata` | Plugin - Metadata | Generate metadata for a project |

### Command-Line Arguments

| Argument         | Required | Description                         | Example Usage                       |
|------------------| -------- |-------------------------------------|-------------------------------------|
| `<contractName>` | Yes      | Conctan Name to generate metadata   | `taq generate metadata incement.tz` |


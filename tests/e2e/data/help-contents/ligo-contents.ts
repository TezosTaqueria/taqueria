export const helpContentsLigoPlugin: string = `taq <command>

Commands:
  taq init [projectDir]           Initialize a new project
  taq opt-in                      Opt-in to sharing anonymous usage analytics
  taq opt-out                     Opt-out of sharing anonymous usage analytics
  taq install <pluginName>        Install a plugin
  taq uninstall <pluginName>      Uninstall a plugin
  taq add-contract <sourceFile>   Add a contract to the contract registry
  taq rm-contract <contractName>  Remove a contract from the contract registry
  taq list-contracts              List registered contracts
  taq ligo                        This task allows you to run arbitrary LIGO nat
                                  ive commands. Note that they might not benefit
                                   from the abstractions provided by Taqueria
  taq compile <sourceFile>        Compile a smart contract written in a LIGO syn
                                  tax to Michelson code, along with its associat
                                  ed storage/parameter list files if they are fo
                                  und                 [aliases: c, compile-ligo]
  taq test <sourceFile>           Test a smart contract written in LIGO
  taq clean                       Clean all the Taqueria-related docker images
  taq create <template>           Create files from pre-existing templates

Options:
      --version     Show version number                                [boolean]
      --build       Display build information about the current version[boolean]
  -p, --projectDir  Path to your project directory               [default: "./"]
  -e, --env         Specify an environment configuration
  -y, --yes         Select "yes" to any prompt        [boolean] [default: false]
      --help        Show help                                          [boolean]

Taqueria is currently in BETA. You've been warned. :)
`;

export const helpContentsLigoPluginSpecific = `taq compile <sourceFile>

Compile a smart contract written in a LIGO syntax to Michelson code, along with
its associated storage/parameter list files if they are found

Options:
  -p, --projectDir  Path to your project directory               [default: "./"]
  -e, --env         Specify an environment configuration
      --version     Show version number                                [boolean]
      --build       Display build information about the current version[boolean]
  -y, --yes         Select "yes" to any prompt        [boolean] [default: false]
      --help        Show help                                          [boolean]
      --json        Emit JSON-encoded Michelson                        [boolean]
`;

export const ligoNoContracts = `No contracts found to compile. Have you run "taq add-contract [sourceFile]" ?
`;

export const ligoNoContractSource = `
taq compile <sourceFile>

Compile a smart contract written in a LIGO syntax to Michelson code, along with
its associated storage/parameter list files if they are found

Options:
      --version     Show version number                                [boolean]
      --build       Display build information about the current version[boolean]
  -p, --projectDir  Path to your project directory               [default: "./"]
  -e, --env         Specify an environment configuration
  -y, --yes         Select "yes" to any prompt        [boolean] [default: false]
      --help        Show help                                          [boolean]
      --json        Emit JSON-encoded Michelson                        [boolean]

Not enough non-option arguments: got 0, need at least 1
`;

export const compileNonExistent = `┌────────────┬──────────────┐
│ Contract   │ Artifact     │
├────────────┼──────────────┤
│ test.mligo │ Not compiled │
└────────────┴──────────────┘
`;

export const compileInvalid = `┌────────────────────────┬──────────────┐
│ Contract               │ Artifact     │
├────────────────────────┼──────────────┤
│ invalid-contract.mligo │ Not compiled │
└────────────────────────┴──────────────┘
`;

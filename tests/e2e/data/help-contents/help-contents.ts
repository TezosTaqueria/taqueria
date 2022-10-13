export const helpContentsNoProject: string = `taq [command]

Commands:
  taq init [projectDir]                     Initialize a new project
  taq opt-in                                Opt-in to sharing anonymous usage an
                                            alytics
  taq opt-out                               Opt-out of sharing anonymous usage a
                                            nalytics
  taq scaffold [scaffoldUrl] [scaffoldProj  Generate a new project using pre-mad
  ectDir]                                   e scaffold

Options:
      --version     Show version number                                [boolean]
      --build       Display build information about the current version[boolean]
  -p, --projectDir  Path to your project directory               [default: "./"]
  -e, --env         Specify an environment configuration

Taqueria is currently in BETA. You've been warned. :)
`;

export const helpContentsForProject: string = `taq <command>

Commands:
  taq init [projectDir]           Initialize a new project
  taq opt-in                      Opt-in to sharing anonymous usage analytics
  taq opt-out                     Opt-out of sharing anonymous usage analytics
  taq install <pluginName>        Install a plugin
  taq uninstall <pluginName>      Uninstall a plugin
  taq add-contract <sourceFile>   Add a contract to the contract registry
  taq rm-contract <contractName>  Remove a contract from the contract registry
  taq list-contracts              List registered contracts

Options:
      --version     Show version number                                [boolean]
      --build       Display build information about the current version[boolean]
  -p, --projectDir  Path to your project directory               [default: "./"]
  -e, --env         Specify an environment configuration
  -y, --yes         Select "yes" to any prompt        [boolean] [default: false]
      --help        Show help                                          [boolean]

Taqueria is currently in BETA. You've been warned. :)
`;

export const helpContentsLigoSmartpy: string = `taq <command>

Commands:
  taq init [projectDir]           Initialize a new project
  taq opt-in                      Opt-in to sharing anonymous usage analytics
  taq opt-out                     Opt-out of sharing anonymous usage analytics
  taq install <pluginName>        Install a plugin
  taq uninstall <pluginName>      Uninstall a plugin
  taq add-contract <sourceFile>   Add a contract to the contract registry
  taq rm-contract <contractName>  Remove a contract from the contract registry
  taq list-contracts              List registered contracts
  taq compile                     Provided by more than one plugin. The option -
                                  -plugin is required.
  taq test <sourceFile>           Test a smart contract written in LIGO
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

export const helpContentsLigoSmartpySpecific = `taq compile

Provided by more than one plugin. The option --plugin is required.

Options:
      --version     Show version number                                [boolean]
      --build       Display build information about the current version[boolean]
  -p, --projectDir  Path to your project directory               [default: "./"]
  -e, --env         Specify an environment configuration
  -y, --yes         Select "yes" to any prompt        [boolean] [default: false]
      --help        Show help                                          [boolean]
      --plugin      Specify which plugin should be used to execute this task
  [required] [choices: "@taqueria/plugin-ligo", "ligo", "@taqueria/plugin-smartp
                                                                  y", "smartpy"]
`;

export const helpContentsLigoArchetype: string = `taq <command>

Commands:
  taq init [projectDir]           Initialize a new project
  taq opt-in                      Opt-in to sharing anonymous usage analytics
  taq opt-out                     Opt-out of sharing anonymous usage analytics
  taq install <pluginName>        Install a plugin
  taq uninstall <pluginName>      Uninstall a plugin
  taq add-contract <sourceFile>   Add a contract to the contract registry
  taq rm-contract <contractName>  Remove a contract from the contract registry
  taq list-contracts              List registered contracts
  taq compile                     Provided by more than one plugin. The option -
                                  -plugin is required.
  taq test <sourceFile>           Test a smart contract written in LIGO
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

export const helpContentsLigoArchetypeSpecific = `taq compile

Provided by more than one plugin. The option --plugin is required.

Options:
      --version     Show version number                                [boolean]
      --build       Display build information about the current version[boolean]
  -p, --projectDir  Path to your project directory               [default: "./"]
  -e, --env         Specify an environment configuration
  -y, --yes         Select "yes" to any prompt        [boolean] [default: false]
      --help        Show help                                          [boolean]
      --plugin      Specify which plugin should be used to execute this task
  [required] [choices: "@taqueria/plugin-ligo", "ligo", "@taqueria/plugin-archet
                                                              ype", "archetype"]
`;

export const helpContentsAllPlugin: string = `taq <command>

Commands:
  taq init [projectDir]                 Initialize a new project
  taq opt-in                            Opt-in to sharing anonymous usage analyt
                                        ics
  taq opt-out                           Opt-out of sharing anonymous usage analy
                                        tics
  taq install <pluginName>              Install a plugin
  taq uninstall <pluginName>            Uninstall a plugin
  taq add-contract <sourceFile>         Add a contract to the contract registry
  taq rm-contract <contractName>        Remove a contract from the contract regi
                                        stry
  taq list-contracts                    List registered contracts
  taq compile                           Provided by more than one plugin. The op
                                        tion --plugin is required.
  taq test                              Provided by more than one plugin. The op
                                        tion --plugin is required.
  taq generate types [typescriptDir]    Generate types for a contract to be used
                                         with taquito   [aliases: gen, gentypes]
  taq start sandbox [sandboxName]       Starts a flextesa sandbox
                                                                [aliases: start]
  taq stop sandbox [sandboxName]        Stops a flextesa sandbox [aliases: stop]
  taq list accounts <sandboxName>       List the balances of all sandbox account
                                        s
  taq publish [path]                    Upload and pin files using your pinata a
                                        ccount.
  taq pin [hash]                        Pin a file already on ipfs with your pin
                                        ata account.
  taq generate-metadata [contractName]  Create contract metadata.
  taq generate-project-metadata         Create project metadata to be used as de
                                        faults for contracts.
  taq deploy <contract>                 Deploy a smart contract to a particular
                                        environment         [aliases: originate]
  taq transfer <contract>               Transfer/call an implicit account or a s
                                        mart contract (specified via its alias o
                                        r address) deployed to a particular envi
                                        ronment                  [aliases: call]
  taq typecheck <sourceFile>            Typecheck a Michelson contract
                                                                   [aliases: tc]
  taq simulate <sourceFile>             Run a Michelson contract as a simulation
                                                                  [aliases: sim]
  taq create <template>                 Create files from pre-existing templates

Options:
      --version     Show version number                                [boolean]
      --build       Display build information about the current version[boolean]
  -p, --projectDir  Path to your project directory               [default: "./"]
  -e, --env         Specify an environment configuration
  -y, --yes         Select "yes" to any prompt        [boolean] [default: false]
      --help        Show help                                          [boolean]

Taqueria is currently in BETA. You've been warned. :)
`;

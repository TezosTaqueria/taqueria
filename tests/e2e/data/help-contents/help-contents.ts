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
  taq clean                       Clean all the Taqueria-related docker images

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
  taq clean                       Clean all the Taqueria-related docker images
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
  taq clean                       Clean all the Taqueria-related docker images
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

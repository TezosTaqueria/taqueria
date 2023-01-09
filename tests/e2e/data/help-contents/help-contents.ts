export const helpContentsNoProject: string = `taq [command]

Commands:
  taq init [projectDir]                     Initialize a new project
  taq scaffold [scaffoldUrl] [scaffoldProj  Generate a new project using pre-mad
  ectDir]                                   e scaffold
  taq opt-in                                Opt-in to sharing anonymous usage an
                                            alytics
  taq opt-out                               Opt-out of sharing anonymous usage a
                                            nalytics

Options:
  -p, --projectDir  Path to your project directory               [default: "./"]
  -e, --env         Specify an environment configuration
      --version     Show version number                                [boolean]
      --build       Display build information about the current version[boolean]

Taqueria is currently in BETA. You've been warned. :)
`;

export const helpContentsForProject: string = `taq <command>

Commands:
  taq init [projectDir]                     Initialize a new project
  taq scaffold [scaffoldUrl] [scaffoldProj  Generate a new project using pre-mad
  ectDir]                                   e scaffold
  taq opt-in                                Opt-in to sharing anonymous usage an
                                            alytics
  taq opt-out                               Opt-out of sharing anonymous usage a
                                            nalytics
  taq install <pluginName>                  Install a plugin
  taq uninstall <pluginName>                Uninstall a plugin
  taq add-contract <sourceFile>             Add a contract to the contract regis
                                            try
  taq rm-contract <contractName>            Remove a contract from the contract
                                            registry
  taq list-contracts                        List registered contracts
  taq clean                                 Clean all the Taqueria-related docke
                                            r images

Options:
  -p, --projectDir  Path to your project directory               [default: "./"]
  -e, --env         Specify an environment configuration
      --version     Show version number                                [boolean]
      --build       Display build information about the current version[boolean]
  -y, --yes         Select "yes" to any prompt        [boolean] [default: false]
      --help        Show help                                          [boolean]

Taqueria is currently in BETA. You've been warned. :)
`;

export const helpContentsLigoSmartpy: string = `taq <command>

Commands:
  taq init [projectDir]                     Initialize a new project
  taq scaffold [scaffoldUrl] [scaffoldProj  Generate a new project using pre-mad
  ectDir]                                   e scaffold
  taq opt-in                                Opt-in to sharing anonymous usage an
                                            alytics
  taq opt-out                               Opt-out of sharing anonymous usage a
                                            nalytics
  taq install <pluginName>                  Install a plugin
  taq uninstall <pluginName>                Uninstall a plugin
  taq add-contract <sourceFile>             Add a contract to the contract regis
                                            try
  taq rm-contract <contractName>            Remove a contract from the contract
                                            registry
  taq list-contracts                        List registered contracts
  taq clean                                 Clean all the Taqueria-related docke
                                            r images
  taq ligo                                  This task allows you to run arbitrar
                                            y LIGO native commands. Note that th
                                            ey might not benefit from the abstra
                                            ctions provided by Taqueria
  taq compile                               Provided by more than one plugin. Th
                                            e option --plugin is required.
  taq test                                  Provided by more than one plugin. Th
                                            e option --plugin is required.
  taq create <template>                     Create files from pre-existing templ
                                            ates

Options:
  -p, --projectDir  Path to your project directory               [default: "./"]
  -e, --env         Specify an environment configuration
      --version     Show version number                                [boolean]
      --build       Display build information about the current version[boolean]
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
  taq init [projectDir]                     Initialize a new project
  taq scaffold [scaffoldUrl] [scaffoldProj  Generate a new project using pre-mad
  ectDir]                                   e scaffold
  taq opt-in                                Opt-in to sharing anonymous usage an
                                            alytics
  taq opt-out                               Opt-out of sharing anonymous usage a
                                            nalytics
  taq install <pluginName>                  Install a plugin
  taq uninstall <pluginName>                Uninstall a plugin
  taq add-contract <sourceFile>             Add a contract to the contract regis
                                            try
  taq rm-contract <contractName>            Remove a contract from the contract
                                            registry
  taq list-contracts                        List registered contracts
  taq clean                                 Clean all the Taqueria-related docke
                                            r images
  taq ligo                                  This task allows you to run arbitrar
                                            y LIGO native commands. Note that th
                                            ey might not benefit from the abstra
                                            ctions provided by Taqueria
  taq compile                               Provided by more than one plugin. Th
                                            e option --plugin is required.
  taq test <sourceFile>                     Test a smart contract written in LIG
                                            O
  taq create <template>                     Create files from pre-existing templ
                                            ates

Options:
  -p, --projectDir  Path to your project directory               [default: "./"]
  -e, --env         Specify an environment configuration
      --version     Show version number                                [boolean]
      --build       Display build information about the current version[boolean]
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

export const helpContentsContractTypesPlugin = `taq <command>

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
  taq generate types [typescriptDir]        Generate types for a contract to be
                                            used with taquito
                                                        [aliases: gen, gentypes]
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

export const helpContentsContractTypesPluginSpecific = `taq generate types [typescriptDir]

Generate types for a contract to be used with taquito

Positionals:
  typescriptDir  The output directory for the generated type files
                                                              [default: "types"]

Options:
  -p, --projectDir     Path to your project directory            [default: "./"]
  -e, --env            Specify an environment configuration
      --version        Show version number                             [boolean]
      --build          Display build information about the current version
                                                                       [boolean]
  -y, --yes            Select "yes" to any prompt     [boolean] [default: false]
      --help           Show help                                       [boolean]
  -t, --typeAliasMode  The type aliases used in the generated types
                                                     [choices: "file", "simple"]
`;

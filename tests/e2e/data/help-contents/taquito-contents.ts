export const helpContentsTaquitoPlugin: string = `taq <command>

Commands:
  taq init [projectDir]           Initialize a new project
  taq opt-in                      Opt-in to sharing anonymous usage analytics
  taq opt-out                     Opt-out of sharing anonymous usage analytics
  taq install <pluginName>        Install a plugin
  taq uninstall <pluginName>      Uninstall a plugin
  taq add-contract <sourceFile>   Add a contract to the contract registry
  taq rm-contract <contractName>  Remove a contract from the contract registry
  taq list-contracts              List registered contracts
  taq deploy <contract>           Deploy a smart contract to a particular enviro
                                  nment                     [aliases: originate]
  taq transfer <contract>         Transfer/call an implicit account or a smart c
                                  ontract (specified via its alias or address) d
                                  eployed to a particular environment
                                                                 [aliases: call]
  taq fund                        Fund all the instantiated accounts up to the d
                                  esired/declared amount in a target environment
  taq instantiate-account         Instantiate all accounts declared in the "acco
                                  unts" field at the root level of the config fi
                                  le to a target environment
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

export const helpContentsTaquitoPluginSpecific = `taq deploy <contract>

Deploy a smart contract to a particular environment

Options:
      --version     Show version number                                [boolean]
      --build       Display build information about the current version[boolean]
  -p, --projectDir  Path to your project directory               [default: "./"]
  -e, --env         Specify an environment configuration
  -y, --yes         Select "yes" to any prompt        [boolean] [default: false]
      --help        Show help                                          [boolean]
      --alias       Alias used to refer to the deployed contract's address
      --storage     Name of the storage file that contains the storage value as
                    a Michelson expression, in the artifacts directory, used for
                     originating a contract
      --sender      Name of an instantiated account to use as the sender of the
                    originate operation
      --mutez       Amount of Mutez to transfer
`;

export const helpContentsTaquitoPluginTransferSpecific = `taq transfer <contract>

Transfer/call an implicit account or a smart contract (specified via its alias o
r address) deployed to a particular environment

Options:
      --version     Show version number                                [boolean]
      --build       Display build information about the current version[boolean]
  -p, --projectDir  Path to your project directory               [default: "./"]
  -e, --env         Specify an environment configuration
  -y, --yes         Select "yes" to any prompt        [boolean] [default: false]
      --help        Show help                                          [boolean]
      --mutez       Amount of Mutez to transfer
      --param       Name of the parameter file that contains the parameter value
                     as a Michelson expression, in the artifacts directory, used
                     for invoking a deployed contract
      --entrypoint  You may explicitly specify an entrypoint to make the paramet
                    er value shorter, without having to specify a chain of (Left
                     (Right ... 14 ...))
      --sender      Name of an instantiated account to use as the sender of the
                    transfer operation
`;

export const helpContentsTaquitoPluginFundSpecific = `taq fund

Fund all the instantiated accounts up to the desired/declared amount in a target
 environment

Options:
      --version     Show version number                                [boolean]
      --build       Display build information about the current version[boolean]
  -p, --projectDir  Path to your project directory               [default: "./"]
  -e, --env         Specify an environment configuration
  -y, --yes         Select "yes" to any prompt        [boolean] [default: false]
      --help        Show help                                          [boolean]
`;

export const helpContentsTaquitoPluginInstantiateAccountSpecific = `taq instantiate-account

Instantiate all accounts declared in the "accounts" field at the root level of t
he config file to a target environment

Options:
      --version     Show version number                                [boolean]
      --build       Display build information about the current version[boolean]
  -p, --projectDir  Path to your project directory               [default: "./"]
  -e, --env         Specify an environment configuration
  -y, --yes         Select "yes" to any prompt        [boolean] [default: false]
      --help        Show help                                          [boolean]
`;

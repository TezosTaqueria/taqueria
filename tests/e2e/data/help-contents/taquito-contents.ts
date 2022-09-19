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
`;

export const originateSingleOutput = (address: string) =>
	`
┌────────────────┬──────────────────────────────────────┬─────────────┐
│ Contract       │ Address                              │ Destination │
├────────────────┼──────────────────────────────────────┼─────────────┤
│ hello-tacos.tz │ KT1N4bZh884qhirEsmPge6y8a9mRfhEoMGaX │ hangzhounet │
└────────────────┴──────────────────────────────────────┴─────────────┘
`.replace('KT1N4bZh884qhirEsmPge6y8a9mRfhEoMGaX', address).trimStart();

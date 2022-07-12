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
  taq deploy [contract]           Deploy a smart contract to a particular enviro
                                  nment                     [aliases: originate]
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

export const helpContentsTaquitoPluginSpecific = `taq deploy [contract]

Deploy a smart contract to a particular environment

Options:
      --version     Show version number                                [boolean]
      --build       Display build information about the current version[boolean]
  -p, --projectDir  Path to your project directory               [default: "./"]
  -e, --env         Specify an environment configuration
  -y, --yes         Select "yes" to any prompt        [boolean] [default: false]
      --help        Show help                                          [boolean]
`;

export const originateSingleOutput = (address: string) =>
	`
┌────────────────┬──────────────────────────────────────┬─────────────┐
│ Contract       │ Address                              │ Destination │
├────────────────┼──────────────────────────────────────┼─────────────┤
│ hello-tacos.tz │ KT1N4bZh884qhirEsmPge6y8a9mRfhEoMGaX │ hangzhounet │
└────────────────┴──────────────────────────────────────┴─────────────┘
`.replace('KT1N4bZh884qhirEsmPge6y8a9mRfhEoMGaX', address).trimStart();

export const helpContentsArchetypePlugin: string = `taq <command>

Commands:
  taq init [projectDir]           Initialize a new project
  taq opt-in                      Opt-in to sharing anonymous usage analytics
  taq opt-out                     Opt-out of sharing anonymous usage analytics
  taq install <pluginName>        Install a plugin
  taq uninstall <pluginName>      Uninstall a plugin
  taq add-contract <sourceFile>   Add a contract to the contract registry
  taq rm-contract <contractName>  Remove a contract from the contract registry
  taq list-contracts              List registered contracts
  taq compile [sourceFile]        Compile a smart contract written in a Archetyp
                                  e syntax to Michelson code
                                                 [aliases: c, compile-archetype]

Options:
      --version     Show version number                                [boolean]
      --build       Display build information about the current version[boolean]
  -p, --projectDir  Path to your project directory               [default: "./"]
  -e, --env         Specify an environment configuration
  -y, --yes         Select "yes" to any prompt        [boolean] [default: false]
      --help        Show help                                          [boolean]

Taqueria is currently in BETA. You've been warned. :)
`;

export const helpContentsArchetypePluginSpecific: string = `taq compile [sourceFile]

Compile a smart contract written in a Archetype syntax to Michelson code

Options:
      --version     Show version number                                [boolean]
      --build       Display build information about the current version[boolean]
  -p, --projectDir  Path to your project directory               [default: "./"]
  -e, --env         Specify an environment configuration
  -y, --yes         Select "yes" to any prompt        [boolean] [default: false]
      --help        Show help                                          [boolean]
`;

export const archetypeNoContracts = `
┌────────────┬──────────┐
│ Contract   │ Artifact │
├────────────┼──────────┤
│ None found │ N/A      │
└────────────┴──────────┘
`.trimStart();

export const archetypeNotCompiled = `
┌──────────┬──────────────┐
│ Contract │ Artifact     │
├──────────┼──────────────┤
│ test.arl │ Not compiled │
└──────────┴──────────────┘
`.trimStart();

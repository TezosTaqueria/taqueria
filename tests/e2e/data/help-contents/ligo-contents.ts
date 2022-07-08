export const helpContentsLigoPlugin: string = `taq <command>

Commands:
  taq init [projectDir]       Initialize a new project
  taq opt-in                  Opt-in to sharing anonymous usage analytics
  taq opt-out                 Opt-out of sharing anonymous usage analytics
  taq install <pluginName>    Install a plugin
  taq uninstall <pluginName>  Uninstall a plugin
  taq compile [sourceFile]    Compile a smart contract written in a Ligo syntax
                              to Michelson code       [aliases: c, compile-ligo]

Options:
      --version     Show version number                                [boolean]
      --build       Display build information about the current version[boolean]
  -p, --projectDir  Path to your project directory               [default: "./"]
  -e, --env         Specify an environment configuration
  -y, --yes         Select "yes" to any prompt        [boolean] [default: false]
      --help        Show help                                          [boolean]

Taqueria is currently in BETA. You've been warned. :)
`;

export const helpContentsLigoPluginSpecific = `taq compile [sourceFile]

Compile a smart contract written in a Ligo syntax to Michelson code

Options:
      --version     Show version number                                [boolean]
      --build       Display build information about the current version[boolean]
  -p, --projectDir  Path to your project directory               [default: "./"]
  -e, --env         Specify an environment configuration
  -y, --yes         Select "yes" to any prompt        [boolean] [default: false]
      --help        Show help                                          [boolean]
  -e, --entrypoint  The entry point that will be compiled
  -s, --syntax      The syntax used in the contract
  -i, --infer       Enable type inference
`;

export const ligoNoContracts = `
┌────────────┬──────────┐
│ Contract   │ Artifact │
├────────────┼──────────┤
│ None found │ N/A      │
└────────────┴──────────┘
`.trimStart();

export const compileNonExistent = `
┌────────────┬──────────────┐
│ Contract   │ Artifact     │
├────────────┼──────────────┤
│ test.mligo │ Not compiled │
└────────────┴──────────────┘
`.trimStart();

export const compileInvalid = `
┌────────────────────────┬──────────────┐
│ Contract               │ Artifact     │
├────────────────────────┼──────────────┤
│ invalid-contract.mligo │ Not compiled │
└────────────────────────┴──────────────┘
`.trimStart();

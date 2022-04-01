export const helpContentsNoProject: string = `taq [command]

Commands:
  taq init [projectDir]                     Initialize a new project
  taq scaffold [scaffoldUrl] [scaffoldProj  Generate a new project using pre-mad
  ectDir]                                   e scaffold

Options:
      --version     Show version number                                [boolean]
      --build       Display build information about the current version[boolean]
  -p, --projectDir  Path to your project directory               [default: "./"]
      --configDir   Config directory (default ./.taq)        [default: "./.taq"]
  -e, --env         Specify an environment configuration

Taqueria is currently in BETA. You've been warned. :)

Your config.json file is invalid
`;

export const helpContentsForProject: string = `taq <command>

Commands:
  taq init [projectDir]                  Initialize a new project
  taq scaffold [scaffoldUrl] [scaffoldP  Generate a new project using a pre
  rojectDir]                             -configured scaffold
  taq install <pluginName>               Install a plugin
  taq uninstall <pluginName>             Uninstall a plugin

Options:
      --version     Show version number                           [boolean]
      --build       Display build information about the current version
                                                                  [boolean]
  -p, --projectDir  Path to your project directory          [default: "./"]
  -d, --configDir   Config directory (default ./.taq)   [default: "./.taq"]
  -e, --env         Specify an environment configuration
      --help        Show help                                     [boolean]

Taqueria is currently in BETA. You've been warned. :)
`;

export const helpContentsLigo: string = `taq <command>

Commands:
  taq init [projectDir]                     Initialize a new project
  taq scaffold [scaffoldUrl] [scaffoldProj  Generate a new project using pre-mad
  ectDir]                                   e scaffold
  taq install <pluginName>                  Install a plugin
  taq uninstall <pluginName>                Uninstall a plugin
  taq compile [sourceFile]                  Compile a smart contract written in
                                            a Ligo syntax to Michelson code
                                                      [aliases: c, compile-ligo]

Options:
      --version     Show version number                                [boolean]
      --build       Display build information about the current version[boolean]
  -p, --projectDir  Path to your project directory               [default: "./"]
      --configDir   Config directory (default ./.taq)        [default: "./.taq"]
  -e, --env         Specify an environment configuration
      --help        Show help                                          [boolean]

Taqueria is currently in BETA. You've been warned. :)
`;

export const helpContentsSmartpy: string = `taq <command>

Commands:
  taq init [projectDir]                     Initialize a new project
  taq scaffold [scaffoldUrl] [scaffoldProj  Generate a new project using pre-mad
  ectDir]                                   e scaffold
  taq install <pluginName>                  Install a plugin
  taq uninstall <pluginName>                Uninstall a plugin
  taq compile [sourceFile]                  Compile a smart contract written in
                                            a SmartPy syntax to Michelson code
                                                   [aliases: c, compile-smartpy]
  taq teapot                                Have a cup of tea  [aliases: t, tea]

Options:
      --version     Show version number                                [boolean]
      --build       Display build information about the current version[boolean]
  -p, --projectDir  Path to your project directory               [default: "./"]
      --configDir   Config directory (default ./.taq)        [default: "./.taq"]
  -e, --env         Specify an environment configuration
      --help        Show help                                          [boolean]

Taqueria is currently in BETA. You've been warned. :)
`;

export const helpContentsLigoSmartpy: string = `taq <command>

Commands:
  taq init [projectDir]                     Initialize a new project
  taq scaffold [scaffoldUrl] [scaffoldProj  Generate a new project using pre-mad
  ectDir]                                   e scaffold
  taq install <pluginName>                  Install a plugin
  taq uninstall <pluginName>                Uninstall a plugin
  taq compile                               Provided by more than one plugin. Th
                                            e option --plugin is required.
  taq teapot                                Have a cup of tea  [aliases: t, tea]

Options:
      --version     Show version number                                [boolean]
      --build       Display build information about the current version[boolean]
  -p, --projectDir  Path to your project directory               [default: "./"]
      --configDir   Config directory (default ./.taq)        [default: "./.taq"]
  -e, --env         Specify an environment configuration
      --help        Show help                                          [boolean]

Taqueria is currently in BETA. You've been warned. :)
`;

export const helpContentsTaquito: string = `taq <command>

Commands:
  taq init [projectDir]                     Initialize a new project
  taq scaffold [scaffoldUrl] [scaffoldProj  Generate a new project using pre-mad
  ectDir]                                   e scaffold
  taq install <pluginName>                  Install a plugin
  taq uninstall <pluginName>                Uninstall a plugin
  taq deploy [contract]                     Deploy a smart contract to a particu
                                            lar environment [aliases: originate]

Options:
      --version     Show version number                                [boolean]
      --build       Display build information about the current version[boolean]
  -p, --projectDir  Path to your project directory               [default: "./"]
      --configDir   Config directory (default ./.taq)        [default: "./.taq"]
  -e, --env         Specify an environment configuration
      --help        Show help                                          [boolean]

Taqueria is currently in BETA. You've been warned. :)
`;

export const helpContentsFlextesa: string = `taq <command>

Commands:
  taq init [projectDir]                     Initialize a new project
  taq scaffold [scaffoldUrl] [scaffoldProj  Generate a new project using pre-mad
  ectDir]                                   e scaffold
  taq install <pluginName>                  Install a plugin
  taq uninstall <pluginName>                Uninstall a plugin
  taq start sandbox [sandboxName]           Starts a flextesa sandbox
                                                                [aliases: start]
  taq stop sandbox [sandboxName]            Stops a flextesa sandbox
                                                                 [aliases: stop]
  taq list accounts <sandboxName>           List the balances of all sandbox acc
                                            ounts

Options:
      --version     Show version number                                [boolean]
      --build       Display build information about the current version[boolean]
  -p, --projectDir  Path to your project directory               [default: "./"]
      --configDir   Config directory (default ./.taq)        [default: "./.taq"]
  -e, --env         Specify an environment configuration
      --help        Show help                                          [boolean]

Taqueria is currently in BETA. You've been warned. :)
`;

export const helpContentsGenerateTypes = `taq <command>

Commands:
  taq init [projectDir]                  Initialize a new project
  taq scaffold [scaffoldUrl] [scaffoldP  Generate a new project using a pre
  rojectDir]                             -configured scaffold
  taq install <pluginName>               Install a plugin
  taq uninstall <pluginName>             Uninstall a plugin
  taq generate types [typescriptDir]     Generate types for a contract to b
                                         e used with taquito
                                                   [aliases: gen, gentypes]

Options:
      --version     Show version number                           [boolean]
      --build       Display build information about the current version
                                                                  [boolean]
  -p, --projectDir  Path to your project directory          [default: "./"]
  -d, --configDir   Config directory (default ./.taq)   [default: "./.taq"]
  -e, --env         Specify an environment configuration
      --help        Show help                                     [boolean]

Taqueria is currently in BETA. You've been warned. :)
`;
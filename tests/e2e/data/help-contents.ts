export const helpContentsNoProject: string = `taq [command]

Commands:
  taq init [projectDir]  Initialize a new project

Options:
      --version     Show version number                           [boolean]
  -p, --projectDir  Path to your project directory          [default: "./"]
  -d, --configDir   Config directory (default ./.taq)   [default: "./.taq"]
  -e, --env         Specify an environment configuration

Taqueria is currently in BETA. You've been warned. :)

Your config.json file is invalid
`;

export const helpContentsForProject: string = `taq <command>

Commands:
  taq init [projectDir]       Initialize a new project
  taq install <pluginName>    Install a plugin
  taq uninstall <pluginName>  Uninstall a plugin

Options:
      --version     Show version number                           [boolean]
  -p, --projectDir  Path to your project directory          [default: "./"]
  -d, --configDir   Config directory (default ./.taq)   [default: "./.taq"]
  -e, --env         Specify an environment configuration
      --help        Show help                                     [boolean]

Taqueria is currently in BETA. You've been warned. :)
`;

export const helpContentsLigo: string = `taq <command>

Commands:
  taq init [projectDir]       Initialize a new project
  taq install <pluginName>    Install a plugin
  taq uninstall <pluginName>  Uninstall a plugin
  taq compile [sourceFile]    Compile a smart contract written in a Ligo sy
                              ntax to Michelson code
                                                 [aliases: c, compile-ligo]

Options:
      --version     Show version number                           [boolean]
  -p, --projectDir  Path to your project directory          [default: "./"]
  -d, --configDir   Config directory (default ./.taq)   [default: "./.taq"]
  -e, --env         Specify an environment configuration
      --help        Show help                                     [boolean]

Taqueria is currently in BETA. You've been warned. :)
`;

export const helpContentsSmartpy: string = `taq <command>

Commands:
  taq init [projectDir]       Initialize a new project
  taq install <pluginName>    Install a plugin
  taq uninstall <pluginName>  Uninstall a plugin
  taq compile [sourceFile]    Compile a smart contract written in a SmartPy
                               syntax to Michelson code
                                              [aliases: c, compile-smartpy]
  taq teapot                  Have a cup of tea           [aliases: t, tea]

Options:
      --version     Show version number                           [boolean]
  -p, --projectDir  Path to your project directory          [default: "./"]
  -d, --configDir   Config directory (default ./.taq)   [default: "./.taq"]
  -e, --env         Specify an environment configuration
      --help        Show help                                     [boolean]

Taqueria is currently in BETA. You've been warned. :)
`;

export const helpContentsLigoSmartpy: string = `taq <command>

Commands:
  taq init [projectDir]       Initialize a new project
  taq install <pluginName>    Install a plugin
  taq uninstall <pluginName>  Uninstall a plugin
  taq compile                 Provided by more than one plugin. The option
                              --plugin is required.
  taq teapot                  Have a cup of tea           [aliases: t, tea]

Options:
      --version     Show version number                           [boolean]
  -p, --projectDir  Path to your project directory          [default: "./"]
  -d, --configDir   Config directory (default ./.taq)   [default: "./.taq"]
  -e, --env         Specify an environment configuration
      --help        Show help                                     [boolean]

Taqueria is currently in BETA. You've been warned. :)
`;

export const helpContentsTaquito: string = `taq <command>

Commands:
  taq init [projectDir]       Initialize a new project
  taq install <pluginName>    Install a plugin
  taq uninstall <pluginName>  Uninstall a plugin
  taq deploy [contract]       Deploy a smart contract to a particular envir
                              onment                   [aliases: originate]

Options:
      --version     Show version number                           [boolean]
  -p, --projectDir  Path to your project directory          [default: "./"]
  -d, --configDir   Config directory (default ./.taq)   [default: "./.taq"]
  -e, --env         Specify an environment configuration
      --help        Show help                                     [boolean]

Taqueria is currently in BETA. You've been warned. :)
`;

export const helpContentsFlextesa: string = `taq <command>

Commands:
  taq init [projectDir]            Initialize a new project
  taq install <pluginName>         Install a plugin
  taq uninstall <pluginName>       Uninstall a plugin
  taq start sandbox [sandboxName]  Starts a flextesa sandbox
                                                           [aliases: start]
  taq stop sandbox [sandboxName]   Stops a flextesa sandbox [aliases: stop]
  taq list accounts <sandboxName>  List the balances of all sandbox account
                                   s

Options:
      --version     Show version number                           [boolean]
  -p, --projectDir  Path to your project directory          [default: "./"]
  -d, --configDir   Config directory (default ./.taq)   [default: "./.taq"]
  -e, --env         Specify an environment configuration
      --help        Show help                                     [boolean]

Taqueria is currently in BETA. You've been warned. :)
`;
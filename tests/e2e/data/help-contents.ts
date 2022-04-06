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
`

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
`

export const helpContentsLigoPlugin: string = `taq <command>

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
`

export const helpContentsLigoPluginSpecific = `taq compile [sourceFile]

Compile a smart contract written in a Ligo syntax to Michelson code

Options:
      --version      Show version number                          [boolean]
      --build        Display build information about the current version
                                                                  [boolean]
  -p, --projectDir   Path to your project directory         [default: "./"]
  -d, --configDir    Config directory (default ./.taq)  [default: "./.taq"]
      --help         Show help                                    [boolean]
  -e, --entry-point  Specify an environment configuration
  -s, --syntax       The syntax used in the contract
  -i, --infer        Enable type inference
`

export const helpContentsSmartpyPlugin: string = `taq <command>

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
`

export const helpContentsSmartpyPluginSpecific = `taq compile [sourceFile]

Compile a smart contract written in a SmartPy syntax to Michelson code

Options:
      --version     Show version number                           [boolean]
      --build       Display build information about the current version
                                                                  [boolean]
  -p, --projectDir  Path to your project directory          [default: "./"]
  -d, --configDir   Config directory (default ./.taq)   [default: "./.taq"]
  -e, --env         Specify an environment configuration
      --help        Show help                                     [boolean]
`

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
`

export const helpContentsLigoSmartpySpecific = `taq compile

Provided by more than one plugin. The option --plugin is required.

Options:
      --version     Show version number                           [boolean]
      --build       Display build information about the current version
                                                                  [boolean]
  -p, --projectDir  Path to your project directory          [default: "./"]
  -d, --configDir   Config directory (default ./.taq)   [default: "./.taq"]
  -e, --env         Specify an environment configuration
      --help        Show help                                     [boolean]
      --plugin      Use to specify what plugin you'd like when running this
                     task.
  [required] [choices: "@taqueria/plugin-ligo", "@taqueria/plugin-smartpy"]
`

export const helpContentsTaquitoPlugin: string = `taq <command>

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
`

export const helpContentsTaquitoPluginSpecific = `taq deploy [contract]

Deploy a smart contract to a particular environment

Options:
      --version     Show version number                           [boolean]
      --build       Display build information about the current version
                                                                  [boolean]
  -p, --projectDir  Path to your project directory          [default: "./"]
  -d, --configDir   Config directory (default ./.taq)   [default: "./.taq"]
  -e, --env         Specify an environment configuration
      --help        Show help                                     [boolean]
`

export const helpContentsFlextesaPlugin: string = `taq <command>

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
`

export const helpContentsFlextesaPluginStartSandbox = `taq start sandbox [sandboxName]

Starts a flextesa sandbox

Positionals:
  sandboxName  The name of the sandbox to start

Options:
      --version     Show version number                           [boolean]
      --build       Display build information about the current version
                                                                  [boolean]
  -p, --projectDir  Path to your project directory          [default: "./"]
  -d, --configDir   Config directory (default ./.taq)   [default: "./.taq"]
  -e, --env         Specify an environment configuration
      --help        Show help                                     [boolean]
`
export const helpContentsFlextesaPluginStopSandbox = `taq stop sandbox [sandboxName]

Stops a flextesa sandbox

Positionals:
  sandboxName  The name of the sandbox to stop

Options:
      --version     Show version number                           [boolean]
      --build       Display build information about the current version
                                                                  [boolean]
  -p, --projectDir  Path to your project directory          [default: "./"]
  -d, --configDir   Config directory (default ./.taq)   [default: "./.taq"]
  -e, --env         Specify an environment configuration
      --help        Show help                                     [boolean]
`

export const helpContentsFlextesaPluginListAccounts = `taq list accounts <sandboxName>

List the balances of all sandbox accounts

Positionals:
  sandboxName  The name of the sandbox to use                    [required]

Options:
      --version     Show version number                           [boolean]
      --build       Display build information about the current version
                                                                  [boolean]
  -p, --projectDir  Path to your project directory          [default: "./"]
  -d, --configDir   Config directory (default ./.taq)   [default: "./.taq"]
  -e, --env         Specify an environment configuration
      --help        Show help                                     [boolean]
`
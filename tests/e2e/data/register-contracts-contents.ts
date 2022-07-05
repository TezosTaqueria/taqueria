export const registerAddContract: string = `taq add-contract <sourceFile>

Add a contract to the contract registry

Positionals:
  sourceFile  Source file to add to the contract registry    [string] [required]

Options:
      --version               Show version number                      [boolean]
      --build                 Display build information about the current versio
                              n                                        [boolean]
  -p, --projectDir            Path to your project directory     [default: "./"]
  -e, --env                   Specify an environment configuration
  -y, --yes                   Select "yes" to any prompt
                                                      [boolean] [default: false]
      --help                  Show help                                [boolean]
  -n, --contractName, --name                                            [string]
`

export const registerRemoveContract: string = `taq rm-contract <contractName>

Remove a contract from the contract registry

Positionals:
  contractName  The name of the contract to remove           [string] [required]

Options:
      --version     Show version number                                [boolean]
      --build       Display build information about the current version[boolean]
  -p, --projectDir  Path to your project directory               [default: "./"]
  -e, --env         Specify an environment configuration
  -y, --yes         Select "yes" to any prompt        [boolean] [default: false]
      --help        Show help                                          [boolean]
`

export const registerListContracts: string = `taq list-contracts

List registered contracts

Options:
      --version     Show version number                                [boolean]
      --build       Display build information about the current version[boolean]
  -p, --projectDir  Path to your project directory               [default: "./"]
  -e, --env         Specify an environment configuration
  -y, --yes         Select "yes" to any prompt        [boolean] [default: false]
      --help        Show help                                          [boolean]
`
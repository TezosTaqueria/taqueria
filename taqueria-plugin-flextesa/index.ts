import {Plugin, Task, PositionalArg, Option} from '@taqueria/node-sdk'
import proxy from './proxy'

Plugin.create(_i18n => ({
    alias: "flextesa",
    schema: "1.0",
    version: "0.1",
    tasks: [
        Task.create({
            task: "start sandbox",
            command: "start sandbox [sandboxName]",
            aliases: ["start flextesa"],
            description: "Starts a flextesa sandbox",
            options: [],
            handler: 'proxy',
            positionals: [
                PositionalArg.create({
                    placeholder: "sandboxName",
                    description: "The name of the sandbox to start"
                })
            ]
        }),
        Task.create({
            task: "stop sandbox",
            command: "stop sandbox [sandboxName]",
            aliases: ["stop flextesa"],
            description: "Stops a flextesa sandbox",
            options: [],
            handler: 'proxy',
            positionals: [
                PositionalArg.create({
                    placeholder: "sandboxName",
                    description: "The name of the sandbox to stop"
                })
            ]
        }),
        Task.create({
            task: "list accounts",
            command: "list accounts <sandboxName>",
            aliases: [],
            description: "List the balances of all sandbox accounts",
            options: [],
            handler: "proxy",
            positionals: [
                PositionalArg.create({
                    placeholder: "sandboxName",
                    description: "The name of the sandbox to use"
                })
            ],
            encoding: "json"
        }),
        Task.create({
            task: "typecheck",
            command: "typecheck <sandboxName> [sourceFiles...]",
            aliases: ["tc"],
            description: "Typecheck Michelson contracts",
            options: [],
            handler: "proxy",
            positionals: [
                PositionalArg.create({
                    placeholder: "sandboxName",
                    description: "The name of the sandbox to use"
                }),
                PositionalArg.create({
                    placeholder: "sourceFiles",
                    description: "The names of the Michelson contracts you wish to typecheck, separated by space"
                }),
            ],
            encoding: "json"
        }),
        Task.create({
            task: "simulate",
            command: "simulate <sandboxName> <sourceFile>",
            aliases: ["sim"],
            description: "Run Michelson contracts as a simulation",
            options: [
                Option.create({
                    shortFlag: "s",
                    flag: "storage",
                    description: "The initial storage used to run the script (a string wrapped in single quotes)",
                    required: true
                }),
                Option.create({
                    shortFlag: "i",
                    flag: "input",
                    description: "The input used to run the script (a string wrapped in single quotes)",
                    required: true
                }),
            ],
            handler: "proxy",
            positionals: [
                PositionalArg.create({
                    placeholder: "sandboxName",
                    description: "The name of the sandbox to use"
                }),
                PositionalArg.create({
                    placeholder: "sourceFile",
                    description: "The name of the Michelson contract you wish to simulate, separated by space"
                }),
            ],
            encoding: "json"
        }),
    ],
    checkRuntimeDependencies: () => Promise.resolve({
        status: "success",
        report: [
            {name: "Docker", path: "/usr/bin/docker", version: ">=0.8.4", kind: "required", met: true}
        ]
    }),
    installRunTimeDependencies: () => Promise.resolve({
        status: "success",
        output: "Docker was found in /usr/bin/ligo" // TODO this should use i18n
    }),
    proxy: proxy
}), process.argv)
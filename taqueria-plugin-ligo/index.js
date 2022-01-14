const {Plugin, Task, Option} = require('taqueria-sdk')
const compile = require('./compile')

Plugin.create(i18n => ({
    schema: "1.0",
    version: "0.1",
    name: "taqueria-plugin-ligo",
    tasks: [
        Task.create({
            task: "compile",
            command: "compile [sourceFile]",
            aliases: ["c", "compile-ligo"],
            description: "Compile a smart contract written in a Ligo syntax to Michelson code",
            options: [
                Option.create({
                    shortFlag: "e",
                    flag: "entry-point",
                    description: "The entry point that will be compiled"
                }),
                Option.create({
                    shortFlag: "s",
                    flag: "syntax",
                    description: "The syntax used in the contract"
                }),
                Option.create({
                    shortFlag: "i",
                    flag: "infer",
                    description: "Enable type inference"
                })
            ],
            handler: 'proxy'
        })
    ],
    checkRuntimeDependencies: (_) => Promise.resolve({
        status: "success",
        report: [
            {name: "LIGO", path: "ligo", version: ">=0.27.0", kind: "required", met: true}
        ]
    }),
    installRunTimeDependencies: (_) => Promise.resolve({
        status: "success",
        output: "LIGO was found in /usr/bin/ligo" // TODO this should use i18n
    }),
    proxy: compile
}), process.argv)
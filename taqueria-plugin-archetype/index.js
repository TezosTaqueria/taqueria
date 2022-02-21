const {Plugin, Task, Option} = require('@taqueria/node-sdk')
const compile = require('./compile')

Plugin.create(i18n => ({
    schema: "1.0",
    version: "0.1",
    alias: "archetype",
    tasks: [
        Task.create({
            task: "compile",
            command: "compile [sourceFile]",
            aliases: ["c", "compile-archetype"],
            description: "Compile a smart contract written in a archetype syntax to Michelson code",
            options: [],
            handler: 'proxy'
        })
    ],
    checkRuntimeDependencies: (_) => Promise.resolve({
        status: "success",
        report: [
            {name: "Archetype", path: "archetype", version: ">=1.2.12", kind: "required", met: true}
        ]
    }),
    installRunTimeDependencies: (_) => Promise.resolve({
        status: "success",
        output: "Archetype was found in /usr/bin/archetype" // TODO this should use i18n
    }),
    proxy: compile
}), process.argv)

import {Plugin, Task, Option} from '@taqueria/node-sdk'
import compile from './compile'

Plugin.create(i18n => ({
    schema: "1.0",
    version: "0.1",
    alias: "archetype",
    tasks: [
        Task.create({
            task: "compile",
            command: "compile [sourceFile]",
            aliases: ["c", "compile-archetype"],
            description: "Compile a smart contract written in a Archetype syntax to Michelson code",
            options: [],
            handler: "proxy"
        }),
        Task.create({
            task: "teapot",
            command: "teapot",
            aliases: ["t", "tea"],
            description: "Have a cup of tea",
            options: [
                Option.create({
                    shortFlag: "g",
                    flag: "green",
                    description: "Make green tea instead",
                    boolean: true // TODO: Why isn't this working?
                })
            ],
            handler: 'proxy'
        })
    ],
    checkRuntimeDependencies: () => Promise.resolve({
        status: "success",
        report: [
            {name: "Archetype", path: "archetype", version: ">=1.2.12", kind: "required", met: true}
        ]
    }),
    installRunTimeDependencies: () => Promise.resolve({
        status: "success",
        output: "Archetype was found in /usr/bin/archetype" // TODO this should use i18n
    }),
    proxy: compile
}), process.argv)